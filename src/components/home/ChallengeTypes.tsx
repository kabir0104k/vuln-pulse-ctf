
import { Server, File, Layers, Network, Database, Code } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function ChallengeTypes() {
  const challengeTypes = [
    {
      icon: Server,
      title: "Vulnerable Machines",
      description: "Boot up vulnerable VMs and exploit them to capture flags. Practice privilege escalation and lateral movement.",
      percentage: 32,
      color: "bg-cyber-green"
    },
    {
      icon: File,
      title: "Forensics Analysis",
      description: "Analyze memory dumps, disk images, and network captures to identify indicators of compromise and attacker activities.",
      percentage: 24,
      color: "bg-cyber-blue"
    },
    {
      icon: Code,
      title: "Web Exploitation",
      description: "Exploit vulnerable web applications using SQL injection, XSS, CSRF and other OWASP Top 10 vulnerabilities.",
      percentage: 28,
      color: "bg-cyber-red"
    },
    {
      icon: Database,
      title: "Binary Exploitation",
      description: "Identify and exploit buffer overflows, format string vulnerabilities, and race conditions in compiled applications.",
      percentage: 16,
      color: "bg-cyber-yellow"
    },
  ];

  return (
    <section className="py-20">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              <span className="border-b-2 border-cyber-green pb-1">Professional Challenge Categories</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Our platform offers diverse cybersecurity challenges across all major domains. 
              Each challenge is designed by security professionals to simulate real-world security vulnerabilities.
            </p>
          </div>
          
          <div className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Total Challenges</p>
            <p className="text-3xl font-bold font-mono">160+</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {challengeTypes.map((type, index) => (
            <div 
              key={index}
              className="bg-card border border-border rounded-lg overflow-hidden hover:border-cyber-green/30 transition-all duration-300"
            >
              <div className="flex p-6">
                <div className="mr-6">
                  <div className={`h-12 w-12 rounded-lg flex items-center justify-center bg-${type.color.split('-')[1]}/10`}>
                    <type.icon className={`h-6 w-6 ${type.color.replace('bg-', 'text-')}`} />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                  <p className="text-muted-foreground mb-4">{type.description}</p>
                  
                  <div className="flex items-center">
                    <div className="flex-1 mr-4">
                      <Progress value={type.percentage} indicatorColor={type.color} className="h-2" />
                    </div>
                    <p className="text-sm whitespace-nowrap">{type.percentage}% of total</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
