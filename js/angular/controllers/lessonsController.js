angular
  .module('CoffeeCoder')
  .controller('LessonsController', LessonsController);

LessonsController.$inject = ['$http', '$state'];
function LessonsController($http, $state) {
  var self = this;

  self.all = [];
  self.newLesson = {};
  self.selectedLesson = {};
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
    self.selectedLesson = lesson._id;
    gotoLesson(lesson);
  };

  function gotoLesson(lesson) {
    console.log('selected lesson is ' + lesson._id);
    $state.go('code', {lesson: lesson});
  };

};
