import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "7,50",
    period: "/ semaine",
    description: "Idéal pour tester le service",
    features: [
      "Ramassage chaque dimanche",
      "Boîte de collecte fournie",
      "Recyclage garanti",
      "Jusqu'à 20 bouteilles",
      "Notification de passage",
      "Support WhatsApp",
    ],
    popular: false,
  },
  {
    name: "Standard",
    price: "19,90",
    period: "/ mois",
    description: "Le plus populaire — économisez plus de 40%",
    features: [
      "Ramassage chaque dimanche",
      "Boîte de collecte fournie",
      "Recyclage garanti",
      "Priorité de ramassage",
      
      "Jusqu'à 50 bouteilles",
      "Créneau au choix",
      "Points fidélité ♻️",
      "Support prioritaire",
      "Économie de 10€/mois",
    ],
    popular: true,
  },
  {
    name: "Infini Pro",
    price: "29,90",
    period: "/ mois",
    description: "Idéal restaurants & bars",
    features: [
      "Ramassage chaque dimanche",
      "Boîte de collecte fournie",
      "Recyclage garanti",
      "Priorité de ramassage",
      
      "Bouteilles illimitées",
      "Créneau flexible",
      "Points fidélité x2 ♻️",
      "Rapport mensuel",
    ],
    popular: false,
  },
];
const Pricing = () => {
  return (
    <section className="py-24 bg-card" id="tarifs">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Nos tarifs
          </h2>
          <p className="text-muted-foreground text-lg" style={{ fontFamily: "var(--font-body)" }}>
            Des prix simples, sans surprise.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 border transition-all duration-300 ${
                plan.popular
                  ? "border-primary bg-background shadow-xl scale-105"
                  : "border-border bg-background hover:border-primary/30 hover:shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-primary text-primary-foreground text-sm font-semibold px-4 py-1.5 rounded-full">
                  <Star className="w-3.5 h-3.5" />
                  Populaire
                </div>
              )}

              <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mb-6" style={{ fontFamily: "var(--font-body)" }}>
                {plan.description}
              </p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold text-foreground">{plan.price}€</span>
                <span className="text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-foreground" style={{ fontFamily: "var(--font-body)" }}>
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "hero" : "hero-outline"}
                size="lg"
                className="w-full py-6"
              >
                Choisir cette offre
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 bg-accent/50 rounded-2xl p-6 max-w-5xl mx-auto">
          <p className="text-foreground font-semibold mb-1">Frais d'inscription annuels : 10€</p>
          <p className="text-muted-foreground text-sm" style={{ fontFamily: "var(--font-body)" }}>
            Comprend le prêt de la boîte de collecte
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
