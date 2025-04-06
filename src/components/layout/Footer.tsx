
import { Link } from "react-router-dom";
import { Terminal, Github, Twitter } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="py-8 border-t border-border mt-auto">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyber-green" strokeWidth={1.5} />
            <span className="text-lg font-glitch font-bold tracking-wider">
              <span className="text-cyber-green">Vuln</span>Ops
            </span>
          </div>

          <nav className="flex gap-6">
            <Link to="/about" className="text-muted-foreground hover:text-cyber-green text-sm transition-colors">
              About
            </Link>
            <Link to="/challenges" className="text-muted-foreground hover:text-cyber-green text-sm transition-colors">
              Challenges
            </Link>
            <Link to="/leaderboard" className="text-muted-foreground hover:text-cyber-green text-sm transition-colors">
              Leaderboard
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-cyber-green transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://twitter.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-cyber-green transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <Separator className="my-6 bg-border/50" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} VulnOps. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-cyber-green transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-cyber-green transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
