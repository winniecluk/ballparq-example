(function(){
  'use strict';

  angular.module('app').config(routes);

  routes.$inject = ['$urlRouterProvider', '$stateProvider'];

  function routes($urlRouterProvider, $stateProvider) {
    $stateProvider
      .state('investors', {
        url: '/',
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
      .state('particles', {
        url: '/particles',
        templateUrl: 'js/app/particles/particles.html',
        controller: 'ParticlesController as vm'
      })
      .state('steps', {
        url: '/steps',
        templateUrl: 'js/app/steps/steps.html',
        controller: 'stepsController as vm'
      });
    $urlRouterProvider.otherwise('/');
  }
})();
