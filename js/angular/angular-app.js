angular
  .module('CoffeeCoder', ['ui.router', 'ngResource', 'angular-jwt'])
  .constant('API', 'http://localhost:3000/')
  .config(MainConfig);

function MainConfig($stateProvider, $urlRouterProvider, $httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
  $stateProvider
    .state('landing', {
      url: '/',
      templateUrl: 'views/partials/_landing.html'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'views/partials/_profile.html'
    })
    .state('create', {
      url: '/create',
      templateUrl: 'views/partials/_createLesson.html'
    })
    .state('lessons', {
      url: '/lessons',
      templateUrl: 'views/partials/_lessons.html'
    })
    .state('code', {
      url: '/code',
      templateUrl: 'views/partials/_code.html',
      params: {
        lesson: {}
      }
    });
  $urlRouterProvider.otherwise('/');
};
