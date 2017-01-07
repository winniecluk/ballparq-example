(function(){
  'use strict';

  angular.module('app')
    .controller('ParticlesController');

  ParticlesController.$inject = [];

  function ParticlesController(){
    var vm = this;

    vm.title = 'hey there';

  }

})(); // closes IIFE
