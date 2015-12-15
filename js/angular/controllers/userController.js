angular
  .module('CoffeeCoder')
  .controller('UserController', UserController);

function UserController() {
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

  self.login = function() {
    user.login(self.user, handleLogin);
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

  if (self.isLoggedIn()) {
    self.getUsers();
    self.user = TokenService.decodeToken();
  };

  return self;
};
