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
      , o = require(1)
      , h = require(3)
      , c = function(t) {
        function e(e, i) {
            var s = t.call(this, "Enemy", e, i, 128, 128, h.enemy128Sprite(), 0) || this;
            return s.box = new a.ObjectArea(s,32,80,64,40),
            s.angleInterval = 20,
            s.angleCounter = 0,
            s.angleToPlayer = null,
            s.chaseCounter = 0,
            s.crashCounter = 0,
            s.grabCounter = 0,
            s.currentSpeed = 0,
            s.maxSpeed = 1.5,
            s.gotPlayer = !1,
            s.crashTimer = 0,
            s.updateInterval(),
            s
        }
        return n(e, t),
        e.prototype.updateInterval = function() {
            this.accel = .08 * r.Game.system.interval
        }
        ,
        e.prototype.update = function() {
            this.updateInterval(),
            t.prototype.update.call(this),
            this.gotPlayer ? this.enemyGrab() : this.crashTimer > 0 ? this.enemyCrash() : (this.updatePosition(),
            this.updateDirection(),
            this.updateSprite())
        }
        ,
        e.prototype.updatePosition = function() {
            var t = r.Game.system.interval
              , e = o.Player.instance
              , i = this.y + this.height >= e.y + e.height;
            r.Game.system.clearPath ? this.enemySlowdown(t) : this.currentSpeed > this.maxSpeed || i ? this.currentSpeed -= this.accel : this.currentSpeed < this.maxSpeed && !i && (this.currentSpeed += this.accel);
            var s = Math.abs(e.xSpeed) * t;
            i && (s += this.currentSpeed * t);
            var n = Math.min((e.ySpeed / 1.1 + this.currentSpeed) * t, (e.maxSpeed + 1.5) * t);
            switch (this.angleToPlayer) {
            case "left":
                "right-down" === e.state || "right" === e.state ? this.move(-s / 4, n) : this.move(-s - this.currentSpeed * t, n);
                break;
            case "right":
                "left-down" === e.state || "left" === e.state ? this.move(s / 4, n) : this.move(s + this.currentSpeed * t, n)
            }
        }
        ,
        e.prototype.updateDirection = function() {
            if (this.angleCounter % this.angleInterval == 0) {
                this.angleCounter = 0,
                this.angleInterval = Math.round(r.Game.system.linearMap(10, 20) / r.Game.system.interval);
                var t = this.x + this.width / 2 >= o.Player.instance.x + o.Player.instance.width / 2;
                this.angleToPlayer = t ? "left" : "right"
            }
            this.angleCounter++
        }
        ,
        e.prototype.updateSprite = function() {
            this.chaseCounter++,
            this.chaseCounter % (r.Game.system.fps / 10) == 0 && (this.chaseCounter = 0,
            this.whichFrame = (this.whichFrame + 1) % 3)
        }
        ,
        e.prototype.enemyGrab = function() {
            this.whichFrame < 4 && (this.whichFrame = 4),
            this.grabCounter += 1,
            this.grabCounter % (r.Game.system.fps / 10) == 0 && (this.grabCounter = 0,
            this.whichFrame += 1),
            this.whichFrame > 9 && (this.whichFrame = 9,
            r.Game.system.updateEnding = !1,
            this.gotPlayer = !1)
        }
        ,
        e.prototype.enemyCrash = function() {
            this.whichFrame = 3,
            this.crashCounter++,
            this.crashCounter % r.Game.system.fps == 0 && (this.crashTimer -= 1),
            0 === this.crashTimer && (this.currentSpeed = 0,
            this.crashCounter = 0)
        }
        ,
        e.prototype.enemySlowdown = function(t) {
            this.currentSpeed > 0 && (this.currentSpeed -= this.accel * t)
        }
        ,
        e
    }(a.GameObject);
    exports.Enemy = c