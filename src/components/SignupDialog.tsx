import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

interface SignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SignupDialog = ({ open, onOpenChange }: SignupDialogProps) => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    adresse: "",
    formule: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nom || !formData.prenom || !formData.email || !formData.adresse || !formData.formule) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    toast.success("Inscription envoyée ! Nous vous contacterons très bientôt.");
    setFormData({ nom: "", prenom: "", email: "", telephone: "", adresse: "", formule: "" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
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
          <Button type="submit" variant="hero" className="w-full">
            Valider mon inscription
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignupDialog;
