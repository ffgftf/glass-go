import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const PROFILE_KEY = "ekoboko_profile";

type Profile = {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
};

const emptyProfile: Profile = {
  prenom: "",
  nom: "",
  email: "",
  telephone: "",
  adresse: "",
};

const TableauDeBord = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [draft, setDraft] = useState<Profile>(emptyProfile);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("ekoboko_user");
      if (!raw) {
        navigate("/connexion");
        return;
      }
      const user = JSON.parse(raw);
      const savedRaw = localStorage.getItem(PROFILE_KEY);
      const saved = savedRaw ? (JSON.parse(savedRaw) as Partial<Profile>) : {};
      const initial: Profile = {
        ...emptyProfile,
        ...saved,
        email: saved.email || user.email || "",
      };
      setProfile(initial);
      setDraft(initial);
    } catch {
      navigate("/connexion");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("ekoboko_user");
    toast.success("Vous êtes déconnecté.");
    navigate("/connexion");
  };

  const startEdit = () => {
    setDraft(profile);
    setEditing(true);
  };

  const cancelEdit = () => {
    setDraft(profile);
    setEditing(false);
  };

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.prenom || !draft.nom || !draft.email) {
      toast.error("Prénom, nom et email sont obligatoires.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email)) {
      toast.error("Adresse email invalide.");
      return;
    }
    setProfile(draft);
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(draft));
      const raw = sessionStorage.getItem("ekoboko_user");
      const user = raw ? JSON.parse(raw) : {};
      sessionStorage.setItem("ekoboko_user", JSON.stringify({ ...user, email: draft.email }));
    } catch {
      // ignore
    }
    toast.success("Informations mises à jour !");
    setEditing(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-6 pt-24 pb-12" style={{ fontFamily: "var(--font-body)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Tableau de bord</h1>
              {profile.email && (
                <p className="text-sm text-muted-foreground mt-1">Connecté en tant que {profile.email}</p>
              )}
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Se déconnecter
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
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

          <section className="bg-card border border-border rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">Mes informations personnelles</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Consultez et mettez à jour vos coordonnées.
                </p>
              </div>
              {!editing && (
                <Button variant="outline" size="sm" onClick={startEdit}>
                  Modifier
                </Button>
              )}
            </div>

            {!editing ? (
              <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                <div>
                  <dt className="text-muted-foreground">Prénom</dt>
                  <dd className="font-medium text-foreground mt-0.5">{profile.prenom || "—"}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Nom</dt>
                  <dd className="font-medium text-foreground mt-0.5">{profile.nom || "—"}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-muted-foreground">Email</dt>
                  <dd className="font-medium text-foreground mt-0.5">{profile.email || "—"}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Téléphone</dt>
                  <dd className="font-medium text-foreground mt-0.5">{profile.telephone || "—"}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Adresse</dt>
                  <dd className="font-medium text-foreground mt-0.5">{profile.adresse || "—"}</dd>
                </div>
              </dl>
            ) : (
              <form onSubmit={saveProfile} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="prenom">Prénom *</Label>
                    <Input
                      id="prenom"
                      value={draft.prenom}
                      onChange={(e) => setDraft({ ...draft, prenom: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="nom">Nom *</Label>
                    <Input
                      id="nom"
                      value={draft.nom}
                      onChange={(e) => setDraft({ ...draft, nom: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={draft.email}
                    onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="telephone">Téléphone</Label>
                  <Input
                    id="telephone"
                    type="tel"
                    value={draft.telephone}
                    onChange={(e) => setDraft({ ...draft, telephone: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="adresse">Adresse</Label>
                  <Input
                    id="adresse"
                    value={draft.adresse}
                    onChange={(e) => setDraft({ ...draft, adresse: e.target.value })}
                  />
                </div>
                <div className="flex gap-3 justify-end pt-2">
                  <Button type="button" variant="outline" onClick={cancelEdit}>
                    Annuler
                  </Button>
                  <Button type="submit" variant="hero">
                    Enregistrer
                  </Button>
                </div>
              </form>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TableauDeBord;
