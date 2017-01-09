(function(){
  'use strict';

  angular.module('app')
    .controller('ParticlesController', ParticlesController);

  ParticlesController.$inject = ['ParticlesService', '$scope'];

  function ParticlesController(ParticlesService, $scope){
    var vm = this;

    vm.particleSystem = window.particleSystem || {};

    vm.title = 'hey there';
    vm.createParticle = ParticlesService.createParticle;
    vm.createLossParticle = ParticlesService.createLossParticle;

    // financial model variables
    vm.monthlySpendVal = 0;
    vm.cpmVal = 0;
    vm.totalWebVisits = 0;
    vm.monthlyActiveUsers;
    vm.updateUsers = function(){
      vm.monthlyActiveUsers = Math.round((vm.monthlySpendVal * vm.cpmVal) * (0.01 * vm.conversionRate));
      vm.userLoss = Math.round((0.01 * vm.churnVal) * vm.monthlyActiveUsers);
    }
    vm.conversionRate = 0;
    vm.churnVal = 0;
    vm.userLoss;
    // vm.updateUserLoss = function(){
    // }

    // execute on next screen repaint
    vm.requestAnimationFrame = window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      function(cb) {
        // 60 fps is the typical user's screen refresh rate
        window.setTimeout(cb, 1000/60);
      };

    // hold newly created particles
    vm.particles = [];
    vm.lossParticles = [];
    // length represents size of rectangle, which represents # of monthly active users
    vm.monthlyActiveArr = [];

    // canvas variables
    vm.canvas = document.getElementById('canvas');
    vm.context = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 300;
    var lastTimestamp;
    vm.count = 0;
    vm.lossCount = 0;

    // determined upon creating context of canvas
    vm.startPosition = {
      x: vm.canvas.width / 2,
      y: vm.canvas.height * 1/3
    };

    // let's create some particles to stream down
    function stream(){
      if (count > 0){
        vm.createParticle();
        count--;
        setTimeout(releaseOne, 60);
      }
    } // close stream

    // create some particles for the second emitter
    function lossStream(){
      if (lossCount > 0){
        vm.createLossParticle();
        lossCount--;
        setTimeout(lossStream, 60);
      }
    }

    // change size of rectangle depending on gradually changing length of arr
    function updateMonthlyArr(){
      // if >, push
      // if <, pop

      function pushOne(){
        if (vm.monthlyActiveArr.length < vm.monthlyActiveUsers){
            vm.monthlyActiveArr.push(1);
            setTimeout(pushOne, 60);
        } // close if
      } // close pushOne

      function popOne(){
        if (vm.monthlyActiveArr.length > vm.monthlyActiveUsers){
          vm.monthlyActiveArr.pop();
          setTimeout(popOne, 60);
        }
      }

      pushOne();
      popOne();
    } // close fct

    function drawWater(){
      for (var i = 0; i < vm.monthlyActiveArr.length; i++){
        vm.context.fillStyle = 'blue';
        vm.context.fillRect(vm.startPosition.x - 60, vm.startPosition.y + 180 - i, 120, i);
      }
    } // this closes drawWater function

    function draw(){
      vm.context.fillStyle = 'white';
      vm.context.fillRect(0, 0, vm.context.canvas.width, vm.context.canvas.height);

  // draw each one in the array
      vm.particles.forEach(function(particle){
        if (particle.life > 0){
          vm.context.fillStyle = particle.color;
          vm.context.beginPath();
          // circle: x, y, radius, startAng, endAng, anticlockwise Bool
          vm.context.arc(particle.position.x, particle.position.y + 16, 5, 0, Math.PI * 2);
          vm.context.closePath();
          vm.context.fill();
        } // closes if statement for particle life
      }) // closes particle loop

  // draw particles in the lossParticles array
      vm.lossParticles.forEach(function(lossParticle){
        if (lossParticle.life > 0){
          vm.context.fillStyle = lossParticle.color;
          vm.context.beginPath();
          // circle: x, y, radius, startAng, endAng, anticlockwise Bool
          vm.context.arc(lossParticle.position.x, lossParticle.position.y + 180, 5, 0, Math.PI * 2);
          vm.context.closePath();
          vm.context.fill();
        }
      })

      // draw bigger and bigger blue rectangle inside glass
      drawWater();

    // draw the emitter
      vm.context.fillStyle = 'gray';
      var size = 10;
      vm.context.fillRect(vm.startPosition.x - size / 2, vm.startPosition.y - size / 2 + size, size, size);

    // draw the second emitter near the bottom
      vm.context.fillStyle = 'rgba(255, 255, 255, 0)'
      vm.context.fillRect(vm.startPosition.x - size / 2, vm.startPosition.y + 170, size, size);

    // draw glass
      vm.context.strokeRect(vm.startPosition.x - 60, vm.startPosition.y + 40, 120, 140)

    } // closes draw function

    // recursive -- keep calling that requestAnimationFrame
    function play(timestamp){
      var dt = timestamp - (lastTimestamp || timestamp);
      lastTimestamp = timestamp;

      dt /= 1000;

      for (var i = 0; i < vm.particles.length; i++){
        vm.particles[i].update(dt);
      }

      // update loss particles
      for (var i = 0; i < vm.lossParticles.length; i++){
        vm.lossParticles[i].update(dt);
      }

      // now we need to draw these particles that have updated in position
      draw();

      // let's do it all over again!
      window.requestAnimationFrame(play);

    } // close play function




    play(new Date().getTime());

  } // close controller function

})(); // closes IIFE
