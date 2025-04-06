
import { Server, FileType, Trophy, ShieldCheck } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Server,
      title: "VM-Based Challenges",
      description: "Download and attack vulnerable machines in your own lab environment. Root the target and capture the flag."
    },
    {
      icon: FileType,
      title: "File-Based Challenges",
      description: "Analyze forensic files, reverse engineer binaries, solve cryptography puzzles, and more."
    },
    {
      icon: Trophy,
      title: "Live Leaderboard",
      description: "Compete against other hackers on our real-time leaderboard. Rise through the ranks as you solve challenges."
    },
    {
      icon: ShieldCheck,
      title: "Realistic Scenarios",
      description: "Practice on challenges that mimic real-world vulnerabilities and security issues found in the wild."
    }
  ];

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4 group">
            <span className="group-hover:animate-text-flicker">Advanced CTF Features</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our platform is designed for serious security professionals and enthusiasts. 
            Practice real-world hacking techniques in a legal, controlled environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-card p-6 rounded-lg border border-border hover:border-cyber-green/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyber-green/5"
            >
              <div className="h-12 w-12 rounded-full bg-cyber-green/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-cyber-green" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
