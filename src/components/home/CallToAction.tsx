
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Terminal, Shield, Lock, ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/60">
      <div className="container px-4">
        <div className="bg-card border border-border rounded-lg overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyber-green/5 to-cyber-blue/5 z-0" />
          
          {/* Decorative circuit board pattern */}
          <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>
          
          <div className="relative z-10 p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 mb-4">
                <Lock className="h-5 w-5 text-cyber-green" strokeWidth={1.5} />
                <h3 className="font-glitch tracking-widest text-sm uppercase text-cyber-green">Security awaits</h3>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Are you ready to join the <span className="text-cyber-green">cyber elite</span>?
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8 mx-auto max-w-2xl">
                Start your professional cybersecurity journey today. Create an account to track
                your progress, compete on the global leaderboard, and build skills that are in high demand.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button 
                    size="lg" 
                    className="bg-cyber-green hover:bg-cyber-green/90 text-background font-medium w-full sm:w-auto"
                  >
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
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
          <div className="hidden lg:block absolute bottom-0 right-0 w-full h-24">
            <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-green/30 to-transparent"></div>
            <div className="absolute bottom-5 w-full h-px bg-gradient-to-r from-transparent via-cyber-green/20 to-transparent"></div>
            <div className="absolute bottom-10 w-full h-px bg-gradient-to-r from-transparent via-cyber-green/10 to-transparent"></div>
          </div>
        </div>
        
        {/* Trust signals */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground text-sm mb-6">Trusted by cybersecurity professionals from</p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
            {['COMPANY', 'ENTERPRISE', 'CORPORATION', 'SECURITY FIRM', 'DEFENSE'].map((company, i) => (
              <div key={i} className="font-mono text-xs tracking-wider">{company}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
