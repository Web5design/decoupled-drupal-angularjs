'use strict';

angular.module('llxApp.services', [])
  .factory('cmsSettings', function($window) {
    return {
      hostName: 'http://cms.myblog.com'
    };
  });
