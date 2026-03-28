import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SignupDialog from "@/components/SignupDialog";
import { useState } from "react";

const Navbar = () => {
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Eko Boko" className="h-14 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>
            <Link to="/comment-ca-marche" className="text-muted-foreground hover:text-foreground transition-colors">
              Comment ça marche
            </Link>
            <Link to="/tarifs" className="text-muted-foreground hover:text-foreground transition-colors">
              Tarifs
            </Link>
          </div>

          <Button variant="hero" size="sm" className="px-6" onClick={() => setSignupOpen(true)}>
            S'inscrire
          </Button>
        </div>
      </nav>
      <SignupDialog open={signupOpen} onOpenChange={setSignupOpen} />
    </>
  );
};

export default Navbar;
