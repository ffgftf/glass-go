import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Connexion = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !motDePasse) {
      toast.error("Veuillez renseigner votre email et votre mot de passe.");
      return;
    }
    const emailValide = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValide) {
      toast.error("Adresse email invalide.");
      return;
    }
    if (motDePasse.length < 6) {
      toast.error("Mot de passe trop court (6 caractères minimum).");
      return;
    }

    setLoading(true);
    try {
      sessionStorage.setItem("ekoboko_user", JSON.stringify({ email }));
    } catch {
      // ignore storage errors
    }
    toast.success("Connexion réussie !");
    setTimeout(() => {
      setLoading(false);
      navigate("/tableau-de-bord");
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6 pt-24 pb-12">
        <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-lg p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-foreground">Connexion</h1>
            <p className="text-sm text-muted-foreground mt-2" style={{ fontFamily: "var(--font-body)" }}>
              Accédez à votre tableau de bord Eko Boko 🌿
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" style={{ fontFamily: "var(--font-body)" }}>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="vous@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="motDePasse">Mot de passe</Label>
              <Input
                id="motDePasse"
                type="password"
                placeholder="Votre mot de passe"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <Button type="submit" variant="hero" className="w-full" disabled={loading}>
              {loading ? "Connexion..." : "Accéder à mon tableau de bord"}
            </Button>
          </form>

          <p className="text-sm text-center text-muted-foreground mt-6" style={{ fontFamily: "var(--font-body)" }}>
            Pas encore de compte ?{" "}
            <Link to="/" className="text-primary hover:underline font-medium">
              S'inscrire
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Connexion;
