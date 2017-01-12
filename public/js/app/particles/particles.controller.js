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
      stream();
      lossStream();
      }
    }
    vm.conversionRate = 0;
    vm.churnVal = 0;
    vm.userLoss = 0;
    vm.particles = [];
    vm.lossParticles = [];
    vm.monthlyActiveArr = [];

    // canvas variables
    vm.canvas = document.getElementById('canvas');
    vm.context = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 600;
    var spigotObj = new Image();
    spigotObj.src = '../../../images/spigot.png';
    spigotObj.onload = function(){
      vm.context.drawImage(spigotObj, 40, 110, 120, 120);
    }
    var lastTimestamp;
    vm.count = 0;
    vm.lossCount = 0;

    vm.startPosition = {
      x: vm.canvas.width / 2,
      y: vm.canvas.height * 1/3
    };

    vm.startLossPosition = {
      x: vm.canvas.width / 2,
      y: (vm.canvas.height * 1/3) + 330
    }

    function stream(){
      if (vm.count > 0){
        vm.createParticle();
        vm.count--;
        setTimeout(stream, 60);
      }
    }

    function lossStream(){
      if (vm.lossCount > 0){
        vm.createLossParticle();
        vm.lossCount--;
        setTimeout(lossStream, 60);
      }
    }

    function updateMonthlyArr(){
      function pushOne(){
        if (vm.monthlyActiveArr.length < vm.monthlyActiveUsers && vm.monthlyActiveArr.length < 600){
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
        for (var i = 0; i < vm.monthlyActiveArr.length; i++){
          vm.context.globalCompositeOperation = 'destination-out';
          vm.context.fillStyle = 'rgba(0, 0, 0, 1)';
          var halfI = 0.5 * i;
          vm.context.fillRect(vm.startPosition.x - 60, vm.startPosition.y + 335 - halfI, 120, halfI + 5);
        }
      } else {
        for (var i = 0; i < vm.monthlyActiveArr.length && i < 590; i++){
          vm.context.globalCompositeOperation = 'source-over';
          vm.context.fillStyle = 'blue';
          var halfI = 0.5 * i;
          vm.context.fillRect(vm.startPosition.x - 60, vm.startPosition.y + 340 - halfI, 120, halfI);
        }
      }
    } // this closes drawWater function

    function draw(){
      vm.context.globalCompositeOperation = 'source-over';
      vm.context.fillStyle = 'rgba(255, 255, 255, 0)';
      vm.context.fillRect(0, 0, vm.context.canvas.width, vm.context.canvas.height);

      vm.context.strokeRect(vm.startPosition.x - 60, vm.startPosition.y + 40, 120, 300)

      vm.allParticles = vm.particles.concat(vm.lossParticles);

    function drawParticles(){
      vm.allParticles.forEach(function(particle){
        if (particle.life > 0){
          vm.context.globalCompositeOperation = 'source-over';
          vm.context.fillStyle = particle.color;
          vm.context.beginPath();
          vm.context.arc(particle.position.x, particle.position.y + 16, Math.random() * 5, 0, Math.PI * 2);
          vm.context.closePath();
          vm.context.fill();
        } // closes if statement for particle life
      }) // closes particle loop
          drawWater(false);
    } // this closes drawParticles fct

    function eraseParticles(){
      vm.allParticles.forEach(function(particle){
        vm.context.globalCompositeOperation = 'destination-out';
        vm.context.fillStyle = 'rgba(0, 0, 0, 1)';
        vm.context.beginPath();
        vm.context.arc(particle.position.x, particle.position.y + 16, 10, 0, Math.PI * 2);
        vm.context.closePath();
        vm.context.fill();
      }) // closes forEach fct
      drawWater(true);
    } // closes eraseParticles

    drawParticles();
    setTimeout(eraseParticles, 100);

    } // closes draw function

    // recursive -- keep calling that requestAnimationFrame
    function play(timestamp){
      var dt = timestamp - (lastTimestamp || timestamp);
      lastTimestamp = timestamp;
      dt /= 1000;
      for (var i = 0; i < vm.particles.length; i++){
        vm.particles[i].update(dt);
      }
      for (var i = 0; i < vm.lossParticles.length; i++){
        vm.lossParticles[i].update(dt);
      }
      draw();
      window.requestAnimationFrame(play);
    } // close play function

    play(new Date().getTime());

  } // close controller function

})(); // closes IIFE
