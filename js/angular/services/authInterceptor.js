angular
  .module('CoffeeCoder')
  .factory('authInterceptor', AuthInterceptor);

AuthInterceptor.$inject = ['API', 'TokenService'];
function AuthInterceptor(API, TokenService) {
  return {
    request: function(config) {
      var token = TokenService.getToken();

      if (config.url.indexOf(API) === 0 && token) {
        config.headers.Authorization = 'Bearer ' + token;
      };
      return config;
    },

    response: function(res) {
      if (res.config.url.indexOf(API) === 0 && res.data.token) {
        TokenService.saveToken(res.data.token);
      };
      return res;
    }
  };
};
