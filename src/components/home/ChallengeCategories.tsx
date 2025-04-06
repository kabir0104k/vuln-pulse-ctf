
import { 
  Database, Keyboard, Lock, FileDigit, Network, Brain, 
  Bug, File, Puzzle, Search, PenTool, Code
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ChallengeCategories() {
  const categories = [
    { name: "Web Exploitation", icon: Code, count: 12 },
    { name: "Binary Exploitation", icon: Bug, count: 8 },
    { name: "Cryptography", icon: Lock, count: 7 },
    { name: "Forensics", icon: Search, count: 10 },
    { name: "Reverse Engineering", icon: Puzzle, count: 9 },
    { name: "Network Analysis", icon: Network, count: 6 },
    { name: "OSINT", icon: PenTool, count: 5 },
    { name: "Steganography", icon: File, count: 4 },
    { name: "SQL Injection", icon: Database, count: 3 },
    { name: "Mobile Security", icon: FileDigit, count: 5 },
    { name: "Pwn", icon: Keyboard, count: 7 },
    { name: "AI Security", icon: Brain, count: 3 }
  ];

  return (
    <section className="py-20 bg-card">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-4 group">
              <span className="group-hover:animate-text-flicker">Diverse Challenge Categories</span>
            </h2>
            <p className="text-muted-foreground">
              From web exploitation to reverse engineering, we offer challenges across the full spectrum 
              of cybersecurity domains. Build a well-rounded skillset or specialize in your area of interest.
            </p>
          </div>
          <Link to="/challenges" className="mt-4 md:mt-0">
            <Button 
              variant="outline" 
              className="border-cyber-green/50 hover:bg-cyber-green/10 hover:text-cyber-green"
            >
              View All Categories
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/challenges?category=${encodeURIComponent(category.name)}`}
              className="bg-background p-4 rounded-md border border-border hover:border-cyber-green/50 transition-all duration-300 group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-cyber-green/10 mb-3 group-hover:bg-cyber-green/20 transition-colors">
                  <category.icon className="h-6 w-6 text-cyber-green" />
                </div>
                <h3 className="font-medium mb-1 group-hover:text-cyber-green transition-colors">{category.name}</h3>
                <p className="text-xs text-muted-foreground">{category.count} challenges</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
