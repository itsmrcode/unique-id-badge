const t = TrelloPowerUp.iframe();

const cardIdBadge = (t, options) => {
    return t
        .get('board', 'shared', 'prefix', 'ID:')
        .then((prefix) => {
            return [
                {
                    dynamic: () => {
                        return {
                            title: 'Card ID',
                            text: `${prefix} ${options.card.shortLink}`,
                            color: 'green',
                            refresh: 10,
                        };
                    },
                },
            ];
        });
};

t.render(() => {
    t.sizeTo('#content').done();
});

t.settingsSizeTo('#content').done();

TrelloPowerUp.initialize({
    'card-badges': cardIdBadge,
    'show-settings': (t, options) => {
        return t.popup({
            title: 'Card ID Badge Settings',
            url: './settings.html',
            height: 184,
        });
    },
});
