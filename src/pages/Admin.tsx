import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

type Inscription = {
  id: string;
  prenom: string | null;
  nom: string | null;
  email: string | null;
  telephone: string | null;
  adresse: string | null;
  formule: string | null;
  created_at: string;
};

const ZONES = [
  { key: "pointe-a-bacchus", label: "Pointe-à-Bacchus", match: ["pointe-a-bacchus", "pointe à bacchus", "pointe-à-bacchus", "bacchus"] },
  { key: "petit-bourg", label: "Petit-Bourg", match: ["petit-bourg", "petit bourg"] },
];

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const getZone = (adresse: string | null) => {
  const a = normalize(adresse ?? "");
  if (!a.trim()) return "Zone non renseignée";
  for (const z of ZONES) {
    if (z.match.some((m) => a.includes(normalize(m)))) return z.label;
  }
  return "Hors zone / à vérifier";
};

const Admin = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [rows, setRows] = useState<Inscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [zoneFilter, setZoneFilter] = useState("all");
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/connexion", { replace: true });
      return;
    }
    (async () => {
      const { data: roles, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin");

      const admin = !roleError && !!roles && roles.length > 0;
      setIsAdmin(admin);
      if (!admin) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("id, prenom, nom, email, telephone, adresse, formule, created_at")
        .order("created_at", { ascending: false });

      if (error) toast.error("Impossible de charger les inscriptions.");
      else setRows(data ?? []);
      setLoading(false);
    })();
  }, [user, authLoading, navigate]);

  const filtered = useMemo(() => {
    const q = normalize(search.trim());
    return rows.filter((r) => {
      const zone = getZone(r.adresse);
      if (zoneFilter !== "all" && zone !== zoneFilter) return false;
      if (!q) return true;
      return normalize(
        [r.prenom, r.nom, r.email, r.telephone, r.adresse, r.formule].join(" "),
      ).includes(q);
    });
  }, [rows, search, zoneFilter]);

  const grouped = useMemo(() => {
    const map = new Map<string, Inscription[]>();
    filtered.forEach((r) => {
      const zone = getZone(r.adresse);
      map.set(zone, [...(map.get(zone) ?? []), r]);
    });
    return [...map.entries()].sort((a, b) => b[1].length - a[1].length);
  }, [filtered]);

  const zoneOptions = useMemo(
    () => [...new Set(rows.map((r) => getZone(r.adresse)))],
    [rows],
  );

  const exportTournee = () => {
    const header = "Zone;Nom;Téléphone;Adresse;Formule";
    const lines = grouped.flatMap(([zone, list]) =>
      list.map((r) =>
        [zone, `${r.prenom ?? ""} ${r.nom ?? ""}`.trim(), r.telephone ?? "", r.adresse ?? "", r.formule ?? ""]
          .map((v) => v.replace(/;/g, ","))
          .join(";"),
      ),
    );
    const blob = new Blob([[header, ...lines].join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tournee-ekoboko-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
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

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 container mx-auto px-6 pt-24 pb-12 text-center">
          <h1 className="text-2xl font-bold text-foreground">Accès réservé</h1>
          <p className="text-muted-foreground mt-2">
            Cet espace est réservé à l'équipe Eko Boko.
          </p>
          <Button className="mt-6" variant="outline" onClick={() => navigate("/tableau-de-bord")}>
            Retour à mon tableau de bord
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-6 pt-24 pb-12" style={{ fontFamily: "var(--font-body)" }}>
        <div className="max-w-5xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Espace admin</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Inscriptions, adresses par zone et préparation des tournées du dimanche.
            </p>
          </header>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="text-sm text-muted-foreground">Inscriptions</p>
              <p className="text-2xl font-bold mt-1">{rows.length}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="text-sm text-muted-foreground">Zones actives</p>
              <p className="text-2xl font-bold mt-1">{zoneOptions.length}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="text-sm text-muted-foreground">Arrêts préparés</p>
              <p className="text-2xl font-bold mt-1">
                {Object.values(done).filter(Boolean).length}/{filtered.length}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Input
              placeholder="Rechercher un nom, une adresse, un email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="all">Toutes les zones</option>
              {zoneOptions.map((z) => (
                <option key={z} value={z}>{z}</option>
              ))}
            </select>
            <Button variant="outline" onClick={exportTournee} disabled={!filtered.length}>
              Exporter la tournée (CSV)
            </Button>
          </div>

          {!filtered.length ? (
            <p className="text-muted-foreground">Aucune inscription à afficher.</p>
          ) : (
            <div className="space-y-8">
              {grouped.map(([zone, list]) => (
                <section key={zone}>
                  <h2 className="text-lg font-bold text-foreground mb-3">
                    {zone} <span className="text-muted-foreground font-normal">({list.length})</span>
                  </h2>
                  <ul className="space-y-3">
                    {list.map((r) => (
                      <li
                        key={r.id}
                        className={`bg-card border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3 ${
                          done[r.id] ? "border-primary/40 bg-primary/5" : "border-border"
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground truncate">
                            {`${r.prenom ?? ""} ${r.nom ?? ""}`.trim() || "Sans nom"}
                            {r.formule && (
                              <span className="ml-2 text-xs font-medium text-primary">{r.formule}</span>
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground truncate">{r.adresse || "Adresse non renseignée"}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {r.telephone || "—"} · {r.email || "—"} · inscrit le{" "}
                            {new Date(r.created_at).toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          {r.adresse && (
                            <Button variant="outline" size="sm" asChild>
                              <a
                                href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(r.adresse)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Carte
                              </a>
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant={done[r.id] ? "default" : "outline"}
                            onClick={() => setDone((d) => ({ ...d, [r.id]: !d[r.id] }))}
                          >
                            {done[r.id] ? "Préparé ✓" : "Marquer préparé"}
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
