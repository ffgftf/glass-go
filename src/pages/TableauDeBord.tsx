import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const TableauDeBord = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("ekoboko_user");
      if (!raw) {
        navigate("/connexion");
        return;
      }
      const user = JSON.parse(raw);
      setEmail(user.email ?? null);
    } catch {
      navigate("/connexion");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("ekoboko_user");
    toast.success("Vous êtes déconnecté.");
    navigate("/connexion");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-6 pt-24 pb-12" style={{ fontFamily: "var(--font-body)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Tableau de bord</h1>
              {email && (
                <p className="text-sm text-muted-foreground mt-1">Connecté en tant que {email}</p>
              )}
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Se déconnecter
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-sm text-muted-foreground">📦 Prochaine collecte</p>
              <p className="text-xl font-semibold mt-2">Vendredi 9h00</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-sm text-muted-foreground">🎯 Formule actuelle</p>
              <p className="text-xl font-semibold mt-2">Standard</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-sm text-muted-foreground">♻️ Bouteilles recyclées</p>
              <p className="text-xl font-semibold mt-2">128</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-sm text-muted-foreground">📅 Prochaine facture</p>
              <p className="text-xl font-semibold mt-2">1er du mois</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TableauDeBord;
