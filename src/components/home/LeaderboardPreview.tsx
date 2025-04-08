
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

interface TopUser {
  id: string;
  rank: number;
  username: string;
  points: number;
  solveCount: number;
  avatarUrl?: string;
}

export default function LeaderboardPreview() {
  // Mock data for top users
  const topUsers: TopUser[] = [
    { id: "1", rank: 1, username: "0xDeadC0de", points: 18750, solveCount: 84, avatarUrl: "" },
    { id: "2", rank: 2, username: "hexOverflow", points: 17200, solveCount: 79, avatarUrl: "" },
    { id: "3", rank: 3, username: "kernel_panic", points: 16500, solveCount: 76, avatarUrl: "" },
    { id: "4", rank: 4, username: "root@localhost", points: 15300, solveCount: 71, avatarUrl: "" },
    { id: "5", rank: 5, username: "n0pt3", points: 14800, solveCount: 68, avatarUrl: "" },
  ];

  const getInitials = (name: string) => {
    return name
      .split(/[^a-zA-Z0-9]/)
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getRankMedal = (rank: number) => {
    switch (rank) {
      case 1:
        return <Medal className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-700" />;
      default:
        return <span className="text-muted-foreground font-mono">{rank}</span>;
    }
  };

  return (
    <section className="py-20">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="inline-flex items-center mb-3">
              <Trophy className="h-5 w-5 text-cyber-green mr-2" />
              <h2 className="text-3xl font-bold">Global Leaderboard</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Our top security professionals ranked by points earned from solving challenges.
              Can you make it to the top?
            </p>
          </div>
          
          <Link to="/leaderboard">
            <Button 
              variant="outline" 
              className="border-cyber-green/50 hover:bg-cyber-green/10 hover:text-cyber-green"
            >
              View Full Leaderboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-4 border-b border-border bg-muted/30">
            <div className="grid grid-cols-12 text-xs font-medium text-muted-foreground">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-5">User</div>
              <div className="col-span-3 text-right">Points</div>
              <div className="col-span-3 text-right">Challenges</div>
            </div>
          </div>

          <div className="divide-y divide-border">
            {topUsers.map((user) => (
              <Link 
                key={user.id}
                to={`/profile/${user.id}`}
                className="p-4 grid grid-cols-12 items-center hover:bg-muted/20 transition-colors"
              >
                <div className="col-span-1 flex justify-center">
                  {getRankMedal(user.rank)}
                </div>
                <div className="col-span-5 flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarImage src={user.avatarUrl} />
                    <AvatarFallback className="bg-muted text-xs">
                      {getInitials(user.username)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium truncate font-mono">{user.username}</span>
                </div>
                <div className="col-span-3 text-right">
                  <span className="font-mono font-semibold text-white">{user.points.toLocaleString()}</span>
                  <div className="mt-1">
                    <Progress 
                      value={user.rank === 1 ? 100 : Math.round((user.points / topUsers[0].points) * 100)} 
                      className="h-1" 
                      indicatorColor={user.rank === 1 ? "bg-yellow-500" : "bg-cyber-green/80"}
                    />
                  </div>
                </div>
                <div className="col-span-3 text-right text-muted-foreground font-mono">
                  {user.solveCount}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
