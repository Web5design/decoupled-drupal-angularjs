'use strict';

angular.module('llxApp', ['llxApp.controllers', 'llxApp.services'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/blog', {templateUrl: '/partials/blog.html', controller: 'BlogController'});
    $routeProvider.when('/blog/:path', {templateUrl: '/partials/blog-post.html', controller: 'BlogPostController'});
    $routeProvider.otherwise({templateUrl: '/partials/page.html', controller: 'PageController'});
  }])
  .config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
  }]);