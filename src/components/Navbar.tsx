import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SignupDialog from "@/components/SignupDialog";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [signupOpen, setSignupOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" onClick={closeMobile}>
            <img src={logo} alt="Eko Boko" className="h-16 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>
            <a href="/#comment-ca-marche" className="text-muted-foreground hover:text-foreground transition-colors">
              Comment ça marche
            </a>
            <a href="/#tarifs" className="text-muted-foreground hover:text-foreground transition-colors">
              Tarifs
            </a>
            <a href="/#zone-de-collecte" className="text-muted-foreground hover:text-foreground transition-colors">
              Zone de collecte
            </a>
            <a href="/#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
            <Link to="/app" className="text-muted-foreground hover:text-foreground transition-colors">
              L'app
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex px-4" asChild>
              <Link to="/connexion">Connexion</Link>
            </Button>
            <Button variant="hero" size="sm" className="hidden sm:inline-flex px-6" onClick={() => setSignupOpen(true)}>
              S'inscrire
            </Button>
            <button
              type="button"
              className="md:hidden p-2 text-foreground"
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md">
            <div className="container mx-auto px-6 py-4 flex flex-col gap-1 text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>
              <Link to="/" onClick={closeMobile} className="py-2 text-muted-foreground hover:text-foreground transition-colors">
                Accueil
              </Link>
              <a href="/#comment-ca-marche" onClick={closeMobile} className="py-2 text-muted-foreground hover:text-foreground transition-colors">
                Comment ça marche
              </a>
              <a href="/#tarifs" onClick={closeMobile} className="py-2 text-muted-foreground hover:text-foreground transition-colors">
                Tarifs
              </a>
              <a href="/#zone-de-collecte" onClick={closeMobile} className="py-2 text-muted-foreground hover:text-foreground transition-colors">
                Zone de collecte
              </a>
              <a href="/#contact" onClick={closeMobile} className="py-2 text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
              <Link to="/app" onClick={closeMobile} className="py-2 text-muted-foreground hover:text-foreground transition-colors">
                L'app
              </Link>
              <div className="flex gap-2 pt-3 sm:hidden">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link to="/connexion" onClick={closeMobile}>Connexion</Link>
                </Button>
                <Button
                  variant="hero"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    closeMobile();
                    setSignupOpen(true);
                  }}
                >
                  S'inscrire
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
      <SignupDialog open={signupOpen} onOpenChange={setSignupOpen} />
    </>
  );
};

export default Navbar;
