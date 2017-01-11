(function(){
  'use strict';

  angular.module('app')
    .controller('ParticlesController', ParticlesController);

  ParticlesController.$inject = ['ParticlesService', '$scope'];

  function ParticlesController(ParticlesService, $scope){
    var vm = this;

    vm.particleSystem = window.particleSystem || {};

    vm.createParticle = ParticlesService.createParticle;
    vm.createLossParticle = ParticlesService.createLossParticle;

    // financial model variables
    vm.monthlySpendVal = 0;
    vm.cpmVal = 0;
    vm.totalWebVisits = 0;
    vm.monthlyActiveUsers = 0;
    vm.updateUsers = function(){
      vm.count = vm.monthlyActiveUsers = Math.round((vm.monthlySpendVal * vm.cpmVal) * (0.01 * vm.conversionRate)) - Math.round((0.01 * vm.churnVal) * ((vm.monthlySpendVal * vm.cpmVal) * (0.01 * vm.conversionRate)));
      vm.lossCount = vm.userLoss = Math.round((0.01 * vm.churnVal) * ((vm.monthlySpendVal * vm.cpmVal) * (0.01 * vm.conversionRate)));
      vm.particles = [];
      vm.lossParticles = [];
      updateMonthlyArr();
      if (vm.monthlyActiveArr.length < vm.monthlyActiveUsers){
        stream();
      } else if (vm.monthlyActiveArr.length > vm.monthlyActiveUsers){
        vm.lossCount = vm.monthlyActiveArr.length - vm.monthlyActiveUsers;
        lossStream();
      }
    }
    vm.conversionRate = 0;
    vm.churnVal = 0;
    vm.userLoss = 0;
    vm.updateUserLoss = function(){
      vm.count = vm.monthlyActiveUsers = Math.round((vm.monthlySpendVal * vm.cpmVal) * (0.01 * vm.conversionRate)) - Math.round((0.01 * vm.churnVal) * ((vm.monthlySpendVal * vm.cpmVal) * (0.01 * vm.conversionRate)));
      vm.lossCount = vm.userLoss = Math.round((0.01 * vm.churnVal) * ((vm.monthlySpendVal * vm.cpmVal) * (0.01 * vm.conversionRate)));
      vm.particles = [];
      vm.lossParticles = [];
      updateMonthlyArr();
      if (vm.monthlyActiveArr.length < vm.monthlyActiveUsers){
        stream();
      } else if (vm.monthlyActiveArr.length > vm.monthlyActiveUsers){
        lossStream();
      }
    }

    // execute on next screen repaint
    vm.requestAnimationFrame =
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      function(cb) {
        // 60 fps is the typical user's screen refresh rate
        window.setTimeout(cb, 3000);
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
    canvas.height = 600;
    var lastTimestamp;
    vm.count = 0;
    vm.lossCount = 0;

    // determined upon creating context of canvas
    vm.startPosition = {
      x: vm.canvas.width / 2,
      y: vm.canvas.height * 1/3
    };

    vm.startLossPosition = {
      x: vm.canvas.width / 2,
      y: (vm.canvas.height * 1/3) + 340
    }

    // let's create some particles to stream down
    function stream(){
      if (vm.count > 0){
        vm.createParticle();
        vm.count--;
        setTimeout(stream, 60);
      }
    } // close stream

    // create some particles for the second emitter
    function lossStream(){
      // console.log('lossStream before if is being called');
      if (vm.lossCount > 0){
        // console.log('lossStream after if is being called');
        vm.createLossParticle();
        vm.lossCount--;
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

    function drawWater(isErase){
      if (isErase){
        // erase water
        for (var i = 0; i < vm.monthlyActiveArr.length; i++){
          vm.context.globalCompositeOperation = 'destination-out';
          vm.context.fillStyle = 'rgba(0, 0, 0, 1)';
          vm.context.fillRect(vm.startPosition.x - 60, vm.startPosition.y + 335 - i, 120, i + 5);
        }
        // draw water
      } else {
        for (var i = 0; i < vm.monthlyActiveArr.length; i++){
          vm.context.globalCompositeOperation = 'source-over';
          vm.context.fillStyle = 'blue';
          vm.context.fillRect(vm.startPosition.x - 60, vm.startPosition.y + 340 - i, 120, i);
        }
      }
    } // this closes drawWater function

    function draw(){
      vm.context.globalCompositeOperation = 'source-over';
      vm.context.fillStyle = 'rgba(255, 255, 255, 0)';
      vm.context.fillRect(0, 0, vm.context.canvas.width, vm.context.canvas.height);

    // draw glass
      // vm.context.fillStyle = 'rgba'
      vm.context.strokeRect(vm.startPosition.x - 60, vm.startPosition.y + 40, 120, 300)


      vm.allParticles = vm.particles.concat(vm.lossParticles);

  // draw each one in the array
    function drawParticles(){
      vm.allParticles.forEach(function(particle){
        if (particle.life > 0){
          vm.context.globalCompositeOperation = 'source-over';
          vm.context.fillStyle = particle.color;
          vm.context.beginPath();
          // circle: x, y, radius, startAng, endAng, anticlockwise Bool
          vm.context.arc(particle.position.x, particle.position.y + 16, 5, 0, Math.PI * 2);
          vm.context.closePath();
          vm.context.fill();
          // eraseParticles();
        } // closes if statement for particle life
      }) // closes particle loop
          drawWater(false);
      // vm.context.clearRect(0, 0, vm.context.canvas.width, vm.context.canvas.height)
    } // this closes drawParticles fct

    function eraseParticles(){
      vm.allParticles.forEach(function(particle){
        // vm.context.fillStyle = 'rgba(255, 255, 255, 1)';
        vm.context.globalCompositeOperation = 'destination-out';
        vm.context.fillStyle = 'rgba(0, 0, 0, 1)';
        vm.context.beginPath();
        // circle: x, y, radius, startAng, endAng, anticlockwise Bool
        vm.context.arc(particle.position.x, particle.position.y + 16, 6, 0, Math.PI * 2);
        vm.context.closePath();
        vm.context.fill();
        // vm.context.fill();
      }) // closes forEach fct
      drawWater(true);
    } // closes eraseParticles

  // draw particles in the lossParticles array
    function drawLossParticles(){
      vm.lossParticles.forEach(function(lossParticle){
        if (lossParticle.life > 0){
          vm.context.globalCompositeOperation = 'source-over';
          vm.context.fillStyle = lossParticle.color;
          vm.context.beginPath();
          // circle: x, y, radius, startAng, endAng, anticlockwise Bool
          vm.context.arc(lossParticle.position.x, lossParticle.position.y + 340, 5, 0, Math.PI * 2);
          vm.context.closePath();
          vm.context.fill();
        }
      })
    }

    function eraseLossParticles(){
      vm.lossParticles.forEach(function(particle){
        // vm.context.fillStyle = 'rgba(255, 255, 255, 1)';
        vm.context.globalCompositeOperation = 'destination-out';
        vm.context.fillStyle = 'rgba(0, 0, 0, 1)';
        vm.context.beginPath();
        // circle: x, y, radius, startAng, endAng, anticlockwise Bool
        vm.context.arc(particle.position.x, particle.position.y + 16, 6, 0, Math.PI * 2);
        vm.context.closePath();
        vm.context.fill();
      }) // closes forEach fct
    } // closes eraseParticles




    drawParticles();
    // drawLossParticles();
    // setTimeout(eraseLossParticles, 100);
    setTimeout(eraseParticles, 100);

      // draw bigger and bigger blue rectangle inside glass
      // drawWater();

    // draw the emitter
      vm.context.fillStyle = 'gray';
      var size = 10;
      vm.context.fillRect(vm.startPosition.x - size / 2, vm.startPosition.y - size / 2 + size, size, size);

    // draw the second emitter near the bottom
      vm.context.fillStyle = 'rgba(255, 255, 255, 0)'
      vm.context.fillRect(vm.startPosition.x - size / 2, vm.startPosition.y + 170, size, size);

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
