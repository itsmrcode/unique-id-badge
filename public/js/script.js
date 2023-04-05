// Set Trello app key variable
var TRELLO_APP_KEY = 'b1861ec05e3061c705a49737619af812';


/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

// var BLACK_ROCKET_ICON = 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421';
//
// TrelloPowerUp.initialize({
//     // Start adding handlers for your capabilities here!
//     // 'card-buttons': function(t, options) {
//     // return t.set("member", "shared", "hello", "world")
//     // .then(function(){
//     // 	  return [{
//     // icon: BLACK_ROCKET_ICON,
//     // 		  text: 'Estimate Size',
//     //       callback: function(t) {
//     //         return t.popup({
//     //           title: "Estimation",
//     //           url: 'estimate.html',
//     //         });
//     //       }
//     // 	  }];
//     // })
//     // },
// });

// Declare global variables for power-up settings
var badgePrefix;
var badgeColor;
var badgeSize;

// Render the power-up settings panel
function renderSettings(t, options) {
    return t.get('board', 'private', 'admin')
        .then(function (admin) {
            if (admin) {
                return t.get('board', 'shared', 'badgePrefix')
                    .then(function (savedPrefix) {
                        badgePrefix = savedPrefix || '#';
                        return t.get('board', 'shared', 'badgeColor');
                    })
                    .then(function (savedColor) {
                        badgeColor = savedColor || 'gray';
                        return t.get('board', 'shared', 'badgeSize');
                    })
                    .then(function (savedSize) {
                        badgeSize = savedSize || 'normal';
                        return t.popup({
                            title: 'Badge Settings',
                            url: './settings.html',
                            height: 184,
                        });
                    });
            }
        })
        .catch(function (error) {
            console.error('Error rendering settings:', error);
        });
}

// Set up the power-up
window.TrelloPowerUp.initialize({
    'card-badges': function (t, options) {
        return t.card('id')
            .then(function (card) {
                return [{
                    'text': badgePrefix + card.idShort,
                    'color': badgeColor,
                    'icon': {
                        'type': 'font',
                        'class': 'fa fa-tag fa-' + badgeSize,
                    },
                }];
            });
    },
    'board-buttons': function (t, options) {
        return [{
            'icon': {
                'dark': './images/icon-white.svg',
                'light': './images/icon-black.svg',
            },
            'text': 'Badge Settings',
            'callback': function (t) {
                return renderSettings(t, options);
            },
            'condition': 'always',
        }];
    },
});

// Set up event listener for save button in settings panel
window.TrelloPowerUp.initialize({
    'show-settings': function (t, options) {
        return renderSettings(t, options);
    },
    'save-settings': function (t, options) {
        badgePrefix = document.getElementById('badgePrefix').value;
        badgeColor = document.getElementById('badgeColor').value;
        badgeSize = document.getElementById('badgeSize').value;
        return t.set('board', 'shared', {
            'badgePrefix': badgePrefix,
            'badgeColor': badgeColor,
            'badgeSize': badgeSize,
        })
            .then(function () {
                return t.closePopup();
            });
    },
});

