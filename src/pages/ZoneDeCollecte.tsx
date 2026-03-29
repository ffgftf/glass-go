import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Rocket } from "lucide-react";

const quartiers = [
  "Centre-ville",
  "Montebello",
  "Carrère",
  "Duquerry",
  "Bovis",
  "La Lézarde",
];

const ZoneDeCollecte = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground mb-6">
              <MapPin className="w-4 h-4" />
              Zone de collecte
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Où on intervient 📍
            </h1>
            <p className="text-lg text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>
              Petit-Bourg — Guadeloupe (971)
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-2xl border border-border p-8 mb-8">
              <p className="text-foreground text-lg mb-8 text-center" style={{ fontFamily: "var(--font-body)" }}>
                Nous desservons actuellement toute la commune de <strong>Petit-Bourg</strong> et ses quartiers.
                Notre objectif : couvrir toute la Guadeloupe d'ici 2027 ! 🌴
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {quartiers.map((q) => (
                  <div
                    key={q}
                    className="flex items-center gap-3 bg-background rounded-xl p-4 border border-border"
                  >
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium" style={{ fontFamily: "var(--font-body)" }}>{q}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-accent/50 rounded-2xl p-6 text-center">
              <div className="inline-flex items-center gap-2 text-foreground font-semibold mb-2">
                <Rocket className="w-5 h-5" />
                Prochainement
              </div>
              <p className="text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>
                Baie-Mahault, Lamentin, Pointe-à-Pitre et toute la Grande-Terre !
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ZoneDeCollecte;
