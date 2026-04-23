import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SignupDialog from "@/components/SignupDialog";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Menu, HelpCircle, CreditCard, MapPin, MessageCircle, Smartphone } from "lucide-react";

const navLinks = [
  { href: "/#comment-ca-marche", label: "Comment ça marche ?", icon: HelpCircle },
  { href: "/#tarifs", label: "Nos tarifs", icon: CreditCard },
  { href: "/#zone-de-collecte", label: "Où on intervient 📍", icon: MapPin },
  { href: "/#contact", label: "Une question ? Parlons-en 💬", icon: MessageCircle },
];

const Navbar = () => {
  const [signupOpen, setSignupOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Eko Boko" className="h-16 w-auto" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link to="/app" className="text-muted-foreground hover:text-foreground transition-colors">
              L'app Eko Boko 📱
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="hero" size="sm" className="px-6" onClick={() => setSignupOpen(true)}>
              S'inscrire
            </Button>

            {/* Mobile hamburger */}
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Ouvrir le menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px] p-0">
                <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-border">
                    <Link to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                      <img src={logo} alt="Eko Boko" className="h-12 w-auto" />
                    </Link>
                  </div>
                  <nav className="flex-1 p-4">
                    <ul className="space-y-1">
                      {navLinks.map((link) => (
                        <li key={link.href}>
                          <SheetClose asChild>
                            <a
                              href={link.href}
                              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:bg-accent transition-colors"
                              onClick={() => setMenuOpen(false)}
                            >
                              <link.icon className="w-5 h-5 text-primary" />
                              {link.label}
                            </a>
                          </SheetClose>
                        </li>
                      ))}
                      <li>
                        <SheetClose asChild>
                          <Link
                            to="/app"
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:bg-accent transition-colors"
                            onClick={() => setMenuOpen(false)}
                          >
                            <Smartphone className="w-5 h-5 text-primary" />
                            L'app Eko Boko 📱
                          </Link>
                        </SheetClose>
                      </li>
                    </ul>
                  </nav>
                  <div className="p-6 border-t border-border">
                    <Button variant="hero" className="w-full" onClick={() => { setMenuOpen(false); setSignupOpen(true); }}>
                      S'inscrire
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
      <SignupDialog open={signupOpen} onOpenChange={setSignupOpen} />
    </>
  );
};

export default Navbar;
