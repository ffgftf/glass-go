import { Package, Truck, RefreshCw } from "lucide-react";

const steps = [
  {
    icon: Package,
    title: "1. Remplissez la boîte",
    description: "Déposez vos bocaux, bouteilles et contenants en verre dans la boîte que nous vous fournissons.",
  },
  {
    icon: Truck,
    title: "2. On passe chez vous",
    description: "Chaque dimanche à partir de 13h, notre équipe récupère votre boîte remplie à votre domicile.",
  },
  {
    icon: RefreshCw,
    title: "3. Une boîte neuve",
    description: "On vide votre boîte au centre de recyclage et on vous en laisse une nouvelle. C'est tout ! La planète dit merci 🌍",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-background" id="comment-ca-marche">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-muted-foreground text-lg" style={{ fontFamily: "var(--font-body)" }}>
            Trois étapes simples pour recycler votre verre sans effort.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <div
              key={i}
              className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <step.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
