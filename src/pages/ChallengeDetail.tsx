
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { CtfChallenge } from "@/components/ui/ctf-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useChallenges } from "@/context/ChallengeContext";
import { useAuth } from "@/context/AuthContext";
import {
  Download,
  Flag,
  Award,
  Users,
  AlertTriangle,
  CheckCircle2,
  X,
} from "lucide-react";

export default function ChallengeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getChallengeById, getUserSolvedChallenges, submitFlag } = useChallenges();
  const { user } = useAuth();
  const [challenge, setChallenge] = useState<CtfChallenge | undefined>();
  const [isSolved, setIsSolved] = useState(false);
  const [flagInput, setFlagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Difficulty colors
  const difficultyColor = {
    Easy: "bg-green-600/20 text-green-500 border-green-500/30",
    Medium: "bg-yellow-600/20 text-yellow-500 border-yellow-500/30",
    Hard: "bg-orange-600/20 text-orange-500 border-orange-500/30",
    Insane: "bg-red-600/20 text-red-500 border-red-500/30",
  };

  // Type colors
  const typeColor = {
    VM: "bg-blue-600/20 text-blue-500 border-blue-500/30",
    File: "bg-purple-600/20 text-purple-500 border-purple-500/30",
  };

  useEffect(() => {
    if (!id) return;

    // Get challenge details
    const challengeData = getChallengeById(id);
    if (!challengeData) {
      toast({
        title: "Challenge not found",
        description: "The requested challenge could not be found.",
        variant: "destructive",
      });
      navigate("/challenges");
      return;
    }

    setChallenge(challengeData);

    // Check if the user has already solved this challenge
    if (user) {
      const solvedChallenges = getUserSolvedChallenges(user.id);
      setIsSolved(solvedChallenges.includes(id));
    }
  }, [id, getChallengeById, getUserSolvedChallenges, user, navigate]);

  const handleFlagSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to submit flags.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    if (!flagInput.trim()) {
      toast({
        description: "Please enter a flag",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Submit flag for validation
      const result = await submitFlag(id!, flagInput);
      
      if (result) {
        setIsSolved(true);
        setShowSuccessModal(true);
        // Update challenge to reflect solved status
        setChallenge(prev => prev ? {...prev, isSolved: true} : undefined);
      } else {
        toast({
          title: "Incorrect flag",
          description: "The submitted flag is not correct. Try again!",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while submitting the flag.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = () => {
    // In a real application, this would download the challenge files
    toast({
      description: "Downloading challenge files...",
    });
    // Mock download - in a real app, this would be a real download
    setTimeout(() => {
      toast({
        title: "Download completed",
        description: "Challenge files downloaded successfully.",
      });
    }, 1500);
  };

  if (!challenge) {
    return (
      <Layout>
        <div className="container py-8 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Challenge Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The challenge you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate("/challenges")}>
              Back to Challenges
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        {/* Challenge Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-2">
            <h1 className="text-3xl font-bold">{challenge.title}</h1>
            <div className="flex gap-2">
              <Badge variant="outline" className={difficultyColor[challenge.difficulty]}>
                {challenge.difficulty}
              </Badge>
              <Badge variant="outline" className={typeColor[challenge.type]}>
                {challenge.type}
              </Badge>
              <Badge variant="secondary" className="bg-secondary/70">
                {challenge.category}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              <span>{challenge.points} points</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{challenge.solveCount} solves</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Challenge Description and Files */}
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">
                  {challenge.description}
                </p>
                <div className="mt-6">
                  <p className="text-muted-foreground text-sm mb-2">
                    {challenge.type === "VM" 
                      ? "Download the VM image and find the flag. Import the OVA file into VirtualBox or VMware."
                      : "Download the challenge files and analyze them to find the flag."
                    }
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={handleDownload}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Challenge Files
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hints</CardTitle>
                <CardDescription>
                  Use hints if you get stuck, but remember each hint will make the challenge worth fewer points.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start text-left">
                    <span className="mr-auto">Hint 1 - Initial Access</span>
                    <Badge variant="outline">-10% points</Badge>
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <span className="mr-auto">Hint 2 - Privilege Escalation</span>
                    <Badge variant="outline">-20% points</Badge>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Flag Submission */}
          <div className="md:col-span-1">
            <Card className={isSolved ? "border-cyber-green/30" : ""}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flag className="h-5 w-5" />
                  Submit Flag
                </CardTitle>
                <CardDescription>
                  Found the flag? Submit it here to receive points.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSolved ? (
                  <div className="text-center py-6">
                    <CheckCircle2 className="h-12 w-12 text-cyber-green mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-cyber-green mb-1">Challenge Solved!</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      You've already completed this challenge.
                    </p>
                    <div className="bg-cyber-green/10 rounded-md p-3 text-cyber-green text-center font-mono border border-cyber-green/20">
                      +{challenge.points} pts
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFlagSubmit}>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Enter the flag in the format flag{"{"}some_text{"}"}
                        </p>
                        <div className="flex">
                          <Input
                            placeholder="flag{...}"
                            value={flagInput}
                            onChange={(e) => setFlagInput(e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-cyber-green hover:bg-cyber-green/90 text-background"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Flag"}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Challenge Stats Card */}
            <Card className="mt-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Challenge Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">First blood</span>
                  <span className="font-medium">0xdeadbeef</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Solve rate</span>
                  <span className="font-medium">
                    {Math.round((challenge.solveCount / 1000) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Released</span>
                  <span className="font-medium">14 days ago</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Success Modal - Show when flag is correctly submitted */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md border-cyber-green animate-scale-in">
            <CardHeader className="text-center">
              <div className="flex justify-end">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => setShowSuccessModal(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-center">
                <CheckCircle2 className="h-16 w-16 text-cyber-green mb-2" />
              </div>
              <CardTitle className="text-2xl text-cyber-green">Flag Captured!</CardTitle>
              <CardDescription>
                Congratulations! You've successfully solved this challenge.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="bg-cyber-green/10 rounded-md p-4 mb-4">
                <div className="text-sm text-muted-foreground mb-1">Points earned</div>
                <div className="text-3xl font-bold text-cyber-green font-mono">
                  +{challenge.points}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Your new total score: <span className="font-medium">{user?.points || 0 + challenge.points}</span>
              </p>
            </CardContent>
            <CardFooter className="flex gap-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => navigate("/challenges")}
              >
                More Challenges
              </Button>
              <Button 
                className="flex-1 bg-cyber-green hover:bg-cyber-green/90 text-background"
                onClick={() => setShowSuccessModal(false)}
              >
                Continue
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </Layout>
  );
}
