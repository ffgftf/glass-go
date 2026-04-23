import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/hooks/useAuth";

const Connexion = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate("/tableau-de-bord", { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !motDePasse) {
      toast.error("Veuillez renseigner votre email et votre mot de passe.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: motDePasse });
    setLoading(false);

    if (error) {
      toast.error(error.message.includes("Invalid") ? "Email ou mot de passe incorrect." : error.message);
      return;
    }
    toast.success("Connexion réussie !");
    navigate("/tableau-de-bord");
  };

  const handleGoogle = async () => {
    const { error } = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/tableau-de-bord`,
    });
    if (error) toast.error("Connexion Google impossible.");
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
              <Input id="email" type="email" placeholder="vous@exemple.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="motDePasse">Mot de passe</Label>
              <Input id="motDePasse" type="password" placeholder="Votre mot de passe" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} autoComplete="current-password" />
            </div>

            <Button type="submit" variant="hero" className="w-full" disabled={loading}>
              {loading ? "Connexion..." : "Se connecter"}
            </Button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
              <div className="relative flex justify-center text-xs"><span className="bg-card px-2 text-muted-foreground">ou</span></div>
            </div>
            <Button type="button" variant="outline" className="w-full" onClick={handleGoogle}>
              Continuer avec Google
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
