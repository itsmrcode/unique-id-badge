const t = TrelloPowerUp.iframe();

t.render(() => {
    t.get('board', 'shared', 'prefix', 'ID:').then((prefix) => {
        document.getElementById('prefix').value = prefix;
    });

    t.sizeTo('#content').done();
});

document.getElementById('save').addEventListener('click', () => {
    const prefix = document.getElementById('prefix').value;
    t.set('board', 'shared', 'prefix', prefix).then(() => {
        t.closePopup();
    });
});
