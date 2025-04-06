
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/context/AuthContext";
import { Search, Trophy, Medal, Award } from "lucide-react";

interface LeaderboardUser {
  id: string;
  rank: number;
  username: string;
  points: number;
  solveCount: number;
  firstSolveCount: number;
  lastActive: string;
  avatarUrl?: string;
}

export default function Leaderboard() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [filteredData, setFilteredData] = useState<LeaderboardUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock leaderboard data - in a real app, this would be fetched from an API
  useEffect(() => {
    const fetchLeaderboard = () => {
      setIsLoading(true);
      
      // Mock data
      const mockLeaderboard: LeaderboardUser[] = [
        {
          id: "1",
          rank: 1,
          username: "h4x0r_supreme",
          points: 15750,
          solveCount: 42,
          firstSolveCount: 8,
          lastActive: "2025-04-05T18:30:00Z",
        },
        {
          id: "2",
          rank: 2,
          username: "0xdeadbeef",
          points: 14200,
          solveCount: 39,
          firstSolveCount: 5,
          lastActive: "2025-04-05T14:15:00Z",
        },
        {
          id: "3",
          rank: 3,
          username: "binary_ninja",
          points: 13800,
          solveCount: 36,
          firstSolveCount: 7,
          lastActive: "2025-04-04T22:45:00Z",
        },
        {
          id: "4",
          rank: 4,
          username: "shell_shock",
          points: 12500,
          solveCount: 33,
          firstSolveCount: 3,
          lastActive: "2025-04-05T10:10:00Z",
        },
        {
          id: "5",
          rank: 5,
          username: "exploit_master",
          points: 11900,
          solveCount: 31,
          firstSolveCount: 4,
          lastActive: "2025-04-05T08:20:00Z",
        },
        {
          id: "6",
          rank: 6,
          username: "cyber_ghost",
          points: 10800,
          solveCount: 28,
          firstSolveCount: 2,
          lastActive: "2025-04-04T16:30:00Z",
        },
        {
          id: "7",
          rank: 7,
          username: "packet_storm",
          points: 9500,
          solveCount: 25,
          firstSolveCount: 1,
          lastActive: "2025-04-03T20:45:00Z",
        },
        {
          id: "8",
          rank: 8,
          username: "buffer_overflow",
          points: 8200,
          solveCount: 22,
          firstSolveCount: 0,
          lastActive: "2025-04-05T12:15:00Z",
        },
        {
          id: "9",
          rank: 9,
          username: "root_access",
          points: 7400,
          solveCount: 19,
          firstSolveCount: 2,
          lastActive: "2025-04-04T09:30:00Z",
        },
        {
          id: "10",
          rank: 10,
          username: "hacker",
          points: 6800,
          solveCount: 17,
          firstSolveCount: 1,
          lastActive: "2025-04-05T07:50:00Z",
        },
      ];
      
      setLeaderboardData(mockLeaderboard);
      setFilteredData(mockLeaderboard);
      setIsLoading(false);
    };

    fetchLeaderboard();
  }, []);

  // Filter leaderboard data based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredData(leaderboardData);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = leaderboardData.filter((user) =>
      user.username.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  }, [searchQuery, leaderboardData]);

  // Format the last active date
  const formatLastActive = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getInitials = (name: string) => {
    return name
      .split('_')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Render rank icon based on position
  const renderRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-700" />;
      default:
        return <span className="text-muted-foreground font-mono">{rank}</span>;
    }
  };

  // Highlight the current user in the leaderboard
  const isCurrentUser = (userId: string) => {
    return user && user.id === userId;
  };

  return (
    <Layout>
      <div className="container py-8">
        <SectionHeading
          title="Leaderboard"
          description="Top hackers ranked by points earned from solving challenges"
        />

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-16 text-center">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="text-right">Points</TableHead>
                <TableHead className="text-right hidden md:table-cell">Solves</TableHead>
                <TableHead className="text-right hidden lg:table-cell">First Bloods</TableHead>
                <TableHead className="text-right hidden md:table-cell">Last Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                // Loading state
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={`loading-${index}`}>
                    <TableCell className="text-center">
                      <div className="h-6 w-6 bg-muted rounded mx-auto"></div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-muted rounded-full"></div>
                        <div className="h-4 w-24 bg-muted rounded"></div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="h-4 w-16 bg-muted rounded ml-auto"></div>
                    </TableCell>
                    <TableCell className="text-right hidden md:table-cell">
                      <div className="h-4 w-8 bg-muted rounded ml-auto"></div>
                    </TableCell>
                    <TableCell className="text-right hidden lg:table-cell">
                      <div className="h-4 w-8 bg-muted rounded ml-auto"></div>
                    </TableCell>
                    <TableCell className="text-right hidden md:table-cell">
                      <div className="h-4 w-16 bg-muted rounded ml-auto"></div>
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    <p className="text-muted-foreground">No users found matching your search.</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((user) => (
                  <TableRow
                    key={user.id}
                    className={isCurrentUser(user.id) ? "bg-cyber-green/5" : undefined}
                  >
                    <TableCell className="text-center">
                      <div className="flex justify-center items-center">
                        {renderRankIcon(user.rank)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link 
                        to={`/profile/${user.id}`}
                        className="flex items-center gap-2 hover:text-cyber-green transition-colors"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatarUrl} />
                          <AvatarFallback className={`
                            ${user.rank === 1 ? 'bg-yellow-500/20 text-yellow-500' : 
                              user.rank === 2 ? 'bg-gray-400/20 text-gray-400' :
                              user.rank === 3 ? 'bg-amber-700/20 text-amber-700' : 'bg-muted'}
                          `}>
                            {getInitials(user.username)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">
                          {user.username}
                          {isCurrentUser(user.id) && (
                            <span className="ml-2 text-xs text-cyber-green">(you)</span>
                          )}
                        </span>
                      </Link>
                    </TableCell>
                    <TableCell className="text-right font-mono font-medium">
                      {user.points.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right hidden md:table-cell">
                      {user.solveCount}
                    </TableCell>
                    <TableCell className="text-right hidden lg:table-cell">
                      {user.firstSolveCount}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground text-sm hidden md:table-cell">
                      {formatLastActive(user.lastActive)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
}
