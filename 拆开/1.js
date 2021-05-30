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
      , a = require(6)
      , o = require(5)
      , h = require(3)
      , c = function(t) {
        function e(i, s, n) {
            var r = t.call(this, "Player", i, s, 64, 64, n) || this;
            return e.instance ? e.instance : (e.instance = r,
            r.box = new o.ObjectArea(r,16,32,32,32),
            r.reset(),
            r)
        }
        return n(e, t),
        e.prototype.reset = function() {
            this.updateInterval(),
            this.initialSpeed = 1.25,
            this.maxSpeed = 7.5,
            this.maxAirSpeed = 1.5 * this.maxSpeed,
            this.maxBoostSpeed = 1.75 * this.maxSpeed,
            this.xSpeed = 0,
            this.ySpeed = 0,
            this.state = "stop",
            this.airTimer = 0,
            this.crashTimer = 0,
            this.boostTimer = 0,
            this.dogTimer = 0,
            this.frameCounter = 0,
            this.trick = 0,
            this.maxTricks = 4,
            this.isMoving = !1,
            this.character = 3,
            this.surfboardSprite = h.surfboard64Sprite(),
            this.sprite = h.player64Sprite(),
            this.usingKonamiSprite = !1,
            this.dogSprite = h.dogsurf64Sprite(),
            this.collectedDog = !1,
            this.shieldSprite = h.swirl128Sprite(),
            this.surfboardPose = 0,
            this.dogFrame = 0,
            this.dogOffset = 0,
            this.totalCharacters = 7,
            this.surfRefreshCounter = 0,
            this.surfRefreshRate = r.Game.system.fps / 10,
            this.whichFrame = 0,
            this.whichPose = this.character
        }
        ,
        e.prototype.updateInterval = function() {
            this.accel = r.Game.system.interval / 4 * .06
        }
        ,
        e.prototype.update = function() {
            this.updateInterval(),
            this.updatePlayerState(),
            this.move(0, 0),
            this.surfRefreshCounter % this.surfRefreshRate == 0 && (this.surfRefreshCounter = 0,
            this.surfboardPose = (this.surfboardPose + 1) % 3,
            this.dogTimer > 0 && (this.dogTimer -= 1)),
            this.surfRefreshCounter++
        }
        ,
        e.prototype.updatePlayerState = function() {
            switch (r.Game.system.clearPath && this.finalStretch(),
            this.boostTimer > 0 && this.boosting(),
            this.airTimer > 0 && this.airborne(),
            this.crashTimer > 0 && this.crashed(),
            this.state) {
            case "left":
                this.isMoving = !0,
                this.maxSpeed = 6,
                this.xSpeed = .8 * -this.ySpeed;
                break;
            case "left-down":
                this.isMoving = !0,
                this.maxSpeed = 7,
                this.xSpeed = .4 * -this.ySpeed;
                break;
            case "down":
            case "air" + this.trick:
                this.isMoving = !0,
                this.maxSpeed = 7.5,
                this.xSpeed = 0;
                break;
            case "right-down":
                this.isMoving = !0,
                this.maxSpeed = 7,
                this.xSpeed = .4 * this.ySpeed;
                break;
            case "right":
                this.isMoving = !0,
                this.maxSpeed = 6,
                this.xSpeed = .8 * this.ySpeed;
                break;
            case "stop":
            case "crash":
            case "lose":
            case "win":
                this.maxSpeed = 7.5,
                this.isMoving = !1,
                this.xSpeed = 0,
                this.ySpeed = 0
            }
            this.isMoving && (this.ySpeed < this.initialSpeed && (this.ySpeed = this.initialSpeed),
            this.ySpeed < this.maxSpeed && (this.ySpeed += this.accel),
            0 === this.boostTimer && 0 === this.airTimer && this.ySpeed > this.maxSpeed && (this.ySpeed -= 2 * this.accel))
        }
        ,
        e.prototype.updatePlayerFrame = function() {
            switch (this.state) {
            case "stop":
                this.whichFrame = 0;
                break;
            case "left":
                this.whichFrame = 1;
                break;
            case "left-down":
                this.whichFrame = 2;
                break;
            case "down":
                this.whichFrame = 3;
                break;
            case "right-down":
                this.whichFrame = 4;
                break;
            case "right":
                this.whichFrame = 5;
                break;
            case "crash":
                this.whichFrame = 6;
                break;
            case "lose":
                this.whichFrame = 7;
                break;
            case "win":
                this.whichFrame = 8;
                break;
            case "air" + this.trick:
                this.whichFrame = 9 + this.trick
            }
            this.whichPose = this.character
        }
        ,
        e.prototype.konamiSprite = function() {
            this.sprite = h.konami64Sprite(),
            this.usingKonamiSprite = !0,
            this.character = 0,
            this.totalCharacters = 1
        }
        ,
        e.prototype.renderCharacterSelection = function(t) {
            for (var e = 0; e < this.totalCharacters; e++)
                this.surfboardSprite.draw(t, Math.floor(this.x) + 116 * (e - this.character), Math.floor(this.y), 5, this.surfboardPose),
                this.sprite.draw(t, Math.floor(this.x) + 116 * (e - this.character), Math.floor(this.y), 5, e)
        }
        ,
        e.prototype.objectToNewArray = function(t, e, i) {
            var s = e.splice(t, 1)[0];
            i.push(s)
        }
        ,
        e.prototype.boosting = function() {
            this.frameCounter++,
            this.frameCounter % r.Game.system.fps == 0 && (this.boostTimer -= 1),
            this.boostTimer <= 1 && this.ySpeed > this.maxSpeed ? this.ySpeed -= 12 * this.accel : this.ySpeed < this.maxBoostSpeed && (this.ySpeed += 8 * this.accel),
            0 === this.boostTimer && this.ySpeed > this.maxSpeed && (this.ySpeed = this.maxSpeed)
        }
        ,
        e.prototype.airborne = function() {
            if (this.frameCounter++,
            this.frameCounter % r.Game.system.fps == 0 && (this.airTimer -= 1),
            this.airTimer <= 1 && this.ySpeed > this.maxSpeed ? (this.ySpeed -= 4 * this.accel,
            this.airTimer <= 1 && this.ySpeed <= this.maxSpeed && (this.airTimer = 0)) : this.ySpeed < this.maxAirSpeed && (this.ySpeed += 24 * this.accel),
            this.state = "air" + this.trick,
            0 === this.airTimer)
                return this.ySpeed = this.maxSpeed,
                this.state = "down",
                void this.objectToNewArray(r.Game.system.objUpper.findIndex(function(t) {
                    return "Player" === t.ObjectName
                }), r.Game.system.objUpper, r.Game.system.objMain)
        }
        ,
        e.prototype.crashed = function() {
            if (this.frameCounter++,
            this.boostTimer = 0,
            this.airTimer = 0,
            this.state = "crash",
            this.frameCounter % r.Game.system.fps == 0 && (this.crashTimer -= 1),
            0 === this.crashTimer)
                return this.crashTimer = 0,
                this.ySpeed = this.initialSpeed,
                this.state = "stop",
                void this.objectToNewArray(r.Game.system.objLower.findIndex(function(t) {
                    return "Player" === t.ObjectName
                }), r.Game.system.objLower, r.Game.system.objMain)
        }
        ,
        e.prototype.boost = function() {
            r.Game.system.powerups > 0 && 0 === this.boostTimer && "air" !== this.state.substring(0, 3) && 0 === this.crashTimer && this.ySpeed > 0 && (this.frameCounter = 0,
            this.boostTimer = 5,
            r.Game.system.removePowerup())
        }
        ,
        e.prototype.jump = function() {
            this.state.substring(0, 3),
            this.frameCounter = 0,
            this.airTimer = 2,
            this.trick = 0,
            this.state = "air" + this.trick,
            this.boostTimer = 0,
            this.objectToNewArray(r.Game.system.objMain.findIndex(function(t) {
                return "Player" === t.ObjectName
            }), r.Game.system.objMain, r.Game.system.objUpper),
            r.Game.system.tricks += 1
        }
        ,
        e.prototype.fall = function() {
            this.crashDog(),
            r.Game.system.removeLife(),
            this.objectToNewArray(r.Game.system.objMain.findIndex(function(t) {
                return "Player" === t.ObjectName
            }), r.Game.system.objMain, r.Game.system.objLower),
            r.Game.system.lives > 0 ? (this.frameCounter = 0,
            this.crashTimer = 1) : r.Game.system.gameLose()
        }
        ,
        e.prototype.slow = function() {
            this.ySpeed = .66 * this.ySpeed
        }
        ,
        e.prototype.superSlow = function() {
            this.ySpeed = .5 * this.ySpeed
        }
        ,
        e.prototype.spin = function() {
            var t = ["left", "left-down", "right", "right-down"];
            "down" === this.state ? this.state = t[r.Game.system.linearMap(0, 3)] : "left-down" === this.state || "left" === this.state ? this.state = t[r.Game.system.linearMap(2, 3)] : "right-down" !== this.state && "right" !== this.state || (this.state = t[r.Game.system.linearMap(0, 1)])
        }
        ,
        e.prototype.finalStretch = function() {
            this.state = "down",
            this.ySpeed = this.maxSpeed
        }
        ,
        e.prototype.crashDog = function() {
            this.collectedDog && (r.Game.system.removeAllShields(),
            this.collectedDog = !1,
            a.Spawn.instance.spawnCrashedDog())
        }
        ,
        e.prototype.win = function() {
            this.state = "win",
            this.draw(r.Game.system.ctx)
        }
        ,
        e.prototype.lose = function() {
            this.state = "crash",
            this.draw(r.Game.system.ctx)
        }
        ,
        e.prototype.loseEnemy = function() {
            this.state = "lose",
            this.draw(r.Game.system.ctx),
            this.crashDog()
        }
        ,
        e.prototype.draw = function(e) {
            "waiting" !== r.Game.system.gameState ? (this.collectedDog && "win" !== this.state && this.shieldSprite.draw(e, Math.floor(this.x) - 32, Math.floor(this.y) - 24, 4 - r.Game.system.shields, this.surfboardPose),
            this.updatePlayerFrame(),
            this.surfboardSprite.draw(e, Math.floor(this.x), Math.floor(this.y), this.whichFrame, this.surfboardPose),
            t.prototype.draw.call(this, e),
            this.dogTimer > 0 ? (this.dogFrame = 13,
            this.dogOffset = 32) : (this.dogFrame = this.whichFrame,
            this.dogOffset = 0),
            this.collectedDog && this.dogSprite.draw(e, Math.floor(this.x), Math.floor(this.y) - this.dogOffset, this.dogFrame, 0)) : this.renderCharacterSelection(e)
        }
        ,
        e
    }(o.GameObject);
    exports.Player = c