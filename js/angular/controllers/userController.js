angular
  .module('CoffeeCoder')
  .controller('UserController', UserController);

UserController.$inject = ['User', 'TokenService', '$http', '$state'];
function UserController(User, TokenService, $http, $state) {
  var self = this;
  self.userId = TokenService.decodeToken() || undefined;
  self.user = self.user || {};
  self.all = [{}];

  (function getUsers() {
    $http
      .get('https://coffee-coder-api.herokuapp.com/users')
      .then(function(res) {
        self.all = res.data.users;
      });
  })();

  function handleLogin(res) {
    var token = res.token ? res.token : null;

    if (token) {
      self.userId = TokenService.decodeToken();
      self.getUser();
    };
    // console.log(res.message);
  };

  self.facebookAuth = function() {
    User.facebook(null, handleLogin);
  };

  self.login = function() {
    User.login(self.user, handleLogin);
    setTimeout(function() {
      $state.go('profile');
    }, 1000);
  };

  self.register = function() {
    User.register(self.user, handleLogin);
    setTimeout(function() {
      $state.go('lessons');
    }, 1000);
  };

  self.logout = function() {
    TokenService.removeToken();
    $state.go('code');
    self.user = {};
  };

  self.getUser = function() {
    $http
      .get('https://coffee-coder-api.herokuapp.com/users/' + self.userId)
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
      .put('https://coffee-coder-api.herokuapp.com/users/' + self.userId, self.user)
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
