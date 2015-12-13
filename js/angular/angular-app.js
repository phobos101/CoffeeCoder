angular
  .module('CoffeeCoder', ['ui.router'])
  .config(MainConfig);

function MainConfig($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('code', {
      url: '/',
      templateUrl: '_code.html'
    });
  $urlRouterProvider.otherwise('/');  
};
