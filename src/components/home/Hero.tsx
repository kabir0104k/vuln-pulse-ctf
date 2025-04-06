
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Terminal, ChevronRight, Shield, Target } from "lucide-react";

export default function Hero() {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "Learn. Hack. Capture the Flag.";

  useEffect(() => {
    if (isTyping) {
      if (text.length < fullText.length) {
        const timeout = setTimeout(() => {
          setText(fullText.slice(0, text.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(false);
        const timeout = setTimeout(() => {
          setIsTyping(true);
          setText("");
        }, 5000);
        return () => clearTimeout(timeout);
      }
    }
  }, [text, isTyping]);

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center">
      <div className="container mx-auto px-4 py-32 md:py-48">
        <div className="max-w-4xl">
          <div className="flex items-center mb-4">
            <Terminal className="w-8 h-8 text-cyber-green mr-2" strokeWidth={1.5} />
            <h3 className="font-glitch tracking-widest text-lg uppercase text-cyber-green">VulnOps CTF Platform</h3>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Sharpen your hacking skills.
            <br />
            <span className="text-cyber-green animate-text-flicker">
              Conquer security challenges.
            </span>
          </h1>
          
          <div className="h-8 mb-6">
            <p className="text-xl md:text-2xl text-muted-foreground font-mono">
              {text}<span className={`inline-block w-2 bg-cyber-green ${isTyping ? "animate-pulse" : ""}`}>&nbsp;</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link to="/challenges">
              <Button 
                size="lg" 
                className="bg-cyber-green hover:bg-cyber-green/90 text-background font-medium w-full sm:w-auto"
              >
                Start Hacking
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/register">
              <Button 
                variant="outline" 
                size="lg"
                className="border-cyber-green/50 hover:bg-cyber-green/10 hover:text-cyber-green w-full sm:w-auto"
              >
                Sign Up Now
              </Button>
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-20">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-cyber-green" />
                <span className="text-sm uppercase tracking-wider text-muted-foreground">Challenges</span>
              </div>
              <span className="text-3xl font-bold mt-1 font-glitch animate-text-flicker">42+</span>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-cyber-green" />
                <span className="text-sm uppercase tracking-wider text-muted-foreground">Users</span>
              </div>
              <span className="text-3xl font-bold mt-1 font-glitch animate-text-flicker">1.3k+</span>
            </div>
            
            <div className="flex flex-col col-span-2 md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 text-cyber-green flex items-center justify-center">🚩</div>
                <span className="text-sm uppercase tracking-wider text-muted-foreground">Flags Captured</span>
              </div>
              <span className="text-3xl font-bold mt-1 font-glitch animate-text-flicker">8.5k+</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
