angular
  .module('CoffeeCoder')
  .controller('LessonsController', LessonsController);

LessonsController.$inject = ['$http', '$state', 'TokenService'];
function LessonsController($http, $state, TokenService) {
  var self = this;

  self.all = [];
  self.createdLessons = [];
  self.subbedLessons = [];
  self.newLesson = {};
  self.userId = TokenService.decodeToken() || undefined;
  self.lessonToEdit = {};
  self.searchText = '';

  (function getLessons(){
    $http
      .get('https://coffee-coder-api.herokuapp.com/lessons')
      .then(function(res) {
        self.all = res.data.lessons;
      });
  }());

  (function getUser() {
    if (self.userId) {
      $http
        .get('https://coffee-coder-api.herokuapp.com/users/' + self.userId)
        .then(function(res) {
          self.user = res.data.user;
          $http
            .get('https://coffee-coder-api.herokuapp.com/lessons')
            .then(function(res) {
              self.all = res.data.lessons;
              for (var i in res.data.lessons) {
                for (var j in self.user.lessonsCreated) {
                  if (res.data.lessons[i]._id == self.user.lessonsCreated[j]) {
                    self.createdLessons.push(res.data.lessons[i]);
                  };
                };
                for (var n in self.user.lessonsSubbed) {
                  if (res.data.lessons[i]._id == self.user.lessonsSubbed[n]) {
                    self.subbedLessons.push(res.data.lessons[i]);
                  };
                };
              };
            });
        });
    } else {
      return false;
    }
  }());

  self.createLesson = function() {
    $http
      .post('https://coffee-coder-api.herokuapp.com/lessons', self.newLesson)
      .then(function(res) {
        self.all.push(self.newLesson);
        self.user.lessonsCreated.push(res.data.lesson._id);
        self.user.points += 10;
        console.log(self.user);
        $http
          .put('https://coffee-coder-api.herokuapp.com/users/' + self.userId, self.user)
          .then(function(res) {
            console.log(res);
          });
        $state.go('createdLessons');
      });
  };

  self.removeLesson = function(lesson) {
    event.preventDefault();
    $http
      .delete('https://coffee-coder-api.herokuapp.com/lessons/' + lesson._id)
      .then(function(res) {
        console.log(res.data.message);
        var index = self.all.indexOf(lesson);
        self.all.splice(index, 1);
        var index = self.createdLessons.indexOf(lesson);
        self.createdLessons.splice(index, 1);
        var index = self.user.lessonsCreated.indexOf(lesson._id);
        self.user.lessonsCreated.splice(index, 1);
        self.user.points -= 10;
        $http
          .put('https://coffee-coder-api.herokuapp.com/users/' + self.userId, self.user)
          .then(function(res) {
          });
      });
  };

  self.editLesson = function(lesson) {
    event.preventDefault();
    self.toggleEditForm();
    self.lessonToEdit = lesson;
  };

  self.updateLesson = function() {
    $http
      .put('https://coffee-coder-api.herokuapp.com/lessons/' + self.lessonToEdit._id, self.lessonToEdit)
      .then(function(response) {
        self.toggleEditForm();
      });
  };

  self.toggleEditForm = function() {
    $('form#edit-lesson').slideToggle('slow');
  };

  self.unsubscribe = function(lesson) {
    event.preventDefault();
    var index = self.subbedLessons.indexOf(lesson);
    self.subbedLessons.splice(index, 1);
    var index = self.user.lessonsSubbed.indexOf(lesson._id);
    self.user.lessonsSubbed.splice(index, 1);
    $http
      .put('https://coffee-coder-api.herokuapp.com/users/' + self.userId, self.user)
      .then(function(res) {
      });
  };

  self.isLoggedIn = function() {
    return !!TokenService.getToken();
  };

  self.selectLesson = function(lesson) {
    event.preventDefault();
    $state.go('code', {lesson: lesson, id: lesson._id});
  };

};
