'use strict';

angular.module('llxApp.controllers', [])
  .controller('MenuController', function($scope, $http, cmsSettings) {
    $scope.menu = [];
    $http.jsonp(cmsSettings.hostName + '/api/1.0/main-menu.json', {
      params: {
        callback: 'JSON_CALLBACK'
      },
      cache: true
    })
      .success(function(data) {
        if (data.links.length) {
          for (var i = 0; i < data.links.length; i++) {
            var link = data.links[i].link;
            if (link.internal_path === '<front>') {
              link.path = '/home';
            }
            else {
              link.path = '/' + link.alias;
            }
            $scope.menu.push(data.links[i].link);
          }
        }
      });
  })

  .controller('PageController', function($scope, $http, $location, cmsSettings) {
    $http.jsonp(cmsSettings.hostName + '/api/1.0/pages.json', {
      params: {
        callback: 'JSON_CALLBACK',
        path: $location.path().substring(1)
      },
      cache: true
    })
      .success(function(data) {
        if (data.pages.length) {
          var page = data.pages[0].page;
          $scope.title = page.title;
          $scope.body = page.body;
        }
        else {
          $location.path('/home');
        }
      })
      .error(function(data) {
      });
  })

  .controller('BlogController', function($scope, $http, cmsSettings) {
    $scope.articles = [];
    $http.jsonp(cmsSettings.hostName + '/api/1.0/articles.json', {
      params: {
        callback: 'JSON_CALLBACK'
      }
    })
      .success(function (data) {
        if (data.articles.length) {
          for (var i = 0; i < data.articles.length; i++) {
            var article = data.articles[i].article;
            var date = new Date(article.created * 1000);
            article.created = date.getDay() + '/'  + date.getMonth() + '/'  + date.getFullYear();
            $scope.articles.push(article);
          }
        }
      });
  })

  .controller('BlogPostController', function($scope, $routeParams, $http, cmsSettings) {
    var path = 'blog/' + $routeParams.path;
    $http.jsonp(cmsSettings.hostName + '/api/1.0/articles.json', {
      params: {
        callback: 'JSON_CALLBACK',
        path: path
      }
    })
      .success(function(data){
        if (data.articles.length) {
          $scope.article = data.articles[0].article;
        }
      });
  })
;