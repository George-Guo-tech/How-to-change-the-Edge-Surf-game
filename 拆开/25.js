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
    var r = require(5)
      , a = require(0)
      , o = require(3)
      , h = function(t) {
        function e(e, i, s) {
            var n = t.call(this, e, i, 64, 64, o.objects64Sprite(), s) || this;
            return n.box = new r.ObjectArea(n,8,36,48,20),
            n.hasRipple = !0,
            n
        }
        return n(e, t),
        e
    }(r.Obstacle);
    exports.Objects64 = h;
    var c = function(t) {
        function e(e, i, s) {
            var n = t.call(this, e, i, 32, 32, o.objects32Sprite(), s) || this;
            return n.box = new r.ObjectArea(n,2,20,28,12),
            n.hasRipple = !0,
            n.effect = "float",
            n
        }
        return n(e, t),
        e
    }(r.Obstacle);
    exports.Objects32 = c;
    var p = function(t) {
        function e(e, i, s) {
            var n = t.call(this, e, i, 64, 64, o.interactive64Sprite(), s) || this;
            return n.box = new r.ObjectArea(n,8,12,48,40),
            n.isAnimated = !0,
            n.hasRipple = !0,
            n.isInBack = !0,
            n.effect = "ramp",
            n
        }
        return n(e, t),
        e
    }(r.Obstacle);
    exports.Ramp64 = p;
    var l = function(t) {
        function e(e, i, s) {
            var n = t.call(this, e, i, 64, 64, o.interactive64Sprite(), s) || this;
            return n.box = new r.ObjectArea(n,-64,-64,192,192),
            n.isAnimated = !0,
            n.hasRipple = !0,
            n.effect = "tentacle",
            n
        }
        return n(e, t),
        e
    }(r.Obstacle);
    exports.Tentacle64 = l;
    var u = function(t) {
        function e(e, i, s) {
            var n = t.call(this, e, i, 64, 64, o.interactive64Sprite(), s) || this;
            return n.box = new r.ObjectArea(n,4,8,56,48),
            n.isAnimated = !0,
            n.isInBack = !0,
            n.effect = "slow",
            n
        }
        return n(e, t),
        e
    }(r.Obstacle);
    exports.Wake64 = u;
    var d = function(t) {
        function e(e, i, s) {
            var n = t.call(this, e, i, 192, 64, o.interactive192Sprite(), s) || this;
            return n.box = new r.ObjectArea(n,8,8,176,48),
            n.isAnimated = !0,
            n.isInBack = !0,
            n.effect = "slow",
            n
        }
        return n(e, t),
        e
    }(r.Obstacle);
    exports.Wake192 = d;
    var m = function(t) {
        function e(e, i, s) {
            var n = t.call(this, e, i, 64, 64, o.interactive64Sprite(), s) || this;
            return n.box = new r.ObjectArea(n,4,8,56,48),
            n.isAnimated = !0,
            n.isInBack = !0,
            n.effect = "superslow",
            n
        }
        return n(e, t),
        e
    }(r.Obstacle);
    exports.Seaweed64 = m;
    var f = function(t) {
        function e(e, i, s) {
            var n = t.call(this, e, i, 192, 64, o.interactive192Sprite(), s) || this;
            return n.box = new r.ObjectArea(n,8,8,176,48),
            n.isAnimated = !0,
            n.isInBack = !0,
            n.effect = "superslow",
            n
        }
        return n(e, t),
        e
    }(r.Obstacle);
    exports.Seaweed192 = f;
    var y = function(t) {
        function e(e, i, s) {
            var n = t.call(this, e, i, 64, 64, o.interactive64Sprite(), s) || this;
            return n.animCounter = 0,
            n.animRate = a.Game.system.fps / 10,
            n.isAnimated = !0,
            n.hasRipple = !0,
            n.isInBack = !0,
            n.effect = "powerup",
            n
        }
        return n(e, t),
        e
    }(r.Obstacle);
    exports.Powerup64 = y;
    var w = function(t) {
        function e(e, i, s) {
            var n = t.call(this, e, i, 128, 128, o.swirl128Sprite(), s) || this;
            return n.box = new r.ObjectArea(n,16,32,96,64),
            n.isAnimated = !0,
            n.isInBack = !0,
            n.effect = "spin",
            n
        }
        return n(e, t),
        e
    }(r.Obstacle);
    exports.Whirlpool128 = w;
    var b = function(t) {
        function e(e, i, s) {
            var n = t.call(this, e, i, 64, 64, o.ambient64Sprite(), 0) || this;
            return n.box = new r.ObjectArea(n,-128,-128,320,172),
            n.animCounter = 0,
            n.animRate = a.Game.system.fps / 10,
            n.whichFrame = 6 * s,
            n.whichPose = -1,
            n.ambientInstance = s,
            n.hasRipple = !0,
            n.isInBack = !0,
            n.effect = "ambient",
            n
        }
        return n(e, t),
        e
    }(r.Obstacle);
    exports.Ambient64 = b;
    var v = function(t) {
        function e(e, i, s) {
            var n = t.call(this, e, i, 256, 128, o.sandbar256Sprite(), s) || this;
            return n.box = new r.ObjectArea(n,20,72,216,24),
            n
        }
        return n(e, t),
        e
    }(r.Obstacle);
    exports.Sandbar256 = v;
    var S = function(t) {
        function e(e, i, s) {
            var n = t.call(this, e, i, 64, 64, o.objects64Sprite(), s) || this;
            return n.box = new r.ObjectArea(n,8,36,48,20),
            n.hasRipple = !0,
            n
        }
        return n(e, t),
        e
    }(r.Obstacle);
    exports.Characters64 = S;
    var g = function(t) {
        function e(e, i, s) {
            var n = t.call(this, e, i, 64, 64, o.interactive64Sprite(), s) || this;
            return n.box = new r.ObjectArea(n,-32,-32,128,128),
            n.isAnimated = !0,
            n.hasRipple = !0,
            n.effect = "dogsurf",
            n
        }
        return n(e, t),
        e
    }(r.Obstacle);
    exports.Dog64 = g;
    var P = function(t) {
        function e(e, i, s) {
            var n = t.call(this, e, i, 64, 64, o.interactive64Sprite(), s) || this;
            return n.isAnimated = !0,
            n.hasRipple = !0,
            n.effect = null,
            n
        }
        return n(e, t),
        e
    }(r.Obstacle);
    exports.DogCrash64 = P