
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  points: number;
  rank?: number;
  profilePic?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      try {
        const storedUser = localStorage.getItem("vulnops-user");
        if (storedUser) {
          // In a real app, verify token with backend
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
        localStorage.removeItem("vulnops-user");
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Check auth status - for protected routes
  const checkAuth = async () => {
    try {
      const storedUser = localStorage.getItem("vulnops-user");
      if (storedUser) {
        // In a real app, verify token with backend
        const userData = JSON.parse(storedUser);
        setUser(userData);
        return userData;
      }
      return null;
    } catch (err) {
      console.error("Auth check error:", err);
      return null;
    }
  };

  // Mock login function - replace with real authentication
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Mock login - in a real app, this would be an API call to backend
      if (email === "admin@vulnops.com" && password === "admin") {
        const userData: User = {
          id: "admin123",
          username: "admin",
          email: "admin@vulnops.com",
          isAdmin: true,
          points: 5000,
          rank: 1,
          createdAt: new Date().toISOString(),
        };
        
        // Store user data (would be a token in a real app)
        localStorage.setItem("vulnops-user", JSON.stringify(userData));
        setUser(userData);
      } else if (email === "user@vulnops.com" && password === "user") {
        const userData: User = {
          id: "user123",
          username: "hacker",
          email: "user@vulnops.com",
          isAdmin: false,
          points: 1500,
          rank: 10,
          createdAt: new Date().toISOString(),
        };
        
        localStorage.setItem("vulnops-user", JSON.stringify(userData));
        setUser(userData);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock register function - replace with real registration
  const register = async (email: string, username: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Mock registration - in a real app, this would be an API call
      // Here we're just validating and creating a mock user
      
      if (!email || !username || !password) {
        throw new Error("All fields are required");
      }
      
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
      
      // In a real app, check if email/username already exists
      
      const userData: User = {
        id: `user_${Date.now()}`,
        username,
        email,
        isAdmin: false,
        points: 0,
        rank: 999,
        createdAt: new Date().toISOString(),
      };
      
      // Store user data (would be a token in a real app)
      localStorage.setItem("vulnops-user", JSON.stringify(userData));
      setUser(userData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("vulnops-user");
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
