(function(){

  angular.module('app')
    .controller('stepsController', stepsController)

  stepsController.$inject = ['$state', '$http']

  function stepsController($state, $http){
    var vm = this;

    var bpButtons = [1,2,3,4]

  }

})(); // closes IIFE
