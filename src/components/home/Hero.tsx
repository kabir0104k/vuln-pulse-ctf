
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Terminal, ChevronRight, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "Master. Exploit. Capture.";

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
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-background to-background/95">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <div className="container px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-lg p-8 md:p-12">
            <div className="flex items-center mb-6">
              <Terminal className="w-6 h-6 text-cyber-green mr-2" strokeWidth={1.5} />
              <h3 className="font-glitch tracking-widest text-sm uppercase text-cyber-green">VulnOps Platform</h3>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Professional cybersecurity training <br />
              <span className="text-cyber-green animate-text-flicker">through practical challenges</span>
            </h1>
            
            <div className="h-8 mb-6">
              <p className="text-xl md:text-2xl text-muted-foreground font-mono">
                {text}<span className={`inline-block w-2 bg-cyber-green ${isTyping ? "animate-pulse" : ""}`}>&nbsp;</span>
              </p>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
              VulnOps delivers industry-standard cybersecurity training through realistic environments and 
              challenges. Practice offensive security techniques in a legal environment designed by experts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link to="/challenges">
                <Button 
                  size="lg" 
                  className="group bg-cyber-green hover:bg-cyber-green/90 text-background font-medium w-full sm:w-auto"
                >
                  Start Hacking
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/register">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-cyber-green/50 hover:bg-cyber-green/10 hover:text-cyber-green w-full sm:w-auto"
                >
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Key features badges */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {['Active Machines', 'Real-World CVEs', 'Advanced Labs', 'Beginner Friendly'].map((feature, i) => (
              <div key={i} className="bg-card/30 backdrop-blur-sm border border-border/40 rounded p-3 text-center">
                <p className="text-xs text-cyber-green font-mono">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="hidden lg:block absolute bottom-0 right-0 w-1/3 h-[80%] opacity-30 pointer-events-none">
        <div className="absolute right-20 bottom-20 w-64 h-64 border border-cyber-green/20 rotate-45 rounded-lg"></div>
        <div className="absolute right-40 bottom-40 w-80 h-80 border border-cyber-blue/20 -rotate-12 rounded-lg"></div>
        <Shield className="absolute right-32 bottom-32 h-40 w-40 text-cyber-green/10" strokeWidth={1} />
      </div>
    </section>
  );
}
