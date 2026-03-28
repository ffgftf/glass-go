import { Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <Recycle className="w-6 h-6 text-primary" />
          <span className="text-lg font-bold font-display text-foreground">VerreCollecte</span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>
          <a href="#comment-ca-marche" className="text-muted-foreground hover:text-foreground transition-colors">
            Comment ça marche
          </a>
          <a href="#tarifs" className="text-muted-foreground hover:text-foreground transition-colors">
            Tarifs
          </a>
        </div>

        <Button variant="hero" size="sm" className="px-6">
          S'inscrire
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
