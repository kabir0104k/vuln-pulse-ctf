
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Terminal, Menu, X, Activity, Trophy, User, Shield, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Mock authentication - replace with real auth check
    const checkAuth = () => {
      const user = localStorage.getItem("vulnops-user");
      if (user) {
        setIsLoggedIn(true);
        // Check if admin - replace with real check
        setIsAdmin(JSON.parse(user).isAdmin === true);
      }
    };
    
    checkAuth();
    
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("vulnops-user");
    setIsLoggedIn(false);
    setIsAdmin(false);
    window.location.href = "/";
  };

  const navLinks = [
    { name: "Challenges", path: "/challenges", icon: Activity },
    { name: "Leaderboard", path: "/leaderboard", icon: Trophy },
  ];
  
  if (isAdmin) {
    navLinks.push({ name: "Admin", path: "/admin", icon: Shield });
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link 
          to="/" 
          className="flex items-center gap-2 group"
        >
          <Terminal 
            className="w-8 h-8 md:w-6 md:h-6 text-cyber-green group-hover:animate-glitch" 
            strokeWidth={1.5} 
          />
          <span className="text-xl md:text-2xl font-glitch font-bold tracking-wider">
            <span className="text-cyber-green">Vuln</span>
            <span className="group-hover:animate-text-flicker">Ops</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {isLoggedIn ? (
            <>
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className="flex items-center gap-1.5 text-foreground/80 hover:text-cyber-green transition-colors"
                >
                  <link.icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </Link>
              ))}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-cyber-green/50 hover:bg-cyber-green/10 hover:text-cyber-green"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="hover:bg-cyber-green/10 hover:text-cyber-green"
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-cyber-green/50 hover:bg-cyber-green/10 hover:text-cyber-green"
                >
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur border-t border-border">
          <div className="container py-4 flex flex-col gap-4">
            {isLoggedIn ? (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="flex items-center gap-2 p-2 hover:bg-muted rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <link.icon className="w-5 h-5" />
                    <span>{link.name}</span>
                  </Link>
                ))}
                <Link
                  to="/profile"
                  className="flex items-center gap-2 p-2 hover:bg-muted rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 p-2 text-destructive hover:bg-destructive/10 rounded-md"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center justify-center p-2 hover:bg-muted rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center justify-center p-2 bg-cyber-green/10 text-cyber-green hover:bg-cyber-green/20 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
