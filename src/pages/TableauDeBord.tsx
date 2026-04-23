import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

type Profile = {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  formule: string;
};

const emptyProfile: Profile = { prenom: "", nom: "", email: "", telephone: "", adresse: "", formule: "" };

// Calcule la prochaine collecte : dimanche à partir de 13h00
const getNextCollecte = (now = new Date()) => {
  const next = new Date(now);
  next.setSeconds(0, 0);
  const day = now.getDay(); // 0 = dimanche
  if (day === 0 && now.getHours() < 13) {
    next.setHours(13, 0, 0, 0);
  } else {
    const daysUntilSunday = (7 - day) % 7 || 7;
    next.setDate(now.getDate() + daysUntilSunday);
    next.setHours(13, 0, 0, 0);
  }
  return next;
};

const formatCollecte = (d: Date) =>
  d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }) +
  " à partir de 13h00";

const TableauDeBord = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [draft, setDraft] = useState<Profile>(emptyProfile);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const nextCollecte = getNextCollecte();
  const hoursUntilCollecte = Math.round((nextCollecte.getTime() - Date.now()) / 36e5);
  const isImminent = hoursUntilCollecte <= 48;

  useEffect(() => {
    if (loading) return;
    if (isImminent) {
      toast("📦 Rappel collecte", {
        description: `Votre prochaine collecte est ${formatCollecte(nextCollecte)}.`,
        duration: 6000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/connexion", { replace: true });
      return;
    }
    (async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("prenom, nom, email, telephone, adresse, formule")
        .eq("id", user.id)
        .maybeSingle();
      if (error) {
        toast.error("Impossible de charger votre profil.");
      } else if (data) {
        const p: Profile = {
          prenom: data.prenom ?? "",
          nom: data.nom ?? "",
          email: data.email ?? user.email ?? "",
          telephone: data.telephone ?? "",
          adresse: data.adresse ?? "",
          formule: data.formule ?? "",
        };
        setProfile(p);
        setDraft(p);
      }
      setLoading(false);
    })();
  }, [user, authLoading, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Vous êtes déconnecté.");
    navigate("/connexion");
  };

  const startEdit = () => { setDraft(profile); setEditing(true); };
  const cancelEdit = () => { setDraft(profile); setEditing(false); };

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!draft.prenom || !draft.nom || !draft.email) {
      toast.error("Prénom, nom et email sont obligatoires.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email)) {
      toast.error("Adresse email invalide.");
      return;
    }
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        prenom: draft.prenom,
        nom: draft.nom,
        email: draft.email,
        telephone: draft.telephone,
        adresse: draft.adresse,
        formule: draft.formule,
      })
      .eq("id", user.id);
    setSaving(false);

    if (error) {
      toast.error("Impossible d'enregistrer.");
      return;
    }
    setProfile(draft);
    toast.success("Informations mises à jour !");
    setEditing(false);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center text-muted-foreground">Chargement...</main>
        <Footer />
      </div>
    );
  }

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
            <Button variant="outline" size="sm" onClick={handleLogout}>Se déconnecter</Button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-sm text-muted-foreground">📦 Prochaine collecte</p>
              <p className="text-xl font-semibold mt-2">Vendredi 9h00</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-sm text-muted-foreground">🎯 Formule actuelle</p>
              <p className="text-xl font-semibold mt-2 capitalize">{profile.formule || "—"}</p>
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
                <p className="text-sm text-muted-foreground mt-1">Consultez et mettez à jour vos coordonnées.</p>
              </div>
              {!editing && (<Button variant="outline" size="sm" onClick={startEdit}>Modifier</Button>)}
            </div>

            {!editing ? (
              <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                <div><dt className="text-muted-foreground">Prénom</dt><dd className="font-medium text-foreground mt-0.5">{profile.prenom || "—"}</dd></div>
                <div><dt className="text-muted-foreground">Nom</dt><dd className="font-medium text-foreground mt-0.5">{profile.nom || "—"}</dd></div>
                <div className="sm:col-span-2"><dt className="text-muted-foreground">Email</dt><dd className="font-medium text-foreground mt-0.5">{profile.email || "—"}</dd></div>
                <div><dt className="text-muted-foreground">Téléphone</dt><dd className="font-medium text-foreground mt-0.5">{profile.telephone || "—"}</dd></div>
                <div><dt className="text-muted-foreground">Adresse</dt><dd className="font-medium text-foreground mt-0.5">{profile.adresse || "—"}</dd></div>
              </dl>
            ) : (
              <form onSubmit={saveProfile} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5"><Label htmlFor="prenom">Prénom *</Label><Input id="prenom" value={draft.prenom} onChange={(e) => setDraft({ ...draft, prenom: e.target.value })} /></div>
                  <div className="space-y-1.5"><Label htmlFor="nom">Nom *</Label><Input id="nom" value={draft.nom} onChange={(e) => setDraft({ ...draft, nom: e.target.value })} /></div>
                </div>
                <div className="space-y-1.5"><Label htmlFor="email">Email *</Label><Input id="email" type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} /></div>
                <div className="space-y-1.5"><Label htmlFor="telephone">Téléphone</Label><Input id="telephone" type="tel" value={draft.telephone} onChange={(e) => setDraft({ ...draft, telephone: e.target.value })} /></div>
                <div className="space-y-1.5"><Label htmlFor="adresse">Adresse</Label><Input id="adresse" value={draft.adresse} onChange={(e) => setDraft({ ...draft, adresse: e.target.value })} /></div>
                <div className="flex gap-3 justify-end pt-2">
                  <Button type="button" variant="outline" onClick={cancelEdit} disabled={saving}>Annuler</Button>
                  <Button type="submit" variant="hero" disabled={saving}>{saving ? "Enregistrement..." : "Enregistrer"}</Button>
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
