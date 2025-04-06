
import { Crown, Flame, Award } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SectionHeading } from "@/components/ui/section-heading";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

interface TopUser {
  id: string;
  rank: number;
  username: string;
  points: number;
  solveCount: number;
  avatarUrl?: string;
}

export default function TopUsers() {
  // Mock data for top users
  const topUsers: TopUser[] = [
    { id: "1", rank: 1, username: "h4x0r_supreme", points: 15750, solveCount: 42, avatarUrl: "" },
    { id: "2", rank: 2, username: "0xdeadbeef", points: 14200, solveCount: 39, avatarUrl: "" },
    { id: "3", rank: 3, username: "binary_ninja", points: 13800, solveCount: 36, avatarUrl: "" },
    { id: "4", rank: 4, username: "shell_shock", points: 12500, solveCount: 33, avatarUrl: "" },
    { id: "5", rank: 5, username: "exploit_master", points: 11900, solveCount: 31, avatarUrl: "" },
  ];

  const getInitials = (name: string) => {
    return name
      .split('_')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Award className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-700" />;
      default:
        return <span className="text-muted-foreground font-mono">{rank}</span>;
    }
  };

  const getScoreColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-500";
      case 2:
        return "text-gray-400";
      case 3:
        return "text-amber-700";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <section className="py-20">
      <div className="container">
        <SectionHeading 
          title="Top Hackers" 
          description="The elite few who have conquered the most challenges."
        >
          <Link to="/leaderboard" className="text-sm text-cyber-green underline underline-offset-4 hover:text-cyber-green/80">
            View Full Leaderboard
          </Link>
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column - Top user highlight */}
          <div className="md:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm text-yellow-500 font-medium">TOP RANKED</span>
                </div>
                <div className="bg-yellow-500/10 text-yellow-500 text-xs font-medium px-2 py-1 rounded">
                  #{topUsers[0].rank}
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-20 w-20 border-2 border-yellow-500/50">
                  <AvatarImage src={topUsers[0].avatarUrl} />
                  <AvatarFallback className="bg-yellow-500/20 text-yellow-500 text-xl">
                    {getInitials(topUsers[0].username)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{topUsers[0].username}</h3>
                  <div className="flex items-center gap-1 text-yellow-500 mt-1">
                    <Flame className="h-4 w-4" />
                    <span className="font-mono">{topUsers[0].points.toLocaleString()} pts</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Total Solves</span>
                    <span className="font-medium">{topUsers[0].solveCount}</span>
                  </div>
                  <Progress value={85} className="h-1 bg-muted" indicatorColor="bg-yellow-500" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Hard Challenges</span>
                    <span className="font-medium">16/24</span>
                  </div>
                  <Progress value={67} className="h-1 bg-muted" indicatorColor="bg-yellow-500" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">First Blood</span>
                    <span className="font-medium">7</span>
                  </div>
                  <Progress value={70} className="h-1 bg-muted" indicatorColor="bg-yellow-500" />
                </div>
              </div>
              
              <div className="mt-auto pt-4">
                <Link 
                  to={`/profile/${topUsers[0].id}`}
                  className="block text-center text-sm text-yellow-500 underline underline-offset-4 hover:text-yellow-400"
                >
                  View Full Profile
                </Link>
              </div>
            </div>
          </div>

          {/* Right column - Other top users */}
          <div className="md:col-span-2">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="p-4 border-b border-border bg-muted/30">
                <div className="grid grid-cols-12 text-xs font-medium text-muted-foreground">
                  <div className="col-span-1">#</div>
                  <div className="col-span-5">User</div>
                  <div className="col-span-3 text-right">Points</div>
                  <div className="col-span-3 text-right">Solves</div>
                </div>
              </div>

              <div className="divide-y divide-border">
                {topUsers.slice(1).map((user) => (
                  <Link 
                    key={user.id}
                    to={`/profile/${user.id}`}
                    className="p-4 grid grid-cols-12 items-center hover:bg-muted/50 transition-colors"
                  >
                    <div className="col-span-1 flex justify-center">
                      {getRankIcon(user.rank)}
                    </div>
                    <div className="col-span-5 flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatarUrl} />
                        <AvatarFallback className="bg-muted text-xs">
                          {getInitials(user.username)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium truncate">{user.username}</span>
                    </div>
                    <div className={`col-span-3 text-right font-mono ${getScoreColor(user.rank)}`}>
                      {user.points.toLocaleString()}
                    </div>
                    <div className="col-span-3 text-right text-muted-foreground">
                      {user.solveCount}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
