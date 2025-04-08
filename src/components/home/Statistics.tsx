
import { Server, Flag, Users, ShieldAlert } from "lucide-react";
import CountUp from "react-countup";

export default function Statistics() {
  const stats = [
    { 
      icon: Server, 
      label: "Active Machines", 
      value: 42, 
      color: "text-cyber-green" 
    },
    { 
      icon: Flag, 
      label: "CTF Challenges", 
      value: 118, 
      color: "text-cyber-blue" 
    },
    { 
      icon: Users, 
      label: "Security Professionals", 
      value: 2584, 
      color: "text-cyber-red" 
    },
    { 
      icon: ShieldAlert, 
      label: "CVEs Covered", 
      value: 76, 
      color: "text-cyber-yellow" 
    },
  ];

  return (
    <section className="py-12 bg-muted/30">
      <div className="container px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-lg p-6 flex flex-col items-center text-center"
            >
              <div className={`p-3 rounded-full bg-card mb-4 ${stat.color}`}>
                <stat.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              
              <div className="font-mono text-3xl font-bold mb-2">
                <CountUp end={stat.value} duration={2.5} />+
              </div>
              
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
