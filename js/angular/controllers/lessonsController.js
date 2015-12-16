angular
  .module('CoffeeCoder')
  .controller('LessonsController', LessonsController);

LessonsController.$inject = ['$http', '$state'];
function LessonsController($http, $state) {
  var self = this;

  self.all = [];
  self.newLesson = {};
  self.selectLesson = selectLesson;
  self.gotoLesson = gotoLesson;

  (function getLessons() {
    $http
      .get('http://localhost:3000/lessons')
      .then(function(res) {
        self.all = res.data.lessons;
      });
  })();

  function selectLesson(lesson) {
    event.preventDefault();
    gotoLesson(lesson);
  };

  function gotoLesson(lesson) {
    $state.go('code', {lesson: lesson});
  };

};
