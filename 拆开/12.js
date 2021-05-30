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
      , o = require(7)
      , h = require(3)
      , c = function() {
        function t() {
            if (t.instance)
                return t.instance;
            t.instance = this,
            this.x = 1280,
            this.y = 512,
            this.reset()
        }
        return t.prototype.reset = function() {
            this.isSpawned = !1,
            this.chestObj = null,
            this.bottleObj = null,
            this.island = null,
            document.removeEventListener("click", this.showModal, !1),
            document.removeEventListener("mousemove", this.mouseHover, !1)
        }
        ,
        t.prototype.spawnIsland = function() {
            var t = r.Game.system.width / 2 - this.x / 2
              , e = r.Game.system.height;
            this.island = new p(t,e,this.x,this.y),
            r.Game.system.objLower.push(this.island),
            this.spawnChest(),
            this.spawnBottle()
        }
        ,
        t.prototype.moveIsland = function() {
            var t = r.Game.system.height / 3 - 156 - this.island.y;
            r.Game.system.gameObjects.filter(function(t) {
                return "Player" !== t.ObjectName
            }).forEach(function(e) {
                e.move(0, t)
            })
        }
        ,
        t.prototype.spawnChest = function() {
            var t = this.island.x + 700
              , e = this.island.y + 160
              , i = new l(t,e,128,128);
            r.Game.system.objMain.push(i),
            this.chestObj = i
        }
        ,
        t.prototype.spawnBottle = function() {
            var t = this.island.x + 440
              , e = this.island.y + 190
              , i = new u(t,e,64,64);
            r.Game.system.objMain.push(i),
            this.bottleObj = i
        }
        ,
        t.prototype.openChest = function() {
            this.chestObj.isOpening = !0
        }
        ,
        t.prototype.closeChest = function() {
            this.chestObj.whichFrame = 0,
            this.chestObj.isOpening = !1,
            this.chestObj.animCounter = 0
        }
        ,
        t.prototype.handleEndClick = function() {
            document.addEventListener("click", this.showModal, !1),
            document.addEventListener("mousemove", this.mouseHover, !1)
        }
        ,
        t.prototype.showModal = function(e) {
            if (e.preventDefault(),
            "modal" !== r.Game.system.gameState) {
                var i = parseInt(e.clientX)
                  , s = parseInt(e.clientY)
                  , n = t.instance
                  , a = [n.chestObj.x, n.chestObj.y, n.chestObj.width, n.chestObj.height]
                  , h = [n.bottleObj.x, n.bottleObj.y, n.bottleObj.width, n.bottleObj.height];
                i >= a[0] && i <= a[0] + a[2] && s >= a[1] && s <= a[1] + a[3] ? o.Interface.system.showWinModal() : i >= h[0] && i <= h[0] + h[2] && s >= h[1] && s <= h[1] + h[3] && o.Interface.system.showCreditModal()
            }
        }
        ,
        t.prototype.mouseHover = function(e) {
            if (e.preventDefault(),
            "modal" !== r.Game.system.gameState) {
                var i = parseInt(e.clientX)
                  , s = parseInt(e.clientY)
                  , n = t.instance
                  , a = [n.chestObj.x, n.chestObj.y, n.chestObj.width, n.chestObj.height]
                  , o = [n.bottleObj.x, n.bottleObj.y, n.bottleObj.width, n.bottleObj.height];
                document.body.style.cursor = i >= a[0] && i <= a[0] + a[2] && s >= a[1] && s <= a[1] + a[3] ? "pointer" : i >= o[0] && i <= o[0] + o[2] && s >= o[1] && s <= o[1] + o[3] ? "pointer" : "default"
            }
        }
        ,
        t
    }();
    exports.IslandSpawn = c;
    var p = function(t) {
        function e(e, i, s, n) {
            var r = t.call(this, "Island", e, i, s, n, h.island1280Sprite(), 0) || this;
            return r.box = new a.ObjectArea(r,0,128,s,n / 2),
            r.isInBack = !0,
            r.reset(),
            r
        }
        return n(e, t),
        e.prototype.reset = function() {}
        ,
        e.prototype.update = function() {
            t.prototype.update.call(this)
        }
        ,
        e.prototype.draw = function(e) {
            t.prototype.draw.call(this, e)
        }
        ,
        e
    }(a.GameObject);
    exports.Island = p;
    var l = function(t) {
        function e(e, i, s, n) {
            var r = t.call(this, "Chest", e, i, s, n, h.chestSprite()) || this;
            return r.whichFrame = 0,
            r.reset(),
            r
        }
        return n(e, t),
        e.prototype.reset = function() {
            this.whichSparkleFrame = 0,
            this.animCounter = 0,
            this.animRate = r.Game.system.fps / 10,
            this.isOpening = !1
        }
        ,
        e.prototype.update = function() {
            t.prototype.update.call(this)
        }
        ,
        e.prototype.draw = function(e) {
            this.refreshCounter++,
            this.refreshCounter % this.refreshRate == 0 && (this.refreshCounter = 0,
            this.whichSparkleFrame = (this.whichSparkleFrame + 1) % 3),
            this.animCounter % this.animRate == 0 && !0 === this.isOpening && (this.animCounter = 0,
            this.whichFrame += 1),
            this.animCounter += 1,
            this.whichFrame > 2 && (this.whichFrame = 2,
            this.isOpening = !1),
            t.prototype.draw.call(this, e),
            this.sprite.draw(e, Math.floor(this.x), Math.floor(this.y), this.whichSparkleFrame, 1)
        }
        ,
        e
    }(a.GameObject);
    exports.Chest = l;
    var u = function(t) {
        function e(e, i, s, n) {
            var r = t.call(this, "Bottle", e, i, s, n, h.bottleSprite(), 0) || this;
            return r.reset(),
            r
        }
        return n(e, t),
        e.prototype.reset = function() {
            this.whichSparkleFrame = 0
        }
        ,
        e.prototype.update = function() {
            t.prototype.update.call(this)
        }
        ,
        e.prototype.draw = function(e) {
            this.refreshCounter++,
            this.refreshCounter % this.refreshRate == 0 && (this.refreshCounter = 0,
            this.whichSparkleFrame = (this.whichSparkleFrame + 1) % 3),
            t.prototype.draw.call(this, e),
            h.chestSprite().draw(e, Math.floor(this.x - 32), Math.floor(this.y - 32), this.whichSparkleFrame, 1)
        }
        ,
        e
    }(a.GameObject);
    exports.Bottle = u