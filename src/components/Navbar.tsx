import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import SignupDialog from "@/components/SignupDialog";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = { label: string; href: string; sectionId?: string; routePath?: string };

const navItems: NavItem[] = [
  { label: "Comment ça marche", href: "/#comment-ca-marche", sectionId: "comment-ca-marche", routePath: "/comment-ca-marche" },
  { label: "Tarifs", href: "/#tarifs", sectionId: "tarifs", routePath: "/tarifs" },
  { label: "Zone de collecte", href: "/#zone-de-collecte", sectionId: "zone-de-collecte", routePath: "/zone-de-collecte" },
  { label: "Contact", href: "/#contact", sectionId: "contact", routePath: "/contact" },
  { label: "L'app", href: "/app", routePath: "/app" },
];

const Navbar = () => {
  const [signupOpen, setSignupOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const location = useLocation();

  const closeMobile = () => setMobileOpen(false);

  // Track visible section on the home page via IntersectionObserver
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection(null);
      return;
    }
    const ids = navItems.map((i) => i.sectionId).filter(Boolean) as string[];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);

  const isActive = (item: NavItem) => {
    if (item.routePath && item.routePath !== "/" && location.pathname === item.routePath) return true;
    if (location.pathname === "/" && item.sectionId && activeSection === item.sectionId) return true;
    return false;
  };

  const linkBase = "transition-colors";
  const linkInactive = "text-muted-foreground hover:text-foreground";
  const linkActiveDesktop = "text-foreground font-semibold border-b-2 border-primary pb-0.5";
  const linkActiveMobile = "text-foreground font-semibold border-l-2 border-primary pl-2";

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" onClick={closeMobile}>
            <img src={logo} alt="Eko Boko" className="h-16 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>
            {navItems.map((item) =>
              item.sectionId ? (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(linkBase, isActive(item) ? linkActiveDesktop : linkInactive)}
                  aria-current={isActive(item) ? "page" : undefined}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(linkBase, isActive(item) ? linkActiveDesktop : linkInactive)}
                  aria-current={isActive(item) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ),
            )}
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
              <Link
                to="/"
                onClick={closeMobile}
                className={cn(
                  "py-2",
                  linkBase,
                  location.pathname === "/" && !activeSection ? linkActiveMobile : linkInactive,
                )}
                aria-current={location.pathname === "/" && !activeSection ? "page" : undefined}
              >
                Accueil
              </Link>
              {navItems.map((item) =>
                item.sectionId ? (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={closeMobile}
                    className={cn("py-2", linkBase, isActive(item) ? linkActiveMobile : linkInactive)}
                    aria-current={isActive(item) ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={closeMobile}
                    className={cn("py-2", linkBase, isActive(item) ? linkActiveMobile : linkInactive)}
                    aria-current={isActive(item) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                ),
              )}
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
