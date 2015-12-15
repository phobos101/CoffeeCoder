angular
  .module('CoffeeCoder')
  .service('TokenService', TokenService);

TokenService.$inject = ['$window', 'jwtHelper'];
function TokenService($window, jwtHelper) {

  var self = this;

  self.saveToken = function(token) {
    return $window.localStorage.setItem('user-token', token);
  };

  self.getToken = function() {
    return $window.localStorage.getItem('user-token');
  };

  self.removeToken = function() {
    return $window.localStorage.removeItem('user-token');
  };

  self.decodeToken = function() {
    var token = self.getToken();
    return token ? jwtHelper.decodeToken(token) : {};
  };
};
