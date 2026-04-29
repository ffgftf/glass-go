import { useState } from "react";
import { Search, CheckCircle2, XCircle, MapPin, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const COVERED = [
  "pointe-a-bacchus",
  "pointe a bacchus",
  "pointe à bacchus",
  "petit-bourg",
  "petit bourg",
  "centre-ville",
  "centre ville",
  "montebello",
  "carrere",
  "carrère",
  "duquerry",
  "bovis",
  "la lezarde",
  "la lézarde",
  "lezarde",
  "lézarde",
];

const SOON = [
  "baie-mahault",
  "baie mahault",
  "lamentin",
  "pointe-a-pitre",
  "pointe à pitre",
  "pointe a pitre",
  "abymes",
  "gosier",
  "sainte-anne",
  "saint-francois",
  "morne-a-l-eau",
];

type Status = "idle" | "covered" | "soon" | "not-covered" | "invalid";

// Détecte une entrée non exploitable : trop courte, chiffres seuls, code postal, caractères non-lettres
const looksInvalid = (raw: string) => {
  const trimmed = raw.trim();
  if (trimmed.length < 3) return true;
  // Que des chiffres / espaces / ponctuation (ex: "97170", "12 rue")
  if (!/[a-zA-ZÀ-ÿ]{3,}/.test(trimmed)) return true;
  // Code postal seul
  if (/^\d{4,5}$/.test(trimmed)) return true;
  return false;
};

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const CoverageChecker = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const check = (e?: React.FormEvent) => {
    e?.preventDefault();
    const q = normalize(query);
    if (!q) {
      setStatus("idle");
      return;
    }
    if (looksInvalid(query)) {
      setStatus("invalid");
      return;
    }
    if (COVERED.some((c) => q.includes(normalize(c)))) {
      setStatus("covered");
    } else if (SOON.some((c) => q.includes(normalize(c)))) {
      setStatus("soon");
    } else {
      setStatus("not-covered");
    }
  };

  const reset = (v: boolean) => {
    setOpen(v);
    if (!v) {
      setQuery("");
      setStatus("idle");
    }
  };

  return (
    <Dialog open={open} onOpenChange={reset}>
      <DialogTrigger asChild>
        <Button size="lg" className="rounded-xl">
          <Search className="w-4 h-4 mr-2" />
          Vérifier si je suis desservi
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Vérifier votre adresse</DialogTitle>
          <DialogDescription>
            Entrez votre commune, quartier ou adresse pour savoir si nous passons chez vous.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={check} className="space-y-3">
          <div className="relative">
            <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setStatus("idle");
              }}
              placeholder="Ex : Montebello, Petit-Bourg…"
              maxLength={120}
              className="pl-9"
              autoFocus
            />
          </div>
          <Button type="submit" className="w-full rounded-xl">
            Vérifier
          </Button>
        </form>

        {status === "covered" && (
          <div className="flex items-start gap-3 rounded-xl bg-primary/10 border border-primary/20 p-4">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground">Bonne nouvelle, on passe chez vous ! 🎉</p>
              <p className="text-sm text-muted-foreground mt-1" style={{ fontFamily: "var(--font-body)" }}>
                Votre zone est desservie. Inscrivez-vous pour démarrer.
              </p>
            </div>
          </div>
        )}

        {status === "soon" && (
          <div className="rounded-xl bg-accent border border-border p-4 space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">Bientôt disponible 🚀</p>
                <p className="text-sm text-muted-foreground mt-1" style={{ fontFamily: "var(--font-body)" }}>
                  Votre zone fait partie de notre prochaine vague de déploiement.
                </p>
              </div>
            </div>
            <div className="rounded-lg bg-background/60 border border-border p-3">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-1">Prochaine étape</p>
              <p className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>
                Rejoignez la liste d'attente : on vous prévient dès l'ouverture de votre zone.
              </p>
            </div>
            <Button asChild className="w-full rounded-xl">
              <a href="/contact?sujet=liste-attente" onClick={() => setOpen(false)}>
                Rejoindre la liste d'attente
              </a>
            </Button>
          </div>
        )}

        {status === "not-covered" && (
          <div className="rounded-xl bg-muted border border-border p-4 space-y-3">
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">Pas encore desservi</p>
                <p className="text-sm text-muted-foreground mt-1" style={{ fontFamily: "var(--font-body)" }}>
                  Cette zone n'est pas encore dans notre planning, mais on couvre toute la Guadeloupe d'ici 2027 ! 🌴
                </p>
              </div>
            </div>
            <div className="rounded-lg bg-background/60 border border-border p-3">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-1">Prochaine étape</p>
              <p className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>
                Contactez-nous pour signaler votre intérêt — chaque demande nous aide à prioriser les nouvelles zones.
              </p>
            </div>
            <Button asChild variant="outline" className="w-full rounded-xl">
              <a href="/contact?sujet=zone-non-couverte" onClick={() => setOpen(false)}>
                Nous contacter
              </a>
            </Button>
          </div>
        )}

        {status === "invalid" && (
          <div className="flex items-start gap-3 rounded-xl bg-destructive/10 border border-destructive/30 p-4">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground">Saisie non reconnue</p>
              <p className="text-sm text-muted-foreground mt-1" style={{ fontFamily: "var(--font-body)" }}>
                Merci d'indiquer uniquement un <strong>nom de commune</strong> ou de <strong>quartier</strong> (ex : « Petit-Bourg » ou « Montebello »).
                Évitez les numéros de rue et les codes postaux — ils ne nous permettent pas de localiser votre zone.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CoverageChecker;
