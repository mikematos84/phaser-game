angular
    .module('app.game', [
        'ui.router'
    ])

    .config(function($stateProvider){
        $stateProvider
            .state('game', {
                parent: 'home',
                views: {
                    game: {
                        template: '<div id="phaser"></div>',
                        controller: 'GameController'
                    }
                }
            })
    })

    .run(function($rootScope, $location, $document, $state){
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
        })
    })
