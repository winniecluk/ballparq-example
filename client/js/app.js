(function(){
  'use strict';

angular.module('app', ['rzModule', 'ui.bootstrap', 'ui.router'])
  .directive('navigationBar', navigationBar)
  .directive('helpMenu', helpMenu)
  .config(Routes);

Routes.$inject = ['$stateProvider', '$urlRouterProvider'];

function Routes($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('terms', {
      url: '/',
      controller: 'TermsController as vm',
      templateUrl: 'templates/terms.html'
    })
    .state('sliders', {
      url: '/sliders',
      controller: 'SlidersController as vm',
      templateUrl: 'templates/sliders.html'
    })
  $urlRouterProvider.otherwise('/');
}


function navigationBar() {
  return {
    restrict: 'C',
    templateUrl: '/partials/nav.html'
  }
}

function helpMenu() {
  return {
    restrict: 'C',
    templateUrl: '/partials/help.html'
  }
}

})(); // closes IIFE
