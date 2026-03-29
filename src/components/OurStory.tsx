const OurStory = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-medium text-primary mb-2" style={{ fontFamily: "var(--font-body)" }}>
            Notre histoire
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Qui on est 💚
          </h2>
          <h3 className="text-xl font-semibold text-foreground mb-8">Jade & Lucas</h3>
          <div className="text-muted-foreground text-lg leading-relaxed space-y-6" style={{ fontFamily: "var(--font-body)" }}>
            <p>
              Salut, nous c'est Jade et Lucas, deux jeunes aventuriers fous de notre planète ! Un jour, on s'est dit : "Et si on aidait nos voisins à recycler leur verre ?"
            </p>
            <p>
              Comme il n'y avait pas de service de ramassage à domicile, on a pris les choses en main ! Avec notre super maman, on a créé notre logo trop stylé et une com' qui déchire. Maintenant, on est prêt à conquérir le monde du recyclage ! 🚀
            </p>
            <p>
              Merci d'encourager notre petite entreprise pleine d'énergie ! Pour nous filer un coup de pouce au démarrage, louez nos box et bénéficiez d'un mois de ramassage gratuit. En avant pour l'aventure écolo ! 🌴
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
