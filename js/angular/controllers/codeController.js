angular
  .module('CoffeeCoder')
  .controller('CodeController', CodeController);

CodeController.$inject = ['$stateParams'];
function CodeController($stateParams) {

  var self = this;
  self.lesson = $stateParams.lesson;

};
