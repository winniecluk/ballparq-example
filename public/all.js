"use strict";

!function () {
  "use strict";
  angular.module("app", ["ui.router"]);
}(), function () {
  "use strict";
  function t(t, e) {
    e.state("investors", { url: "/", templateUrl: "js/app/investors/investors.html", controller: "SearchController as vm" }).state("landing", { url: "/landing", templateUrl: "js/app/landing/landing.html" }).state("terms", { url: "/terms", templateUrl: "js/app/terms/terms.html", controller: "TermsController as vm" }).state("particles", { url: "/particles", templateUrl: "js/app/particles/particles.html", controller: "ParticlesController as vm" }).state("steps", { url: "/steps", templateUrl: "js/app/steps/steps.html", controller: "stepsController as vm" }), t.otherwise("/");
  }angular.module("app").config(t), t.$inject = ["$urlRouterProvider", "$stateProvider"];
}(), function () {
  "use strict";
  function t(t, e) {}angular.module("app").controller("SearchController", t), t.$inject = ["$state", "$log"];
}(), function () {
  "use strict";
  function t(t, e) {
    function o() {
      i.count > 0 && (i.createParticle(), i.count--, setTimeout(o, 60));
    }function n() {
      i.lossCount > 0 && (i.createLossParticle(), i.lossCount--, setTimeout(n, 60));
    }function r() {
      function t() {
        i.monthlyActiveArr.length < i.monthlyActiveUsers && i.monthlyActiveArr.length < 600 && (i.monthlyActiveArr.push(1), setTimeout(t, 60));
      }function e() {
        i.monthlyActiveArr.length > i.monthlyActiveUsers && (i.monthlyActiveArr.pop(), setTimeout(e, 60));
      }t(), e();
    }function l(t) {
      if (t) for (var e = 0; e < i.monthlyActiveArr.length; e++) {
        i.context.globalCompositeOperation = "destination-out", i.context.fillStyle = "rgba(0, 0, 0, 1)";var o = .5 * e;i.context.fillRect(i.startPosition.x - 60, i.startPosition.y + 335 - o, 120, o + 5);
      } else for (var e = 0; e < i.monthlyActiveArr.length && e < 590; e++) {
        i.context.globalCompositeOperation = "source-over", i.context.fillStyle = "blue";var o = .5 * e;i.context.fillRect(i.startPosition.x - 60, i.startPosition.y + 340 - o, 120, o);
      }
    }function s() {
      function t() {
        i.allParticles.forEach(function (t) {
          t.life > 0 && (i.context.globalCompositeOperation = "source-over", i.context.fillStyle = t.color, i.context.beginPath(), i.context.arc(t.position.x, t.position.y + 16, 5 * Math.random(), 0, 2 * Math.PI), i.context.closePath(), i.context.fill());
        }), l(!1);
      }function e() {
        i.allParticles.forEach(function (t) {
          i.context.globalCompositeOperation = "destination-out", i.context.fillStyle = "rgba(0, 0, 0, 1)", i.context.beginPath(), i.context.arc(t.position.x, t.position.y + 16, 10, 0, 2 * Math.PI), i.context.closePath(), i.context.fill();
        }), l(!0);
      }i.context.globalCompositeOperation = "source-over", i.context.fillStyle = "rgba(255, 255, 255, 0)", i.context.fillRect(0, 0, i.context.canvas.width, i.context.canvas.height), i.context.strokeRect(i.startPosition.x - 60, i.startPosition.y + 40, 120, 300), i.allParticles = i.particles.concat(i.lossParticles), t(), setTimeout(e, 100);
    }function a(t) {
      var e = t - (h || t);h = t, e /= 1e3;for (var o = 0; o < i.particles.length; o++) {
        i.particles[o].update(e);
      }for (var o = 0; o < i.lossParticles.length; o++) {
        i.lossParticles[o].update(e);
      }s(), window.requestAnimationFrame(a);
    }var i = this;i.particleSystem = window.particleSystem || {}, i.createParticle = t.createParticle, i.createLossParticle = t.createLossParticle, i.monthlySpendVal = 0, i.cpmVal = 0, i.totalWebVisits = 0, i.monthlyActiveUsers = 0, i.updateUsers = function () {
      i.count = i.monthlyActiveUsers = Math.round(i.monthlySpendVal * i.cpmVal * (.01 * i.conversionRate)) - Math.round(.01 * i.churnVal * (i.monthlySpendVal * i.cpmVal * (.01 * i.conversionRate))), i.lossCount = i.userLoss = Math.round(.01 * i.churnVal * (i.monthlySpendVal * i.cpmVal * (.01 * i.conversionRate))), i.particles = [], i.lossParticles = [], r(), i.monthlyActiveArr.length < i.monthlyActiveUsers ? o() : i.monthlyActiveArr.length > i.monthlyActiveUsers && (i.lossCount = i.monthlyActiveArr.length - i.monthlyActiveUsers, n());
    }, i.conversionRate = 0, i.churnVal = 0, i.userLoss = 0, i.updateUserLoss = function () {
      i.count = i.monthlyActiveUsers = Math.round(i.monthlySpendVal * i.cpmVal * (.01 * i.conversionRate)) - Math.round(.01 * i.churnVal * (i.monthlySpendVal * i.cpmVal * (.01 * i.conversionRate))), i.lossCount = i.userLoss = Math.round(.01 * i.churnVal * (i.monthlySpendVal * i.cpmVal * (.01 * i.conversionRate))), i.particles = [], i.lossParticles = [], r(), i.monthlyActiveArr.length < i.monthlyActiveUsers ? o() : i.monthlyActiveArr.length > i.monthlyActiveUsers && n();
    }, i.particles = [], i.lossParticles = [], i.monthlyActiveArr = [], i.canvas = document.getElementById("canvas"), i.context = canvas.getContext("2d"), canvas.width = 300, canvas.height = 600;var c = new Image();c.src = "../../../images/spigot.png", c.onload = function () {
      i.context.drawImage(c, 40, 110, 120, 120);
    };var h;i.count = 0, i.lossCount = 0, i.startPosition = { x: i.canvas.width / 2, y: 1 * i.canvas.height / 3 }, i.startLossPosition = { x: i.canvas.width / 2, y: 1 * i.canvas.height / 3 + 330 }, a(new Date().getTime());
  }angular.module("app").controller("ParticlesController", t), t.$inject = ["ParticlesService", "$scope"];
}(), function () {
  "use strict";
  function t() {
    function t() {
      return Math.random() > .5 ? 1 : -1;
    }function e() {
      this.particles.push(new particleSystem.Particle(this.startPosition, Math.random() + 2, 90 + 10 * Math.random() * t(), 150 * Math.random() + 20, "blue"));
    }function o() {
      Math.random() > .5;this.lossParticles.push(new particleSystem.Particle(this.startLossPosition, Math.random() + 1, 90 + 60 * Math.random() * t(), 100 * Math.random() + 20, "blue"));
    }window.particleSystem = window.particleSystem || {}, particleSystem.Particle = function (t, e, o, n, r) {
      this.position = { x: t.x, y: t.y }, this.life = e;var l = o * Math.PI / 180;this.velocity = { x: n * Math.cos(l), y: n * Math.sin(l) }, this.color = r;
    }, particleSystem.Particle.prototype.update = function (t) {
      this.life -= t, this.life > 0 && (this.position.x += this.velocity.x * t, this.position.y += this.velocity.y * t);
    };var n = { createParticle: e, createLossParticle: o };return n;
  }angular.module("app").factory("ParticlesService", t), t.$inject = [];
}(), function () {
  function t(t, e) {}angular.module("app").controller("stepsController", t), t.$inject = ["$state", "$http"];
}(), function () {
  "use strict";
  function t(t, e) {}angular.module("app").controller("TermsController", t), t.$inject = ["$state", "$log"];
}();