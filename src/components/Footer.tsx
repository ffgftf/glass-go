import { Recycle, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Recycle className="w-6 h-6 text-accent" />
              <span className="text-xl font-bold font-display">Eko Boko</span>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Verre aujourd'hui ! Vers demain !<br />
              Service de ramassage de verre à domicile à Pointe-à-Bacchus.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Liens rapides</h4>
            <ul className="space-y-2 text-primary-foreground/60 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              <li><Link to="/comment-ca-marche" className="hover:text-accent transition-colors">Comment ça marche</Link></li>
              <li><Link to="/tarifs" className="hover:text-accent transition-colors">Tarifs</Link></li>
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
