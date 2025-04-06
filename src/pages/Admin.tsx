
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ShieldAlert,
  Users,
  Flag,
  Upload,
  PlusCircle,
  Eye,
  EyeOff,
  Trash,
  Edit,
  ActivitySquare,
  BarChart3,
  Search
} from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CtfChallenge } from "@/components/ui/ctf-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Admin() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  // Mock data
  const users = [
    { id: "user123", username: "hacker", email: "user@vulnops.com", isAdmin: false, points: 1500, createdAt: "2025-03-10T12:30:00Z", lastActive: "2025-04-05T16:45:00Z" },
    { id: "user456", username: "security_ninja", email: "ninja@vulnops.com", isAdmin: false, points: 3200, createdAt: "2025-02-22T09:15:00Z", lastActive: "2025-04-04T18:20:00Z" },
    { id: "admin123", username: "admin", email: "admin@vulnops.com", isAdmin: true, points: 5000, createdAt: "2025-01-15T08:00:00Z", lastActive: "2025-04-06T10:05:00Z" },
  ];
  
  const challenges: CtfChallenge[] = [
    { id: "1", title: "Web Injection 101", description: "A simple SQL injection challenge.", difficulty: "Easy", category: "Web Exploitation", type: "File", points: 100, solveCount: 284 },
    { id: "2", title: "Buffer Overflow Basics", description: "Learn the basics of buffer overflow attacks.", difficulty: "Medium", category: "Binary Exploitation", type: "File", points: 250, solveCount: 152 },
    { id: "3", title: "Cryptic Message", description: "Decode the encrypted message.", difficulty: "Easy", category: "Cryptography", type: "File", points: 150, solveCount: 201 },
    { id: "4", title: "Vulnerable Linux", description: "Boot up this vulnerable Linux VM.", difficulty: "Hard", category: "Penetration Testing", type: "VM", points: 400, solveCount: 87 },
  ];
  
  const solveHistory = [
    { id: "1", userId: "user123", username: "hacker", challengeId: "1", challengeTitle: "Web Injection 101", timestamp: "2025-04-05T14:23:00Z", ip: "192.168.1.105" },
    { id: "2", userId: "user456", username: "security_ninja", challengeId: "2", challengeTitle: "Buffer Overflow Basics", timestamp: "2025-04-04T16:45:00Z", ip: "192.168.1.102" },
    { id: "3", userId: "admin123", username: "admin", challengeId: "1", challengeTitle: "Web Injection 101", timestamp: "2025-04-03T09:15:00Z", ip: "192.168.1.100" },
  ];
  
  // Stats data
  const platformStats = {
    totalUsers: 354,
    totalChallenges: 42,
    totalSolves: 8539,
    activeUsersToday: 58,
    newUsersToday: 12
  };

  // If not admin, redirect to home
  if (!user?.isAdmin) {
    toast({
      title: "Access Denied",
      description: "You don't have permission to access the admin panel.",
      variant: "destructive",
    });
    return <Navigate to="/" replace />;
  }
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };
  
  const handleCreateChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Challenge Created",
      description: "The challenge has been created successfully.",
    });
  };

  const getInitials = (name: string) => {
    return name.split(/\s+/).map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Layout>
      <div className="container py-8">
        <SectionHeading
          title="Admin Panel"
          description="Manage your CTF platform"
        >
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-destructive" />
            <span className="text-destructive font-medium">Admin Access</span>
          </div>
        </SectionHeading>

        {/* Dashboard Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platformStats.totalUsers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platformStats.totalChallenges}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Solves</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platformStats.totalSolves}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platformStats.activeUsersToday}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">New Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platformStats.newUsersToday}</div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="challenges" className="space-y-6">
          <TabsList className="grid grid-cols-4 h-12">
            <TabsTrigger value="challenges" className="flex items-center gap-2">
              <Flag className="h-4 w-4" />
              <span>Challenges</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <ActivitySquare className="h-4 w-4" />
              <span>Solve History</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="space-y-6">
            {/* Add New Challenge Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Add New Challenge</CardTitle>
                <CardDescription>
                  Create a new CTF challenge with files and flags
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleCreateChallenge}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Challenge Title</Label>
                      <Input id="title" placeholder="e.g. Web Injection 101" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="web">Web Exploitation</SelectItem>
                            <SelectItem value="pwn">Binary Exploitation</SelectItem>
                            <SelectItem value="crypto">Cryptography</SelectItem>
                            <SelectItem value="forensics">Forensics</SelectItem>
                            <SelectItem value="reversing">Reverse Engineering</SelectItem>
                            <SelectItem value="misc">Miscellaneous</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Difficulty</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Hard">Hard</SelectItem>
                          <SelectItem value="Insane">Insane</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Challenge Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="File">File</SelectItem>
                          <SelectItem value="VM">Virtual Machine</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="points">Points</Label>
                      <Input 
                        id="points" 
                        type="number"
                        placeholder="e.g. 100" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description"
                      placeholder="Challenge description with any necessary instructions"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="flag">Static Flag</Label>
                    <Input 
                      id="flag" 
                      placeholder="e.g. flag{example_static_flag}" 
                    />
                    <p className="text-xs text-muted-foreground">
                      This will be used to generate unique flags for each user.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="file">Challenge Files</Label>
                    <div className="border border-dashed border-border rounded-md p-6 text-center">
                      {uploadedFile ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-center gap-2">
                            <Upload className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium">{uploadedFile.name}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {Math.round(uploadedFile.size / 1024)} KB
                          </p>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            type="button"
                            onClick={() => setUploadedFile(null)}
                          >
                            Change file
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                          <p className="text-sm text-muted-foreground">
                            Drag and drop or click to upload
                          </p>
                          <Input 
                            id="file" 
                            type="file" 
                            className="hidden" 
                            onChange={handleFileUpload}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            type="button"
                            onClick={() => document.getElementById('file')?.click()}
                          >
                            Select File
                          </Button>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Upload VM image (.ova), zip file, or other challenge files.
                      Max size: 1GB
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button">Cancel</Button>
                  <Button className="bg-cyber-green hover:bg-cyber-green/90 text-background">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Challenge
                  </Button>
                </CardFooter>
              </form>
            </Card>

            {/* Manage Challenges Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Manage Challenges</CardTitle>
                <CardDescription>
                  View, edit and delete existing challenges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search challenges..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Difficulty</TableHead>
                          <TableHead className="text-right">Points</TableHead>
                          <TableHead className="text-right">Solves</TableHead>
                          <TableHead className="text-center">Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {challenges.map((challenge) => (
                          <TableRow key={challenge.id}>
                            <TableCell className="font-medium">{challenge.title}</TableCell>
                            <TableCell>{challenge.category}</TableCell>
                            <TableCell>{challenge.difficulty}</TableCell>
                            <TableCell className="text-right">{challenge.points}</TableCell>
                            <TableCell className="text-right">{challenge.solveCount}</TableCell>
                            <TableCell className="text-center">
                              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">
                                Active
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Manage Users</CardTitle>
                <CardDescription>
                  View and manage user accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead className="text-right">Points</TableHead>
                          <TableHead>Joined</TableHead>
                          <TableHead>Last Active</TableHead>
                          <TableHead className="text-center">Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="bg-muted">
                                    {getInitials(user.username)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">
                                    {user.username}
                                  </div>
                                  {user.isAdmin && (
                                    <div className="text-xs text-destructive">
                                      Admin
                                    </div>
                                  )}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell className="text-right">{user.points}</TableCell>
                            <TableCell>{formatDate(user.createdAt)}</TableCell>
                            <TableCell>{formatDate(user.lastActive)}</TableCell>
                            <TableCell className="text-center">
                              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">
                                Active
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Link to={`/profile/${user.id}`}>
                                  <Button variant="ghost" size="icon">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </Link>
                                <Button variant="ghost" size="icon">
                                  {user.isAdmin ? (
                                    <ShieldAlert className="h-4 w-4 text-destructive" />
                                  ) : (
                                    <ShieldAlert className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Solve History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Solve History</CardTitle>
                <CardDescription>
                  View challenge completions and flag submissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by user or challenge..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Challenge</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead className="hidden md:table-cell">IP Address</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {solveHistory.map((solve) => (
                          <TableRow key={solve.id}>
                            <TableCell>
                              <Link 
                                to={`/profile/${solve.userId}`}
                                className="font-medium hover:text-cyber-green transition-colors"
                              >
                                {solve.username}
                              </Link>
                            </TableCell>
                            <TableCell>
                              <Link 
                                to={`/challenges/${solve.challengeId}`}
                                className="hover:text-cyber-green transition-colors"
                              >
                                {solve.challengeTitle}
                              </Link>
                            </TableCell>
                            <TableCell>{formatDate(solve.timestamp)}</TableCell>
                            <TableCell className="hidden md:table-cell">{solve.ip}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end">
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">User Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-60 bg-muted/30 rounded-md">
                    <p className="text-muted-foreground text-sm">
                      [Chart showing user registrations over time]
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Challenge Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-60 bg-muted/30 rounded-md">
                    <p className="text-muted-foreground text-sm">
                      [Chart showing challenge solves over time]
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Category Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-60 bg-muted/30 rounded-md">
                    <p className="text-muted-foreground text-sm">
                      [Pie chart showing challenge categories]
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Difficulty Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-60 bg-muted/30 rounded-md">
                    <p className="text-muted-foreground text-sm">
                      [Bar chart showing solve rates by difficulty]
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
