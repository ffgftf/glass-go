import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MessageCircle, Phone, Mail } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Une question ? Parlons-en 💬
            </h1>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <a
              href="https://wa.me/0690000000"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-card rounded-2xl border border-border p-8 text-center hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-6 mx-auto group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <MessageCircle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">WhatsApp</h3>
              <p className="text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>
                Réponse rapide
              </p>
            </a>

            <a
              href="tel:0690000000"
              className="group bg-card rounded-2xl border border-border p-8 text-center hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-6 mx-auto group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <Phone className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Téléphone</h3>
              <p className="text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>
                0690 00 00 00
              </p>
            </a>

            <a
              href="mailto:contact@ekoboko.fr"
              className="group bg-card rounded-2xl border border-border p-8 text-center hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-6 mx-auto group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <Mail className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>
                contact@ekoboko.fr
              </p>
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
