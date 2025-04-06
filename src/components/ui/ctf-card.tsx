
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, CheckCircle, CircleEllipsis } from "lucide-react";

export interface CtfChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Insane";
  category: string;
  type: "VM" | "File";
  points: number;
  solveCount: number;
  isSolved?: boolean;
}

interface CtfCardProps {
  challenge: CtfChallenge;
}

export function CtfCard({ challenge }: CtfCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const difficultyColor = {
    Easy: "bg-green-600/20 text-green-500 border-green-500/30",
    Medium: "bg-yellow-600/20 text-yellow-500 border-yellow-500/30",
    Hard: "bg-orange-600/20 text-orange-500 border-orange-500/30",
    Insane: "bg-red-600/20 text-red-500 border-red-500/30",
  };
  
  const typeColor = {
    VM: "bg-blue-600/20 text-blue-500 border-blue-500/30",
    File: "bg-purple-600/20 text-purple-500 border-purple-500/30",
  };

  return (
    <Link to={`/challenges/${challenge.id}`}>
      <Card 
        className={`overflow-hidden border-border transition-all duration-200 cyber-border hover:shadow-md hover:shadow-cyber-green/20 ${
          isHovered ? "scale-[1.02]" : ""
        } ${challenge.isSolved ? "border-cyber-green/30" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="font-bold text-lg tracking-tight">{challenge.title}</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3" /> {challenge.points} pts
                <span className="text-muted-foreground/50">•</span>
                <span className="flex items-center">
                  {challenge.isSolved ? (
                    <CheckCircle className="w-3 h-3 text-cyber-green mr-1" />
                  ) : (
                    <CircleEllipsis className="w-3 h-3 mr-1" />
                  )}
                  {challenge.solveCount} solves
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className={difficultyColor[challenge.difficulty]}>
                {challenge.difficulty}
              </Badge>
              <Badge variant="outline" className={typeColor[challenge.type]}>
                {challenge.type}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <p className="text-muted-foreground text-sm line-clamp-2">
            {challenge.description}
          </p>
        </CardContent>
        <CardFooter className="pt-0 pb-4 flex justify-between items-center">
          <Badge variant="secondary" className="bg-secondary/70">
            {challenge.category}
          </Badge>
          <Button 
            variant="ghost" 
            size="sm"
            className={`gap-1 ${
              challenge.isSolved ? "text-cyber-green hover:text-cyber-green/80" : ""
            }`}
            onClick={(e) => e.preventDefault()}
          >
            {challenge.isSolved ? "Solved" : "View Challenge"}
          </Button>
        </CardFooter>
        {isHovered && (
          <div 
            className="absolute bottom-0 left-0 h-0.5 bg-cyber-green" 
            style={{ 
              width: `${isHovered ? 100 : 0}%`,
              transition: "width 0.6s ease" 
            }}
          />
        )}
      </Card>
    </Link>
  );
}
