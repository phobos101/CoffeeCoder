angular
  .module('CoffeeCoder', ['ui.router', 'ngResource', 'angular-jwt'])
  .constant('API', 'http://localhost:3000/')
  .config(MainConfig);

function MainConfig($stateProvider, $urlRouterProvider, $httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
  $stateProvider
    .state('code', {
      url: '/',
      templateUrl: '_code.html'
    });
  $urlRouterProvider.otherwise('/');
};
