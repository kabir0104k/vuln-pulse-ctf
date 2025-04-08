
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Server, HardDrive, Shield, Flame } from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Insane";
  category: string;
  points: number;
  solves: number;
  isNew: boolean;
}

export default function LatestChallenges() {
  // Mock data for latest challenges
  const latestChallenges: Challenge[] = [
    { 
      id: "1", 
      title: "Zero Day", 
      difficulty: "Medium", 
      category: "Web Exploitation", 
      points: 300, 
      solves: 54,
      isNew: true
    },
    { 
      id: "2", 
      title: "Memory Dump", 
      difficulty: "Easy", 
      category: "Forensics", 
      points: 150, 
      solves: 126,
      isNew: true
    },
    { 
      id: "3", 
      title: "Kernel Panic", 
      difficulty: "Hard", 
      category: "Privilege Escalation", 
      points: 450, 
      solves: 21,
      isNew: false
    },
    { 
      id: "4", 
      title: "Shadow Breach", 
      difficulty: "Insane", 
      category: "Binary Exploitation", 
      points: 600, 
      solves: 7,
      isNew: false
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-600/20 text-green-500 border-green-700/20";
      case "Medium": return "bg-yellow-600/20 text-yellow-500 border-yellow-700/20";
      case "Hard": return "bg-orange-600/20 text-orange-500 border-orange-700/20";
      case "Insane": return "bg-red-600/20 text-red-500 border-red-700/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold mb-3">Latest Challenges</h2>
            <p className="text-muted-foreground max-w-2xl">
              Our experts regularly add new challenges that reflect current security trends and vulnerabilities.
            </p>
          </div>
          
          <Link to="/challenges">
            <Button 
              variant="outline" 
              className="border-cyber-green/50 hover:bg-cyber-green/10 hover:text-cyber-green"
            >
              View All Challenges
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestChallenges.map((challenge) => (
            <Link to={`/challenges/${challenge.id}`} key={challenge.id}>
              <Card className="bg-card border-border hover:border-cyber-green/40 hover:shadow-lg hover:shadow-cyber-green/5 transition-all duration-300 h-full">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-card rounded-md">
                        {challenge.category === "Web Exploitation" && <HardDrive className="h-5 w-5 text-cyber-blue" />}
                        {challenge.category === "Forensics" && <Shield className="h-5 w-5 text-cyber-green" />}
                        {challenge.category === "Privilege Escalation" && <Server className="h-5 w-5 text-cyber-yellow" />}
                        {challenge.category === "Binary Exploitation" && <Flame className="h-5 w-5 text-cyber-red" />}
                      </div>
                      
                      {challenge.isNew && (
                        <Badge variant="outline" className="border-cyber-green text-cyber-green">New</Badge>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{challenge.category}</p>
                    
                    <div className="flex justify-between items-center">
                      <Badge className={`${getDifficultyColor(challenge.difficulty)} font-mono text-xs`}>
                        {challenge.difficulty}
                      </Badge>
                      
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Points</p>
                        <p className="font-mono font-bold">{challenge.points}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-muted-foreground">Solves</p>
                        <p className="text-sm font-mono">{challenge.solves}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
