(function(){
  'use strict';

  angular.module('app')
    .controller('SlidersController', SlidersController);

  SlidersController.$inject = ['$scope', '$interval', '$log'];

  function SlidersController($scope, $interval, $log){
    var vm = this;
    vm.marketingspend_slider;
    vm.cpm_slider;
    vm.websiteVisits;
    vm.changeSiteVisits = changeSiteVisits;
    vm.totalUsers = 0;
    vm.percentpaidusers_slider;
    vm.averagemonthlyprice_slider;
    vm.subscriptionRevenue;
    vm.changeSubscriptionRevenue = changeSubscriptionRevenue;

    vm.marketingspend_slider = {
      value: 5000,
      options: {
        floor: 0,
        ceil: 10000,
        step: 0.01,
        precision: 2,
        onChange: vm.changeSiteVisits
      }
    };

    vm.cpm_slider = {
      value: 50,
      options: {
        floor: 0,
        ceil: 100,
        step: 0.01,
        precision: 2,
        onChange: vm.changeSiteVisits
      }
    };

    function changeSiteVisits(){
      vm.websiteVisits = Math.round(vm.marketingspend_slider.value / vm.cpm_slider.value * 1000.00);
    }

    vm.percentpaidusers_slider = {
      value: 50,
      options: {
        floor: 0,
        ceil: 100,
        step: 0.01,
        precision: 2,
        onChange: vm.changeSubscriptionRevenue
      }
    };

    vm.averagemonthlyprice_slider = {
      value: 50,
      options: {
        floor: 0,
        ceil: 100,
        step: 0.01,
        precision: 2,
        onChange: vm.changeSubscriptionRevenue
      }
    };

    function changeSubscriptionRevenue() {
      vm.subscriptionRevenue = (vm.totalUsers * (vm.percentpaidusers_slider.value * 0.1) * vm.averagemonthlyprice_slider.value).toFixed(2);
    }


  } // this closes the controller function

})();
