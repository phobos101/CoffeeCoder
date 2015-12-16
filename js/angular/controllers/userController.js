angular
  .module('CoffeeCoder')
  .controller('UserController', UserController);

UserController.$inject = ['User', 'TokenService', '$http', '$state'];
function UserController(User, TokenService, $http, $state) {
  var self = this;
  self.userId = TokenService.decodeToken() || undefined;
  self.user = self.user || {};

  function handleLogin(res) {
    var token = res.token ? res.token : null;

    if (token) {
      self.userId = TokenService.decodeToken();
      self.getUser();
    };
    self.message = res.message;
  };

  self.facebookAuth = function() {
    User.facebook(null, handleLogin);
  };

  self.login = function() {
    User.login(self.user, handleLogin);
  };

  self.register = function() {
    User.register(self.user, handleLogin);
  };

  self.logout = function() {
    TokenService.removeToken();
    $state.go('landing');
    self.user = {};
  };

  self.getUser = function() {
    $http
      .get('http://localhost:3000/users/' + self.userId)
      .then(function(res) {
        self.user = res.data.user;
      });
  };

  self.isLoggedIn = function() {
    return !!TokenService.getToken();
  };

  self.toggleEditForm = function() {
    $('form#edit-user').slideToggle('slow');
  };

  self.updateUser = function() {
    $http
      .put('http://localhost:3000/users/' + self.userId, self.user)
      .then(function(response) {
        self.toggleEditForm();
      });
  };

  if (self.isLoggedIn()) {
    self.userId = TokenService.decodeToken();
    self.getUser();
  };

  return self;
};
