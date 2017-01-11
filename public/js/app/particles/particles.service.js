(function(){
  'use strict';

  angular.module('app')
    .factory('ParticlesService', ParticlesService);

  ParticlesService.$inject = [];

  function ParticlesService(){

    window.particleSystem = window.particleSystem || {};

    particleSystem.Particle = function(posObj, life, angle, speed, color){

      this.position = {
        x: posObj.x,
        y: posObj.y
      }

      this.life = life;

      var angleInRadians = angle * Math.PI / 180;

      this.velocity = {
        x: speed * Math.cos(angleInRadians),
        y: speed * Math.sin(angleInRadians)
      }

      this.color = color;

    } // this closes the particle constructor


    particleSystem.Particle.prototype.update = function(dt){

      this.life -= dt;

      if (this.life > 0){
        this.position.x += this.velocity.x * dt;
        this.position.y += this.velocity.y * dt;
      }

    } // this closes the update method

    function coinFlip(){
      return Math.random() > 0.5 ? 1 : -1;
    }

    function createParticle(){
      // positionObj, life, angle (20 controls the variance), speed, color, keep
      this.particles.push(new particleSystem.Particle(this.startPosition, Math.random() + 2, 90 + Math.random() * 10 * coinFlip(), Math.random() * 100 + 20, 'blue'));
    }

    function createLossParticle(){
      var keep = Math.random() > 0.5 ? true : false;
      this.lossParticles.push(new particleSystem.Particle(this.startLossPosition, Math.random() + 1, 90 + Math.random() * 60 * coinFlip(), Math.random() * 100 + 20, 'blue'));
    }


    var service = {
      createParticle: createParticle,
      createLossParticle: createLossParticle
    };

    return service;

  } // this closes the service function

})(); // this closes IIFE of ParticlesService
