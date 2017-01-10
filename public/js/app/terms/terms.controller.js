// (function(){
//   'use strict';

//   angular.module('app')
//     .controller('TermsController', TermsController);

//   function TermsController(){
//     var vm = this;
//       vm.showPopover=false;
//       vm.popover = {
//           title: 'Title',
//           message: 'Message'
//       };
//   } // this closes the TermsController function

// })(); // this closes IIFE


(function(){
  'use strict';

  angular.module('app').controller('TermsController', TermsController);

  TermsController.$inject = ['$state', '$log'];

  function TermsController($state, $log) {
    // var vm = this;
    //   vm.showPopover=false;
    //   vm.popover = {
    //       title: 'Title',
    //       message: 'Message'
    //   };

    // vm.students = students;
    // vm.teachers = teachers;

  }


})();
