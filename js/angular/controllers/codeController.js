angular
  .module('CoffeeCoder')
  .controller('CodeController', CodeController);

CodeController.$inject = ['$stateParams', '$http'];
function CodeController($stateParams, $http) {

  var self = this;
  self.lesson = $stateParams.lesson;

  if (!self.lesson.title) {
    self.lessonId = $stateParams.id;

    $http
      .get('https://coffee-coder-api.herokuapp.com/lessons/' + self.lessonId)
      .then(function(res) {
        self.lesson.title = res.data.lesson.title;
        self.lesson.summary = res.data.lesson.summary;
        self.lesson.content = res.data.lesson.content;
        self.lesson.difficulty = res.data.lesson.difficulty;
        self.lesson.expectedResult = res.data.lesson.expectedResult;
      });
  };

};
