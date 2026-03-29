import { Link } from "react-router-dom";
import { ArrowRight, HelpCircle, CreditCard, MapPin } from "lucide-react";

const links = [
  {
    to: "/comment-ca-marche",
    icon: HelpCircle,
    title: "Comment ça marche ?",
    description: "Découvrez notre service en 3 étapes simples",
  },
  {
    to: "/tarifs",
    icon: CreditCard,
    title: "Nos tarifs",
    description: "Des prix simples, sans surprise",
  },
  {
    to: "/zone-de-collecte",
    icon: MapPin,
    title: "Zone de collecte",
    description: "Découvrez les quartiers desservis",
  },
];

const HomeLinks = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="group bg-background rounded-2xl border border-border p-8 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <link.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">{link.title}</h3>
              <p className="text-muted-foreground text-sm mb-4" style={{ fontFamily: "var(--font-body)" }}>
                {link.description}
              </p>
              <span className="inline-flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                Découvrir <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeLinks;
