import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const STORAGE_KEY = "ekoboko_signup_draft";

const schema = z.object({
  nom: z.string().trim().min(1, "Nom requis").max(100),
  adresse: z.string().trim().min(3, "Adresse requise").max(200),
  formule: z.enum(["basic", "standard", "infini-pro"], {
    errorMap: () => ({ message: "Choisissez une formule" }),
  }),
});

interface PickupRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: () => void;
}

const PickupRequestDialog = ({ open, onOpenChange, onContinue }: PickupRequestDialogProps) => {
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [formule, setFormule] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse({ nom, adresse, formule });
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }
    // Pré-remplir le brouillon utilisé par SignupDialog
    try {
      const existing = (() => {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
      })();
      const [prenom, ...rest] = result.data.nom.split(" ");
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ...existing,
          prenom: existing.prenom || prenom || "",
          nom: existing.nom || rest.join(" ") || prenom || "",
          adresse: result.data.adresse,
          formule: result.data.formule,
        })
      );
    } catch {
      // ignore
    }
    toast.success("Demande enregistrée — finalisez votre inscription.");
    onOpenChange(false);
    setTimeout(() => onContinue(), 200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Demander mon ramassage</DialogTitle>
          <DialogDescription style={{ fontFamily: "var(--font-body)" }}>
            Quelques infos pour préparer votre première collecte à Pointe-à-Bacchus.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4" style={{ fontFamily: "var(--font-body)" }}>
          <div className="space-y-1.5">
            <Label htmlFor="pr-nom">Nom complet *</Label>
            <Input id="pr-nom" maxLength={100} value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Prénom Nom" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pr-adresse">Adresse *</Label>
            <Input id="pr-adresse" maxLength={200} value={adresse} onChange={(e) => setAdresse(e.target.value)} placeholder="Rue, quartier, Pointe-à-Bacchus" />
          </div>
          <div className="space-y-1.5">
            <Label>Type de formule *</Label>
            <Select value={formule} onValueChange={setFormule}>
              <SelectTrigger><SelectValue placeholder="Choisir une formule" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic — 7,50€/semaine</SelectItem>
                <SelectItem value="standard">Standard — 19,90€/mois</SelectItem>
                <SelectItem value="infini-pro">Infini Pro — 29,90€/mois</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" variant="hero" className="w-full">
            Continuer vers l'inscription
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Étape suivante : créer votre compte et finaliser le paiement.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PickupRequestDialog;
