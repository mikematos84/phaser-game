angular
    .module('app', [
        'ui.router',
        'ngMaterial',
        'app.game'
    ])

/** 
 * Route the user to the appropriate template and controller
 */
    .config(
        ['$stateProvider', '$urlRouterProvider', '$locationProvider'
        ,function($stateProvider, $urlRouterProvider, $locationProvider){

        //$urlRouterProvider.otherwise('/home');

        $locationProvider.html5Mode(true);

        var header = {
            templateUrl: 'app/partials/header.html',
            controller: HeaderController,
            controllerAs: 'header'
        }

        var footer = {
            templateUrl: 'app/partials/footer.html',
            controller: FooterController,
            contollerAs: 'footer'
        }
        
        $stateProvider
            .state('home', {
                url: '/home',
                views: {
                    header: header,
                    footer: footer,
                    main: {
                        templateUrl: 'app/components/home/index.html',
                        controller: 'HomeController',
                        controllerAs: 'home'
                    }
                },
                authorization: false
            })
            .state('about', {
                url: '/about',
                views: {
                    header: header,
                    footer: footer,
                    main: {
                        templateUrl: 'app/components/about/index.html',
                        controller: 'AboutController',
                        controllerAs: 'about'
                    }
                },
                authorization: false
            })
            .state('contact', {
                url: '/contact',
                views: {
                    header: header,
                    footer: footer,
                    main: {
                        templateUrl: 'app/components/contact/index.html',
                        controller: 'ContactController',
                        controllerAs: 'contact'
                    }
                },
                authorization: false
            })
            .state('404', {
                url: '/404',
                views: {
                    header: header,
                    footer: footer,
                    main: {
                        templateUrl: 'app/components/error/404/index.html',
                        controller: 'Error404Controller',
                        controllerAs: 'error'
                    }
                },
                authorization: false
            })
    }])


/**
 * Run App
 */
    .run(function($rootScope, $location, $document, $state){

        $rootScope.links = [
            {name: 'Home', sref: 'home'},
            {name: 'Game', sref: 'game'},
            {name: 'About', sref: 'about'},
            {name: 'Contact', sref: 'contact'}
        ];

        $rootScope.$on('$locationChangeStart', function(event, next, current) { 
            var state = $location.path().substr(1);
            var stateObject = $state.get(state);

            /**
             * State Monitoring and Authorization Block
             * 
             * Monitors current requested state and validates if it exists
             * if not, the user is forward to an error (404) page else the
             * user is allowed to access the page if no futher authorization
             * is requred
             */
            
            if(state == ''){
                $state.go('home');
            }else if(stateObject == null){
                $state.go('404');
            }else{
                if(stateObject.authorization == true){
                    event.preventDefault();
                    $state.go('home');
                    return;
                }else{
                    $state.go(state);
                }
            }
        });

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            $rootScope.page =  toState.name.replace('.', '');

            $rootScope.siteTitle = 'Phaser-Game-App';
            $rootScope.tagLine = 'Test';
            $document[0].title = $rootScope.siteTitle + ' : ' + $rootScope.page;
        });

    })


/**
 * Main Controller
 */
    .controller('HeaderController', HeaderController)
    .controller('MainController', MainController)
    .controller('FooterController', FooterController);
    
    
    function HeaderController($scope){
        console.log('Header loaded');
    }

    function MainController($scope){
        console.log('Main loaded');
    }

    function FooterController($scope){
         console.log('Footer loaded');
    }
    