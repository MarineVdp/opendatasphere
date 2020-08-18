var langage = {
    flags: [document.querySelector('#lang-fr'), document.querySelector('#lang-en')],
    actual: 'Fr',
    translateAll: function() {
        document.querySelectorAll('[data-lang-' + langage.actual.toLowerCase() + ']').forEach(elt => {
            eval('elt.innerHTML = elt.dataset.lang' + langage.actual);
        });
    }
}

// active actual langage button
document.querySelector('[data-lang="' + langage.actual + '"]')
    .classList.add('lang-box__flag--active');

langage.flags.forEach(flag => {
    flag.addEventListener('click', (e) => {
        var flagCliked = e.target;
        
        if (flagCliked.dataset.lang == langage.actual) {
            // si le bouton flag cliqué active la langue déjà active
            return;
        }

        // désactiver la surbrillance du flag de la précédante langue
        document.querySelector('[data-lang="' + langage.actual + '"]')
            .classList.remove('lang-box__flag--active');
        // activer la surbrillance du flag de l'actuelle langue
        flagCliked.classList.add('lang-box__flag--active');

        langage.actual = flagCliked.dataset.lang;

        langage.translateAll();

        if (fiche.memory !== undefined) {
            fiche.fill(fiche.memory.activeNodeMetas, fiche.memory.activeNodeConnectedList);

            switch (langage.actual) {
                case 'Fr':
                    network.data.nodes.update(
                        network.data.nodes.map(entite => ({
                                id: entite.id,
                                title: entite.title_fr,
                            })
                        )
                    );
                    network.data.edges.update(
                        network.data.edges.map(lien => ({
                                id: lien.id,
                                title: lien.title_fr,
                            })
                        )
                    );
                    break;
                case 'En':
                    network.data.nodes.update(
                        network.data.nodes.map(entite => ({
                                id: entite.id,
                                title: entite.title_en,
                            })
                        )
                    );
                    network.data.edges.update(
                        network.data.edges.map(lien => ({
                                id: lien.id,
                                title: lien.title_en,
                            })
                        )
                    );
                    break;
            }

            console.log(network.data.edges.get());
        }

    });
});