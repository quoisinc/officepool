'use strict';

angular.module('officepoolApp').factory('authorization', function ($http, config) {
 console.log('in factory')

  return {
      login: function (credentials) {
          return $http.post(url + '/auth', credentials);
      }
  };
});
