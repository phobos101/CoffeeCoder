angular
  .module('CoffeeCoder')
  .controller('UserController', UserController);

UserController.$inject = ['User', 'TokenService', '$http'];
function UserController(User, TokenService, $http) {
  var self = this;
  self.user = {};

  function handleLogin(res) {
    var token = res.token ? res.token : null;

    if (token) {
      self.getUsers();
      self.user = TokenService.decodeToken();
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
    self.all = [];
    self.user = {};
  };

  self.getUsers = function() {
    self.all = User.query;
  };

  self.isLoggedIn = function() {
    return !!TokenService.getToken();
  };

  self.toggleEditForm = function() {
    console.log('clicked')
    $('form#edit-user').slideToggle('slow');
  };

  self.updateUser = function() {
    $http
      .put('http://localhost:3000/users/' + self.user._id, self.user)
      .then(function(response) {
        self.toggleEditForm();
      });
  };

  if (self.isLoggedIn()) {
    self.getUsers();
    self.user = TokenService.decodeToken();
  };

  return self;
};
