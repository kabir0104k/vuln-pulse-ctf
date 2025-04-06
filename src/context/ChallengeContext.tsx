
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CtfChallenge } from "@/components/ui/ctf-card";

interface ChallengeContextType {
  challenges: CtfChallenge[];
  isLoading: boolean;
  error: string | null;
  getChallengeById: (id: string) => CtfChallenge | undefined;
  getUserSolvedChallenges: (userId: string) => string[];
  submitFlag: (challengeId: string, flag: string) => Promise<boolean>;
}

const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined);

export function ChallengeProvider({ children }: { children: ReactNode }) {
  const [challenges, setChallenges] = useState<CtfChallenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userSolves, setUserSolves] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const fetchChallenges = async () => {
      setIsLoading(true);
      try {
        // Mock data - in a real app, fetch from API
        const mockChallenges: CtfChallenge[] = [
          {
            id: "1",
            title: "Web Injection 101",
            description: "A simple SQL injection challenge to test your skills. Bypass the login form and find the admin credentials.",
            difficulty: "Easy",
            category: "Web Exploitation",
            type: "File",
            points: 100,
            solveCount: 284
          },
          {
            id: "2",
            title: "Buffer Overflow Basics",
            description: "Learn the basics of buffer overflow attacks by exploiting a vulnerable program. Overflow the buffer and get a shell.",
            difficulty: "Medium",
            category: "Binary Exploitation",
            type: "File",
            points: 250,
            solveCount: 152
          },
          {
            id: "3",
            title: "Cryptic Message",
            description: "Decode the encrypted message using various cryptographic techniques. Multiple layers of encryption were used.",
            difficulty: "Easy",
            category: "Cryptography",
            type: "File",
            points: 150,
            solveCount: 201
          },
          {
            id: "4",
            title: "Vulnerable Linux",
            description: "Boot up this vulnerable Linux VM and find the multiple flags hidden throughout the system.",
            difficulty: "Hard",
            category: "Penetration Testing",
            type: "VM",
            points: 400,
            solveCount: 87
          },
          {
            id: "5",
            title: "Network Sniffer",
            description: "Analyze this network capture file and find the credentials being passed in plain text.",
            difficulty: "Medium",
            category: "Network Analysis",
            type: "File",
            points: 200,
            solveCount: 178
          },
          {
            id: "6",
            title: "Reverse Me",
            description: "Reverse engineer this binary file to find the correct input that produces the flag.",
            difficulty: "Hard",
            category: "Reverse Engineering",
            type: "File",
            points: 350,
            solveCount: 92
          },
          {
            id: "7",
            title: "Hidden in Plain Sight",
            description: "Find the hidden data in this image file. Steganography techniques were used to conceal the flag.",
            difficulty: "Easy",
            category: "Steganography",
            type: "File",
            points: 100,
            solveCount: 243
          },
          {
            id: "8",
            title: "Memory Forensics",
            description: "Analyze this memory dump and find evidence of the attack that occurred on the system.",
            difficulty: "Insane",
            category: "Forensics",
            type: "File",
            points: 500,
            solveCount: 45
          }
        ];
        
        setChallenges(mockChallenges);
        
        // Load mock user solves
        const mockUserSolves: Record<string, string[]> = {
          "user123": ["1", "3", "7"],  // User solved challenges 1, 3, 7
          "admin123": ["1", "2", "3", "4", "5"] // Admin solved challenges 1-5
        };
        setUserSolves(mockUserSolves);
      } catch (error) {
        console.error("Error fetching challenges:", error);
        setError("Failed to load challenges. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const getChallengeById = (id: string) => {
    return challenges.find(challenge => challenge.id === id);
  };

  const getUserSolvedChallenges = (userId: string) => {
    return userSolves[userId] || [];
  };

  // Mock function to submit flag
  const submitFlag = async (challengeId: string, flag: string): Promise<boolean> => {
    // Get user from localStorage
    const userStr = localStorage.getItem("vulnops-user");
    if (!userStr) {
      throw new Error("User not authenticated");
    }
    
    const user = JSON.parse(userStr);
    
    // Mock flag validation - replace with real validation in a production app
    // In a real app, you would send this to the server to validate
    
    // Mock validation logic - for demo purposes
    const isCorrect = flag.toLowerCase() === `flag{challenge_${challengeId}_solved}`;
    
    if (isCorrect) {
      // Update local user solves
      const updatedUserSolves = {
        ...userSolves,
        [user.id]: [...(userSolves[user.id] || []), challengeId]
      };
      setUserSolves(updatedUserSolves);
      
      // Update user points - in a real app this would happen server-side
      const challenge = getChallengeById(challengeId);
      if (challenge) {
        const updatedUser = {
          ...user,
          points: user.points + challenge.points
        };
        localStorage.setItem("vulnops-user", JSON.stringify(updatedUser));
      }
      
      return true;
    }
    
    return false;
  };

  const value = {
    challenges,
    isLoading,
    error,
    getChallengeById,
    getUserSolvedChallenges,
    submitFlag
  };

  return <ChallengeContext.Provider value={value}>{children}</ChallengeContext.Provider>;
}

export function useChallenges() {
  const context = useContext(ChallengeContext);
  if (context === undefined) {
    throw new Error("useChallenges must be used within a ChallengeProvider");
  }
  return context;
}
