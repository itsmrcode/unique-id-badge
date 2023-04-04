var t = window.TrelloPowerUp.iframe();
var admin = false;

t.render(function(){
  return t.get('member', 'private', 'admin')
  .then(function(isAdmin){
    admin = isAdmin;
  })
  .then(function(){
    return t.sizeTo('#settings').done();
  });
});

window.TrelloPowerUp.initialize({
  'card-badges': function(t, options){
    return [{
      'text': t.card('id'),
      'color': t.card('shared', 'color') || 'gray'
    }];
  },
  'card-detail-badges': function(t, options){
    if(admin){
      return [{
        'title': 'Unique ID Label Pro',
        'text': t.card('id'),
        'callback': function(t){
          return t.popup({
            title: 'Label Settings',
            url: 'settings.html',
            height: 184
          });
        }
      }];
    } else {
      return [];
    }
  }
});
