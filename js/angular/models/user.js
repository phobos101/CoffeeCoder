angular
  .module('CoffeeCoder')
  .factory('User', User);

User.$inject = ['$resource', 'API'];
function User($resource, API) {

  return $resource(
    API + 'users/:id',
    {id: '@id'},
    {
      'login': {
        url: API + 'login',
        method: 'POST'
      },
      'register': {
        url: API + 'register',
        method: 'POST'
      },
      'facebook': {
        url: API + 'auth/facebook',
        method: 'GET'
      }
    }
  );
};
