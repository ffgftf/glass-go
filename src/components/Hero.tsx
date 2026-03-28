import heroImage from "@/assets/hero-glass.jpg";
import { Button } from "@/components/ui/button";
import { Recycle } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Boîte de collecte de verre sur un pas de porte"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground animate-fade-up">
            <Recycle className="w-4 h-4" />
            Recyclage du verre à domicile
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight animate-fade-up" style={{ animationDelay: "0.1s" }}>
            On s'occupe de<br />
            <span className="text-accent">vos bocaux.</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-lg animate-fade-up" style={{ animationDelay: "0.2s", fontFamily: "var(--font-body)" }}>
            Mettez vos contenants en verre dans la boîte fournie.
            Nous récupérons, vidons et vous en laissons une nouvelle.
            Simple comme bonjour.
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="lg" className="px-8 py-6">
              S'abonner — 19,90€/mois
            </Button>
            <Button variant="hero-outline" size="lg" className="px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground">
              En savoir plus
            </Button>
          </div>

          <p className="text-sm text-primary-foreground/60 animate-fade-up" style={{ animationDelay: "0.4s", fontFamily: "var(--font-body)" }}>
            Ramassage chaque dimanche à partir de 13h
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
