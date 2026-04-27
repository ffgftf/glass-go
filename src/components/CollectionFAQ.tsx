import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "Quels quartiers sont desservis ?",
    a: "Nous desservons toute la commune de Pointe-à-Bacchus et ses quartiers : Centre-ville, Montebello, Carrère, Duquerry, Bovis et La Lézarde. D'autres zones (Baie-Mahault, Lamentin, Pointe-à-Pitre et la Grande-Terre) arrivent prochainement.",
  },
  {
    q: "Quels sont les horaires de collecte ?",
    a: "Nos tournées s'effectuent du lundi au samedi, entre 7h et 17h. Vous recevez un SMS la veille de votre passage pour sortir votre box.",
  },
  {
    q: "Quels types de verre sont acceptés ?",
    a: "Bouteilles (vin, bière, jus, huile), bocaux et pots en verre (confiture, conserves, yaourts en verre). Merci de les rincer rapidement. Non acceptés : vaisselle, miroirs, vitres, ampoules, verre médical ou céramique.",
  },
  {
    q: "À quelle fréquence avez-vous lieu les ramassages ?",
    a: "Selon votre formule : hebdomadaire, toutes les 2 semaines ou mensuelle. Vous pouvez demander un ramassage supplémentaire à tout moment via votre tableau de bord ou WhatsApp.",
  },
  {
    q: "Que faire si ma box est pleine avant le prochain passage ?",
    a: "Pas de souci ! Demandez un ramassage express via le bouton « Demander mon ramassage » ou contactez-nous sur WhatsApp. Nous passons sous 48h selon les disponibilités.",
  },
];

const CollectionFAQ = () => {
  return (
    <section className="py-24 bg-accent/30" id="faq-zone">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground mb-6">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Questions fréquentes 🤔
          </h2>
          <p className="text-lg text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>
            Tout ce qu'il faut savoir sur la collecte
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-card rounded-2xl border border-border p-6 md:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-foreground font-semibold hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base" style={{ fontFamily: "var(--font-body)" }}>
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default CollectionFAQ;
