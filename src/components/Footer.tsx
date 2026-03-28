import { Recycle, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Recycle className="w-6 h-6 text-accent" />
              <span className="text-xl font-bold font-display">VerreCollecte</span>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Le service de ramassage de verre à domicile.
              Recyclez sans effort, nous faisons le reste.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Liens rapides</h4>
            <ul className="space-y-2 text-primary-foreground/60 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              <li><a href="#comment-ca-marche" className="hover:text-accent transition-colors">Comment ça marche</a></li>
              <li><a href="#tarifs" className="hover:text-accent transition-colors">Tarifs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-primary-foreground/60 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                contact@verrecollecte.fr
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                01 23 45 67 89
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-primary-foreground/40 text-sm" style={{ fontFamily: "var(--font-body)" }}>
          © {new Date().getFullYear()} VerreCollecte. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
