import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "ekoboko_signup_draft";

const emptyForm = {
  nom: "",
  prenom: "",
  email: "",
  telephone: "",
  adresse: "",
  formule: "",
  motDePasse: "",
  confirmationMotDePasse: "",
};

interface SignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SignupDialog = ({ open, onOpenChange }: SignupDialogProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(() => {
    if (typeof window === "undefined") return emptyForm;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ne jamais restaurer les mots de passe depuis le stockage local
        return { ...emptyForm, ...parsed, motDePasse: "", confirmationMotDePasse: "" };
      }
    } catch {
      // ignore
    }
    return emptyForm;
  });

  useEffect(() => {
    try {
      // On ne persiste PAS les mots de passe
      const { motDePasse, confirmationMotDePasse, ...safe } = formData;
      const isEmpty = Object.values(safe).every((v) => !v);
      if (isEmpty) {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
      }
    } catch {
      // ignore
    }
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nom || !formData.prenom || !formData.email || !formData.adresse || !formData.formule || !formData.motDePasse || !formData.confirmationMotDePasse) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    if (formData.motDePasse.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (formData.motDePasse !== formData.confirmationMotDePasse) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.motDePasse,
      options: {
        emailRedirectTo: `${window.location.origin}/tableau-de-bord`,
        data: {
          prenom: formData.prenom,
          nom: formData.nom,
          telephone: formData.telephone,
          adresse: formData.adresse,
          formule: formData.formule,
        },
      },
    });
    setLoading(false);

    if (error) {
      toast.error(error.message.includes("already") ? "Cet email est déjà inscrit." : error.message);
      return;
    }

    toast.success("Inscription réussie ! Vérifiez vos emails pour confirmer votre compte.");
    setFormData(emptyForm);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* noop */ }
    onOpenChange(false);
    navigate("/tableau-de-bord");
  };

  const handleGoogle = async () => {
    const { error } = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/tableau-de-bord`,
    });
    if (error) toast.error("Connexion Google impossible.");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>S'inscrire à Eko Boko</DialogTitle>
          <DialogDescription style={{ fontFamily: "var(--font-body)" }}>
            Service disponible uniquement à <strong>Pointe-à-Bacchus</strong>.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4" style={{ fontFamily: "var(--font-body)" }}>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="nom">Nom *</Label>
              <Input id="nom" value={formData.nom} onChange={(e) => setFormData({ ...formData, nom: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="prenom">Prénom *</Label>
              <Input id="prenom" value={formData.prenom} onChange={(e) => setFormData({ ...formData, prenom: e.target.value })} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email *</Label>
            <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="motDePasse">Mot de passe *</Label>
            <Input id="motDePasse" type="password" autoComplete="new-password" placeholder="Au moins 6 caractères" value={formData.motDePasse} onChange={(e) => setFormData({ ...formData, motDePasse: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="confirmationMotDePasse">Confirmer le mot de passe *</Label>
            <Input id="confirmationMotDePasse" type="password" autoComplete="new-password" placeholder="Ressaisir le mot de passe" value={formData.confirmationMotDePasse} onChange={(e) => setFormData({ ...formData, confirmationMotDePasse: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="telephone">Téléphone</Label>
            <Input id="telephone" type="tel" value={formData.telephone} onChange={(e) => setFormData({ ...formData, telephone: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="adresse">Adresse à Pointe-à-Bacchus *</Label>
            <Input id="adresse" placeholder="Votre adresse complète" value={formData.adresse} onChange={(e) => setFormData({ ...formData, adresse: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label>Formule *</Label>
            <Select value={formData.formule} onValueChange={(v) => setFormData({ ...formData, formule: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir une formule" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic — 7,50€/semaine</SelectItem>
                <SelectItem value="standard">Standard — 19,90€/mois</SelectItem>
                <SelectItem value="infini-pro">Infini Pro — 29,90€/mois</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-xs text-muted-foreground">
            Frais d'inscription annuels : 10€ (inclut le prêt de la boîte)
          </p>
          <Button type="submit" variant="hero" className="w-full" disabled={loading}>
            {loading ? "Création du compte..." : "Valider mon inscription"}
          </Button>
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-background px-2 text-muted-foreground">ou</span></div>
          </div>
          <Button type="button" variant="outline" className="w-full" onClick={handleGoogle}>
            Continuer avec Google
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignupDialog;
