
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CtfChallenge } from "@/components/ui/ctf-card";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useChallenges } from "@/context/ChallengeContext";
import {
  User,
  Award,
  Calendar,
  Trophy,
  Target,
  Clock,
  CheckCircle,
  Activity,
  Shield,
  FileText,
  ServerCrash,
  BarChart
} from "lucide-react";

export default function Profile() {
  // If id is not provided, show the current user's profile
  const { id } = useParams<{ id?: string }>();
  const { user: currentUser } = useAuth();
  const { challenges, getUserSolvedChallenges } = useChallenges();
  const [isCurrentUserProfile, setIsCurrentUserProfile] = useState(false);
  const [profileUser, setProfileUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [solvedChallenges, setSolvedChallenges] = useState<CtfChallenge[]>([]);
  
  useEffect(() => {
    const fetchUserProfile = () => {
      setIsLoading(true);
      
      // If no ID is provided or ID matches current user, show current user profile
      if (!id && currentUser || id === currentUser?.id) {
        setProfileUser(currentUser);
        setIsCurrentUserProfile(true);
      } else if (id) {
        // Fetch another user's profile - mock data for demo
        // In a real app, this would be an API call
        const mockUserProfiles: Record<string, any> = {
          "1": {
            id: "1",
            username: "h4x0r_supreme",
            email: "supreme@example.com",
            isAdmin: false,
            points: 15750,
            rank: 1,
            createdAt: "2024-12-01T00:00:00Z",
            stats: {
              easyCount: 15,
              mediumCount: 18,
              hardCount: 8,
              insaneCount: 1,
              webCount: 10,
              cryptoCount: 7,
              reversingCount: 8,
              forensicsCount: 7,
              pwningCount: 5,
              miscCount: 5,
            }
          },
          // Add more mock profiles as needed
        };
        
        const user = mockUserProfiles[id] || null;
        setProfileUser(user);
        setIsCurrentUserProfile(user?.id === currentUser?.id);
      } else {
        // No user found and not logged in
        setProfileUser(null);
        setIsCurrentUserProfile(false);
      }
      
      setIsLoading(false);
    };
    
    fetchUserProfile();
  }, [id, currentUser]);
  
  // Get solved challenges
  useEffect(() => {
    if (profileUser) {
      const solvedIds = getUserSolvedChallenges(profileUser.id);
      const solved = challenges.filter(c => solvedIds.includes(c.id));
      setSolvedChallenges(solved);
    } else {
      setSolvedChallenges([]);
    }
  }, [profileUser, challenges, getUserSolvedChallenges]);

  // Calculate stats
  const totalChallenges = challenges.length;
  const completionRate = totalChallenges > 0 
    ? Math.round((solvedChallenges.length / totalChallenges) * 100) 
    : 0;
    
  const difficultyStats = solvedChallenges.reduce((acc: {[key: string]: number}, challenge) => {
    const difficulty = challenge.difficulty;
    acc[difficulty] = (acc[difficulty] || 0) + 1;
    return acc;
  }, {});
  
  const categoryStats = solvedChallenges.reduce((acc: {[key: string]: number}, challenge) => {
    const category = challenge.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="animate-pulse space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 space-y-4">
                <div className="h-40 bg-muted rounded-lg"></div>
                <div className="h-40 bg-muted rounded-lg"></div>
              </div>
              <div className="md:w-2/3 space-y-4">
                <div className="h-12 bg-muted rounded-lg w-1/2"></div>
                <div className="h-6 bg-muted rounded-lg w-1/3"></div>
                <div className="h-40 bg-muted rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!profileUser) {
    return (
      <Layout>
        <div className="container py-16">
          <div className="text-center">
            <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">User Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The user profile you're looking for doesn't exist or has been removed.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split('_')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - User Profile Card */}
          <div className="md:col-span-1 space-y-6">
            {/* User Card */}
            <Card className={`${
              profileUser.rank === 1 ? 'border-yellow-500/30' : 
              profileUser.rank === 2 ? 'border-gray-400/30' :
              profileUser.rank === 3 ? 'border-amber-700/30' : ''
            }`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge variant="outline" className="bg-muted/70 text-xs">
                    Rank #{profileUser.rank}
                  </Badge>
                  {profileUser.isAdmin && (
                    <Badge className="bg-red-500/80 hover:bg-red-500/70">Admin</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex flex-col items-center pt-4 pb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={profileUser.profilePic} />
                  <AvatarFallback className={`text-2xl
                    ${profileUser.rank === 1 ? 'bg-yellow-500/20 text-yellow-500' : 
                      profileUser.rank === 2 ? 'bg-gray-400/20 text-gray-400' :
                      profileUser.rank === 3 ? 'bg-amber-700/20 text-amber-700' : 'bg-muted'}
                  `}>
                    {getInitials(profileUser.username)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold mb-1">{profileUser.username}</h2>
                {isCurrentUserProfile && (
                  <p className="text-muted-foreground mb-4">{profileUser.email}</p>
                )}
                
                <div className="flex items-center gap-1 text-lg mb-6">
                  <Trophy className={`h-5 w-5 ${
                    profileUser.rank === 1 ? 'text-yellow-500' : 
                    profileUser.rank === 2 ? 'text-gray-400' :
                    profileUser.rank === 3 ? 'text-amber-700' : 'text-cyber-green'
                  }`} />
                  <span className="font-mono font-bold">{profileUser.points.toLocaleString()} pts</span>
                </div>
                
                <div className="w-full space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Completion</span>
                    <span>{solvedChallenges.length}/{totalChallenges} challenges</span>
                  </div>
                  <Progress value={completionRate} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* User Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">User Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-cyber-green/10">
                      <Award className="h-4 w-4 text-cyber-green" />
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs">Points</div>
                      <div className="font-medium">{profileUser.points.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-cyber-green/10">
                      <Target className="h-4 w-4 text-cyber-green" />
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs">Challenges</div>
                      <div className="font-medium">{solvedChallenges.length}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-cyber-green/10">
                      <Trophy className="h-4 w-4 text-cyber-green" />
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs">Rank</div>
                      <div className="font-medium">#{profileUser.rank}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-cyber-green/10">
                      <Calendar className="h-4 w-4 text-cyber-green" />
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs">Joined</div>
                      <div className="font-medium text-xs">
                        {formatDate(profileUser.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Difficulty Breakdown</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">Easy</span>
                      <span>{difficultyStats['Easy'] || 0}</span>
                    </div>
                    <Progress 
                      value={(difficultyStats['Easy'] || 0) / totalChallenges * 100} 
                      className="h-1.5"
                      indicatorColor="bg-green-500"
                    />
                    
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">Medium</span>
                      <span>{difficultyStats['Medium'] || 0}</span>
                    </div>
                    <Progress 
                      value={(difficultyStats['Medium'] || 0) / totalChallenges * 100} 
                      className="h-1.5"
                      indicatorColor="bg-yellow-500"
                    />
                    
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">Hard</span>
                      <span>{difficultyStats['Hard'] || 0}</span>
                    </div>
                    <Progress 
                      value={(difficultyStats['Hard'] || 0) / totalChallenges * 100} 
                      className="h-1.5"
                      indicatorColor="bg-orange-500"
                    />
                    
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">Insane</span>
                      <span>{difficultyStats['Insane'] || 0}</span>
                    </div>
                    <Progress 
                      value={(difficultyStats['Insane'] || 0) / totalChallenges * 100} 
                      className="h-1.5"
                      indicatorColor="bg-red-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Edit Profile Button (only for current user) */}
            {isCurrentUserProfile && (
              <Button 
                variant="outline"
                className="w-full border-cyber-green/30 hover:bg-cyber-green/10 hover:text-cyber-green"
              >
                Edit Profile
              </Button>
            )}
          </div>

          {/* Right Column - Tabs for Activity and Stats */}
          <div className="md:col-span-2">
            <Tabs defaultValue="activity" className="space-y-6">
              <TabsList className="w-full grid grid-cols-3 h-12">
                <TabsTrigger value="activity" className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  <span>Activity</span>
                </TabsTrigger>
                <TabsTrigger value="challenges" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Challenges</span>
                </TabsTrigger>
                <TabsTrigger value="stats" className="flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  <span>Stats</span>
                </TabsTrigger>
              </TabsList>

              {/* Activity Tab */}
              <TabsContent value="activity" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      Recent Activity
                    </CardTitle>
                    <CardDescription>
                      Recent challenges solved and achievements earned
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-6">
                    {solvedChallenges.length > 0 ? (
                      <div className="space-y-4">
                        {solvedChallenges.slice(0, 5).map((challenge) => (
                          <div 
                            key={challenge.id}
                            className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
                          >
                            <div className="p-2 rounded-full bg-cyber-green/10 mt-0.5">
                              <CheckCircle className="h-4 w-4 text-cyber-green" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <Link 
                                  to={`/challenges/${challenge.id}`}
                                  className="font-medium hover:text-cyber-green transition-colors"
                                >
                                  {challenge.title}
                                </Link>
                                <span className="text-muted-foreground text-sm">3 days ago</span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {challenge.category}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {challenge.points} points
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        <div className="mb-2">No activity yet</div>
                        <Link to="/challenges">
                          <Button variant="link" className="text-cyber-green">
                            Start solving challenges
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-muted-foreground" />
                      Achievements
                    </CardTitle>
                    <CardDescription>
                      Badges and awards earned through challenges
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {solvedChallenges.length > 0 ? (
                        <>
                          <div className="flex flex-col items-center p-3 border border-border rounded-md">
                            <Trophy className="h-10 w-10 text-yellow-500 mb-2" />
                            <div className="font-medium text-center">First Blood</div>
                            <div className="text-xs text-muted-foreground text-center">
                              First to solve a challenge
                            </div>
                          </div>
                          <div className="flex flex-col items-center p-3 border border-border rounded-md">
                            <ServerCrash className="h-10 w-10 text-blue-500 mb-2" />
                            <div className="font-medium text-center">VM Master</div>
                            <div className="text-xs text-muted-foreground text-center">
                              Solved 5 VM challenges
                            </div>
                          </div>
                          <div className="flex flex-col items-center p-3 border border-border rounded-md">
                            <FileText className="h-10 w-10 text-purple-500 mb-2" />
                            <div className="font-medium text-center">Forensics Pro</div>
                            <div className="text-xs text-muted-foreground text-center">
                              Solved 10 forensic challenges
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="col-span-3 text-center py-6 text-muted-foreground">
                          No achievements yet
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Challenges Tab */}
              <TabsContent value="challenges" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-muted-foreground" />
                      Solved Challenges
                    </CardTitle>
                    <CardDescription>
                      All challenges solved by {isCurrentUserProfile ? "you" : profileUser.username}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {solvedChallenges.length > 0 ? (
                      <div className="divide-y divide-border">
                        {solvedChallenges.map((challenge) => (
                          <Link 
                            key={challenge.id}
                            to={`/challenges/${challenge.id}`}
                            className="flex items-center justify-between py-3 hover:bg-muted/50 px-2 rounded-md transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-1.5 rounded-full bg-cyber-green/10">
                                <CheckCircle className="h-3.5 w-3.5 text-cyber-green" />
                              </div>
                              <span className="font-medium">{challenge.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">{challenge.category}</Badge>
                              <Badge variant="secondary" className="text-xs">{challenge.points} pts</Badge>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <div className="mb-2">No challenges solved yet</div>
                        <Link to="/challenges">
                          <Button variant="link" className="text-cyber-green">
                            Browse challenges
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Stats Tab */}
              <TabsContent value="stats" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart className="h-5 w-5 text-muted-foreground" />
                      Challenge Statistics
                    </CardTitle>
                    <CardDescription>
                      Breakdown of solved challenges by category
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <div className="space-y-6">
                      {/* Category Stats */}
                      <div>
                        <h4 className="font-medium mb-3">Categories</h4>
                        <div className="space-y-2">
                          {Object.entries(categoryStats).length > 0 ? (
                            Object.entries(categoryStats).map(([category, count]) => (
                              <div key={category} className="space-y-1">
                                <div className="flex justify-between items-center text-sm">
                                  <span>{category}</span>
                                  <span className="text-muted-foreground">{count} solved</span>
                                </div>
                                <Progress 
                                  value={(count as number) / solvedChallenges.length * 100} 
                                  className="h-1.5" 
                                />
                              </div>
                            ))
                          ) : (
                            <div className="text-muted-foreground text-center py-4">
                              No category data available
                            </div>
                          )}
                        </div>
                      </div>

                      {/* More Stats */}
                      <div>
                        <h4 className="font-medium mb-3">Challenge Types</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border border-border rounded-md p-4">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">VM Challenges</span>
                              <span className="text-sm text-muted-foreground">
                                {solvedChallenges.filter(c => c.type === "VM").length} solved
                              </span>
                            </div>
                            <Progress 
                              value={solvedChallenges.filter(c => c.type === "VM").length / 
                                challenges.filter(c => c.type === "VM").length * 100} 
                              className="h-1.5"
                              indicatorColor="bg-blue-500"
                            />
                          </div>
                          <div className="border border-border rounded-md p-4">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">File Challenges</span>
                              <span className="text-sm text-muted-foreground">
                                {solvedChallenges.filter(c => c.type === "File").length} solved
                              </span>
                            </div>
                            <Progress 
                              value={solvedChallenges.filter(c => c.type === "File").length / 
                                challenges.filter(c => c.type === "File").length * 100} 
                              className="h-1.5"
                              indicatorColor="bg-purple-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center h-40">
                      {solvedChallenges.length > 0 ? (
                        <div className="w-full text-center text-muted-foreground">
                          [Visualization placeholder - would show solve activity over time]
                        </div>
                      ) : (
                        <div className="w-full text-center py-8 text-muted-foreground">
                          Not enough data to generate timeline
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
}
