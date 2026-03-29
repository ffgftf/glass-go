import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import OurStory from "@/components/OurStory";
import Footer from "@/components/Footer";
import { MapPin, Rocket, MessageCircle, Phone, Mail } from "lucide-react";

const quartiers = [
  "Centre-ville",
  "Montebello",
  "Carrère",
  "Duquerry",
  "Bovis",
  "La Lézarde",
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Pricing />

      {/* Zone de collecte */}
      <section className="py-24 bg-background" id="zone-de-collecte">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground mb-6">
              <MapPin className="w-4 h-4" />
              Zone de collecte
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Où on intervient 📍
            </h2>
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
                  <div key={q} className="flex items-center gap-3 bg-background rounded-xl p-4 border border-border">
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

      <OurStory />

      {/* Contact */}
      <section className="py-24 bg-background" id="contact">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Une question ? Parlons-en 💬
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <a href="https://wa.me/0690000000" target="_blank" rel="noopener noreferrer" className="group bg-card rounded-2xl border border-border p-8 text-center hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-6 mx-auto group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <MessageCircle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">WhatsApp</h3>
              <p className="text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>Réponse rapide</p>
            </a>
            <a href="tel:0690000000" className="group bg-card rounded-2xl border border-border p-8 text-center hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-6 mx-auto group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <Phone className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Téléphone</h3>
              <p className="text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>0690 00 00 00</p>
            </a>
            <a href="mailto:contact@ekoboko.fr" className="group bg-card rounded-2xl border border-border p-8 text-center hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-6 mx-auto group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <Mail className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>contact@ekoboko.fr</p>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
