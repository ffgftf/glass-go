import { MapPin } from "lucide-react";

// Pointe-à-Bacchus, Petit-Bourg, Guadeloupe — approx. coords
const LAT = 16.1933;
const LON = -61.5897;
const DELTA = 0.025;

const bbox = `${LON - DELTA},${LAT - DELTA},${LON + DELTA},${LAT + DELTA}`;
const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${LAT},${LON}`;
const mapLink = `https://www.openstreetmap.org/?mlat=${LAT}&mlon=${LON}#map=14/${LAT}/${LON}`;

const CollectionMap = () => {
  return (
    <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-sm">
      <div className="aspect-video w-full bg-muted">
        <iframe
          title="Carte de la zone de collecte Eko Boko — Pointe-à-Bacchus"
          src={mapSrc}
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="flex items-center justify-between gap-3 p-4 border-t border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>
          <MapPin className="w-4 h-4 text-primary" />
          Pointe-à-Bacchus, Petit-Bourg — Guadeloupe (971)
        </div>
        <a
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-primary hover:underline"
        >
          Voir en grand
        </a>
      </div>
    </div>
  );
};

export default CollectionMap;
