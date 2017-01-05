(function(){
  'use strict';

  angular.module('app').config(routes);

  routes.$inject = ['$urlRouterProvider', '$stateProvider'];

  function routes($urlRouterProvider, $stateProvider) {
    $stateProvider
      // .state('welcome', {
      //   url: '/welcome',
      //   templateUrl: 'js/app/welcome/welcome.html'
      // })
      .state('investors', {
        url: '/investors',
        templateUrl: 'js/app/investors/investors.html',
        controller: 'SearchController as vm'
      })
      .state('landing', {
        url: '/landing',
        templateUrl: 'js/app/landing/landing.html'
      })
      .state('terms', {
        url: '/terms',
        templateUrl: 'js/app/terms/terms.html',
        controller: 'TermsController as vm'
      })
      .state('sliders', {
        url: '/sliders',
        templateUrl: 'js/app/sliders/sliders.html',
        controller: 'SlidersController as vm'
      });
    $urlRouterProvider.otherwise('/sliders');
  }
})();
