import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Home, CalendarPlus, CalendarCheck, CreditCard, Bell, MessageCircle,
  Smartphone, QrCode, Plus, Package, Check, Clock, MapPin, Recycle,
} from "lucide-react";

const plans = [
  { name: "Basic", price: "5€", desc: "1 collecte / mois", color: "bg-primary/10 text-primary border-primary/30" },
  { name: "Standard", price: "10€", desc: "2 collectes / mois", color: "bg-blue-500/10 text-blue-700 border-blue-500/30" },
  { name: "Premium", price: "20€", desc: "Illimité", color: "bg-purple-500/10 text-purple-700 border-purple-500/30" },
];

const PhoneFrame = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div className="flex flex-col items-center">
    <div className="relative w-[280px] h-[560px] bg-foreground rounded-[2.5rem] p-3 shadow-2xl">
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-foreground rounded-b-2xl z-10" />
      <div className="w-full h-full bg-background rounded-[2rem] overflow-hidden flex flex-col">
        {children}
      </div>
    </div>
    <p className="mt-4 text-sm font-semibold text-foreground" style={{ fontFamily: "var(--font-body)" }}>{title}</p>
  </div>
);

const AppMobile = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-16 bg-gradient-to-b from-accent/30 to-background">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground mb-6">
            <Smartphone className="w-4 h-4" />Application mobile
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">L'app Eko Boko 📱</h1>
          <p className="text-lg text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>
            Gère ton recyclage du bout des doigts. Réserve, suis tes collectes et reste connecté à la planète. 🌍
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 justify-items-center">
            <PhoneFrame title="🏠 Accueil">
              <div className="flex-1 p-5 flex flex-col gap-4 overflow-hidden">
                <div>
                  <p className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>👋 Bonjour</p>
                  <h2 className="text-xl font-bold text-foreground">Jade</h2>
                </div>
                <div className="bg-primary text-primary-foreground rounded-2xl p-4">
                  <p className="text-xs opacity-80 mb-1">📦 Prochaine collecte</p>
                  <p className="text-lg font-bold">Dimanche 28 avril</p>
                  <p className="text-xs opacity-80 mt-1">10h00 — Petit-Bourg</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-accent rounded-xl p-3 text-center">
                    <Plus className="w-5 h-5 mx-auto mb-1 text-primary" />
                    <p className="text-[10px] font-semibold text-foreground">Réserver</p>
                  </div>
                  <div className="bg-accent rounded-xl p-3 text-center">
                    <Package className="w-5 h-5 mx-auto mb-1 text-primary" />
                    <p className="text-[10px] font-semibold text-foreground">Abonnement</p>
                  </div>
                </div>
                <div className="bg-card rounded-xl p-3 border border-border">
                  <p className="text-[10px] text-muted-foreground mb-1">Bouteilles recyclées</p>
                  <p className="text-2xl font-bold text-primary">128 ♻️</p>
                </div>
              </div>
            </PhoneFrame>

            <PhoneFrame title="💳 S'abonner">
              <div className="flex-1 p-5 flex flex-col gap-3 overflow-hidden">
                <h2 className="text-lg font-bold text-foreground">Choisis ta formule</h2>
                {plans.map((p) => (
                  <div key={p.name} className={`rounded-xl border p-3 ${p.color}`}>
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-sm">{p.name}</p>
                      <p className="font-bold text-sm">{p.price}</p>
                    </div>
                    <p className="text-[10px] opacity-80">{p.desc}</p>
                  </div>
                ))}
                <div className="mt-auto space-y-2">
                  <button className="w-full bg-foreground text-background rounded-xl py-2 text-xs font-semibold">💳 Carte bancaire</button>
                  <button className="w-full bg-accent text-foreground rounded-xl py-2 text-xs font-semibold">PayPal</button>
                </div>
              </div>
            </PhoneFrame>

            <PhoneFrame title="📅 Réserver">
              <div className="flex-1 p-5 flex flex-col gap-3 overflow-hidden">
                <h2 className="text-lg font-bold text-foreground">Nouvelle collecte</h2>
                <div className="bg-card border border-border rounded-xl p-3">
                  <p className="text-[10px] text-muted-foreground mb-1">📆 Jour</p>
                  <p className="text-sm font-semibold text-foreground">Dimanche 28 avril</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-3">
                  <p className="text-[10px] text-muted-foreground mb-1">⏰ Heure</p>
                  <p className="text-sm font-semibold text-foreground">10h00 — 12h00</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-3">
                  <p className="text-[10px] text-muted-foreground mb-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> Adresse</p>
                  <p className="text-sm font-semibold text-foreground">12 rue des Manguiers</p>
                  <p className="text-[10px] text-muted-foreground">Petit-Bourg</p>
                </div>
                <button className="mt-auto w-full bg-primary text-primary-foreground rounded-xl py-3 text-sm font-bold">Confirmer ✔</button>
              </div>
            </PhoneFrame>

            <PhoneFrame title="📆 Mes passages">
              <div className="flex-1 p-5 flex flex-col gap-3 overflow-hidden">
                <h2 className="text-lg font-bold text-foreground">Historique</h2>
                <div className="flex gap-3 items-center bg-primary/10 rounded-xl p-3">
                  <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex flex-col items-center justify-center">
                    <span className="text-[8px]">AVR</span><span className="text-sm font-bold leading-none">20</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-foreground">Collecte prévue</p>
                    <p className="text-[10px] text-muted-foreground">10h — Petit-Bourg</p>
                  </div>
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div className="flex gap-3 items-center bg-accent/50 rounded-xl p-3">
                  <div className="w-10 h-10 rounded-lg bg-muted text-foreground flex flex-col items-center justify-center">
                    <span className="text-[8px]">AVR</span><span className="text-sm font-bold leading-none">12</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-foreground">Collecte effectuée</p>
                    <p className="text-[10px] text-muted-foreground">22 bouteilles ♻️</p>
                  </div>
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <div className="flex gap-3 items-center bg-accent/50 rounded-xl p-3">
                  <div className="w-10 h-10 rounded-lg bg-muted text-foreground flex flex-col items-center justify-center">
                    <span className="text-[8px]">AVR</span><span className="text-sm font-bold leading-none">05</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-foreground">Collecte effectuée</p>
                    <p className="text-[10px] text-muted-foreground">18 bouteilles ♻️</p>
                  </div>
                  <Check className="w-4 h-4 text-primary" />
                </div>
              </div>
            </PhoneFrame>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Tout dans une app ✨</h2>
            <p className="text-lg text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>Simple, moderne, écologique.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Home, title: "Dashboard", desc: "Bonjour + prochaine collecte en un coup d'œil." },
              { icon: CalendarPlus, title: "Réserver", desc: "Choisis jour, heure et adresse en 3 clics." },
              { icon: CalendarCheck, title: "Calendrier", desc: "Tes prochaines collectes et tout l'historique." },
              { icon: CreditCard, title: "Abonnement", desc: "Basic, Standard ou Premium. Carte ou PayPal." },
              { icon: Bell, title: "Notifications", desc: "Rappel la veille, on arrive et confirmation." },
              { icon: MessageCircle, title: "Contact direct", desc: "WhatsApp, téléphone ou email en un clic." },
            ].map((f) => (
              <div key={f.title} className="bg-background rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground mb-6">
              <Bell className="w-4 h-4" />Notifications intelligentes
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Toujours au bon moment 🔔</h2>
            <ul className="space-y-4">
              {["📅 Rappel la veille de la collecte", "🚗 On arrive dans 1h", "♻️ Confirmation après le passage"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-foreground" style={{ fontFamily: "var(--font-body)" }}>
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />{t}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card rounded-3xl border border-border p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary text-primary-foreground mb-6 mx-auto">
              <QrCode className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">Scanne. Recycle. ✨</h3>
            <p className="text-muted-foreground mb-6" style={{ fontFamily: "var(--font-body)" }}>
              Le QR code Eko Boko sur la box, les flyers ou chez tes commerçants — un scan et c'est parti.
            </p>
            <div className="grid grid-cols-8 grid-rows-8 gap-1 w-40 h-40 mx-auto bg-foreground p-3 rounded-xl">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className={`rounded-sm ${(i * 7 + (i % 5)) % 3 === 0 ? "bg-background" : "bg-foreground"}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-background to-accent/40">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <Recycle className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Bientôt disponible 🚀</h2>
          <p className="text-lg text-muted-foreground mb-8" style={{ fontFamily: "var(--font-body)" }}>
            En attendant, inscris-toi en ligne et reçois ta box. La planète dit merci 🌍
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="hero" size="lg" className="px-8 py-6">📱 iOS — bientôt</Button>
            <Button variant="hero-outline" size="lg" className="px-8 py-6">🤖 Android — bientôt</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AppMobile;
