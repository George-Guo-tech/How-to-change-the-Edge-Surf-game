"use strict";
    var s, n = this && this.__extends || (s = function(t, e) {
        return (s = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(t, e) {
            t.__proto__ = e
        }
        || function(t, e) {
            for (var i in e)
                e.hasOwnProperty(i) && (t[i] = e[i])
        }
        )(t, e)
    }
    ,
    function(t, e) {
        function i() {
            this.constructor = t
        }
        s(t, e),
        t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype,
        new i)
    }
    );
    exports.__esModule = !0;
    var r = require(0)
      , a = require(5)
      , o = require(3)
      , h = function(t) {
        function e(e, i) {
            var s = t.call(this, "Surfer", e, i, 64, 64, o.surfer64Sprite()) || this;
            return s.box = new a.ObjectArea(s,16,32,32,32),
            s.surferAngle = null,
            s.angleCounter = 0,
            s.crashCounter = 0,
            s.currentSpeed = 2,
            s.maxSpeed = 5,
            s.accel = .015,
            s.crashTimer = 0,
            s.surferInstance = 0,
            s.surfboardInstance = 6,
            s.surferSprite = o.surfer64Sprite(),
            s.surferBottomPose = 1,
            s.surfboardFrame = 0,
            s.angleInterval = 20,
            s.updateInterval(),
            s
        }
        return n(e, t),
        e.prototype.updateInterval = function() {
            this.ySurfer = r.Game.system.interval * this.currentSpeed
        }
        ,
        e.prototype.update = function() {
            this.updateInterval(),
            t.prototype.update.call(this),
            this.crashTimer > 0 ? this.surferCrash() : (this.updatePosition(),
            this.updateDirection(),
            this.updateSprite())
        }
        ,
        e.prototype.updatePosition = function() {
            switch (r.Game.system.clearPath ? this.surferSlowdown() : this.currentSpeed < this.maxSpeed && (this.currentSpeed += this.accel),
            this.surferAngle) {
            case "left":
                this.move(.3 * -this.ySurfer, this.ySurfer);
                break;
            case "right":
                this.move(.3 * this.ySurfer, this.ySurfer)
            }
        }
        ,
        e.prototype.updateDirection = function() {
            if (this.angleCounter % this.angleInterval == 0) {
                this.angleCounter = 0,
                this.angleInterval = r.Game.system.linearMap(30, 60);
                var t = Math.random();
                this.surferAngle = t > .5 ? "left" : "right"
            }
            this.angleCounter++
        }
        ,
        e.prototype.updateSprite = function() {
            switch (this.surferAngle) {
            case "left":
                this.whichFrame = 3 * this.surferInstance + 0,
                this.surfboardFrame = 3 * this.surfboardInstance + 0;
                break;
            case "right":
                this.whichFrame = 3 * this.surferInstance + 1,
                this.surfboardFrame = 3 * this.surfboardInstance + 1
            }
        }
        ,
        e.prototype.surferCrash = function() {
            this.whichFrame = 3 * this.surferInstance + 2,
            this.surfboardFrame = 3 * this.surferInstance + 2,
            this.crashCounter++,
            this.crashCounter % r.Game.system.fps == 0 && (this.crashTimer -= 1),
            0 === this.crashTimer && (this.currentSpeed = 1,
            this.crashTimer = 0,
            this.crashCounter = 0,
            this.hasRipple = !1)
        }
        ,
        e.prototype.surferSlowdown = function() {
            this.currentSpeed > 0 && (this.currentSpeed -= 2 * this.accel)
        }
        ,
        e.prototype.draw = function(e) {
            this.surferSprite.draw(e, Math.floor(this.x), Math.floor(this.y), this.surfboardFrame, this.surferBottomPose),
            t.prototype.draw.call(this, e)
        }
        ,
        e
    }(a.GameObject);
    exports.Surfer = h