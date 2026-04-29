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
          <div className="flex items-start gap-3 rounded-xl bg-accent border border-border p-4">
            <MapPin className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground">Bientôt disponible 🚀</p>
              <p className="text-sm text-muted-foreground mt-1" style={{ fontFamily: "var(--font-body)" }}>
                Votre zone fait partie de notre prochaine vague de déploiement. Laissez-nous vos coordonnées pour être prévenu(e).
              </p>
            </div>
          </div>
        )}

        {status === "not-covered" && (
          <div className="flex items-start gap-3 rounded-xl bg-muted border border-border p-4">
            <XCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground">Pas encore desservi</p>
              <p className="text-sm text-muted-foreground mt-1" style={{ fontFamily: "var(--font-body)" }}>
                Nous ne passons pas encore dans cette zone, mais écrivez-nous : on couvre toute la Guadeloupe d'ici 2027 ! 🌴
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CoverageChecker;
