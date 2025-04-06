
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Terminal, ChevronRight, Shield, Flag } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="bg-card border border-border rounded-lg overflow-hidden relative cyber-border">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyber-green/5 to-cyber-blue/5 z-0" />
          
          <div className="relative z-10 p-8 md:p-16">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Flag className="h-5 w-5 text-cyber-green" strokeWidth={1.5} />
                <h3 className="font-glitch tracking-widest text-sm uppercase text-cyber-green">Ready for the challenge?</h3>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join the <span className="text-cyber-green animate-text-flicker">elite hackers</span> on our platform
              </h2>
              
              <p className="text-muted-foreground text-lg mb-8">
                Sign up now to access our full range of cybersecurity challenges. Test your skills,
                compete on the leaderboard, and become part of our hacker community.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button 
                    size="lg" 
                    className="bg-cyber-green hover:bg-cyber-green/90 text-background font-medium w-full sm:w-auto"
                  >
                    Join VulnOps
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/challenges">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-cyber-green/50 hover:bg-cyber-green/10 hover:text-cyber-green w-full sm:w-auto"
                  >
                    Browse Challenges
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="hidden lg:block absolute bottom-8 right-12 w-48 h-48 opacity-20">
            <div className="absolute inset-0 border-2 border-cyber-green rotate-45" />
            <div className="absolute inset-8 border-2 border-cyber-blue rotate-12" />
            <div className="absolute inset-16 border-2 border-cyber-green -rotate-20" />
            <Terminal className="absolute inset-0 m-auto h-16 w-16 text-cyber-green opacity-50" strokeWidth={1} />
          </div>
        </div>
      </div>
    </section>
  );
}
