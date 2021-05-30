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
      , a = require(1)
      , o = require(3)
      , h = function() {
        function t(t, e, i, s, n, a, o) {
            this.ObjectName = t,
            this.box = new p(this,0,0,s,n),
            this.x = e,
            this.y = i,
            this.width = s,
            this.height = n,
            this.sprite = a,
            this.whichFrame = o,
            this.whichPose = 0,
            this.whichRipplePose = 0,
            this.isAnimated = !1,
            this.hasRipple = !1,
            this.refreshCounter = 0,
            this.refreshRate = r.Game.system.fps / 10,
            this.effect = null
        }
        return t.prototype.update = function() {
            this.move(-a.Player.instance.xSpeed * r.Game.system.interval, -a.Player.instance.ySpeed * r.Game.system.interval),
            this.refreshCounter++,
            this.refreshCounter % this.refreshRate == 0 && (this.refreshCounter = 0,
            this.isAnimated && (this.whichPose = (this.whichPose + 1) % 3),
            this.whichRipplePose = (this.whichRipplePose + 1) % 3)
        }
        ,
        t.prototype.reset = function() {}
        ,
        t.prototype.move = function(t, e) {
            this.x += t,
            this.y += e,
            this.box.translateXY(t, e)
        }
        ,
        t.prototype.draw = function(t) {
            this.hasRipple && o.ripple92Sprite().draw(t, Math.floor(this.x) - (92 - this.width) / 2, Math.floor(this.y) - (92 - this.height) / 1.5, 0, this.whichRipplePose),
            this.sprite.draw(t, Math.floor(this.x), Math.floor(this.y), this.whichFrame, this.whichPose)
        }
        ,
        t
    }();
    exports.GameObject = h;
    var c = function(t) {
        function e(e, i, s, n, a, o) {
            var h = t.call(this, "Obstacle", e, i, s, n, a, o) || this;
            return h.box = new p(h,0,0,s,n),
            h.whichFrame = o,
            h.isInBack = !1,
            h.hitByPlayer = !1,
            h.collectedByPlayer = !1,
            h.hitByEnemy = !1,
            h.hitBySurfer = !1,
            h.refreshCounter = 0,
            h.refreshRate = r.Game.system.fps / 10,
            h.effect = "hit",
            h
        }
        return n(e, t),
        e.prototype.update = function() {
            t.prototype.update.call(this)
        }
        ,
        e.prototype.draw = function(e) {
            t.prototype.draw.call(this, e)
        }
        ,
        e
    }(h);
    exports.Obstacle = c;
    var p = function() {
        function t(t, e, i, s, n) {
            this.x = t.x + e,
            this.y = t.y + i,
            this.width = s,
            this.height = n,
            this.padding = 10
        }
        return t.prototype.rectOverlaps = function(t) {
            return !(t.x + t.width < this.x + this.padding) && (!(this.x + this.width < t.x + this.padding) && (!(t.y + t.height < this.y + this.padding) && !(this.y + this.height < t.y + this.padding)))
        }
        ,
        t.prototype.translateXY = function(t, e) {
            this.x = this.x + t,
            this.y = this.y + e
        }
        ,
        t
    }();
    exports.ObjectArea = p