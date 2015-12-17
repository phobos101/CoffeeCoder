angular
  .module('CoffeeCoder')
  .controller('CodeController', CodeController);

CodeController.$inject = ['$stateParams', '$http', '$window', 'TokenService'];
function CodeController($stateParams, $http, $window, TokenService) {

  var self = this;
  self.lesson = $stateParams.lesson;
  self.user = getUser();

  if (!self.lesson.title) {
    self.lessonId = $stateParams.id;

    $http
      .get('https://coffee-coder-api.herokuapp.com/lessons/' + self.lessonId)
      .then(function(res) {
        self.lesson = res.data.lesson;
      });
  };

  function getUser() {
    $http
      .get('https://coffee-coder-api.herokuapp.com/users/' + TokenService.decodeToken())
      .then(function(res) {
        self.user = res.data.user;
      });
  };

  self.subscribe = function() {

  };

  self.checkResults = function() {
    // Wait a seond to allow the JS to be evaluated, then check result.
    setTimeout(function() {
      var expected = self.lesson.expectedResult;
      var input = $window.results[0];

      expected == input ? self.match() : self.noMatch();
      $window.results = [];
    }, 1000);
  };

  self.match = function() {
    var rewarded = false;
    console.log('match');
    $('#code-match').show('fast');
    for (var i in self.user.lessonsCompleted) {
      if (self.lesson._id == self.user.lessonsCompleted[i]) {
        console.log('already rewarded');
        rewarded = true;
      };
    };
    if (!rewarded) {
      console.log('rewarding...');
      self.user.lessonsCompleted.push(self.lesson._id);
      self.user.points += 5;
      $http
        .put('https://coffee-coder-api.herokuapp.com/users/' + self.user._id, self.user)
        .then(function(res) {
          console.log('Reward complete');
        });
    };
  };

  self.noMatch = function() {
    console.log('no match');
    $('#no-code-match').show('fast');
  };
};
