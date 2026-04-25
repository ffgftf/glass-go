import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";
import { NavLink } from "@/components/NavLink";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Eko Boko" className="h-16 w-auto" />
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Verre aujourd'hui ! Vers demain !<br />
              Service de ramassage de verre à domicile à Pointe-à-Bacchus.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Liens rapides</h4>
            <ul className="space-y-2 text-primary-foreground/60 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              <li><NavLink to="/" end className="hover:text-accent transition-colors" activeClassName="text-accent font-semibold">Accueil</NavLink></li>
              <li><NavLink to="/comment-ca-marche" className="hover:text-accent transition-colors" activeClassName="text-accent font-semibold">Comment ça marche</NavLink></li>
              <li><NavLink to="/tarifs" className="hover:text-accent transition-colors" activeClassName="text-accent font-semibold">Tarifs</NavLink></li>
              <li><NavLink to="/zone-de-collecte" className="hover:text-accent transition-colors" activeClassName="text-accent font-semibold">Zone de collecte</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-accent transition-colors" activeClassName="text-accent font-semibold">Contact</NavLink></li>
              <li><NavLink to="/app" className="hover:text-accent transition-colors" activeClassName="text-accent font-semibold">L'app</NavLink></li>
              <li><NavLink to="/connexion" className="hover:text-accent transition-colors" activeClassName="text-accent font-semibold">Connexion</NavLink></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-primary-foreground/60 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Pointe-à-Bacchus
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                contact@ekoboko.fr
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                01 23 45 67 89
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-primary-foreground/40 text-sm" style={{ fontFamily: "var(--font-body)" }}>
          © {new Date().getFullYear()} Eko Boko. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
