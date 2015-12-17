angular
  .module('CoffeeCoder')
  .controller('CodeController', CodeController);

CodeController.$inject = ['$stateParams', '$http', '$window'];
function CodeController($stateParams, $http, $window) {

  var self = this;
  self.lesson = $stateParams.lesson;

  if (!self.lesson.title) {
    self.lessonId = $stateParams.id;

    $http
      .get('https://coffee-coder-api.herokuapp.com/lessons/' + self.lessonId)
      .then(function(res) {
        self.lesson = res.data.lesson;
      });
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
    console.log('match');
    $('#code-match').show('fast');
  };

  self.noMatch = function() {
    console.log('no match');
    $('#no-code-match').show('fast');
  };
};
