"use strict";
    exports.__esModule = !0;
    var s = require(7)
      , n = require(11)
      , r = require(6)
      , a = require(26)
      , o = require(27)
      , h = require(1)
      , c = require(12)
      , p = require(13)
      , l = function() {
        function t(e, i) {
            if (t.system)
                return t.system;
            t.system = this,
            this.canvas = e,
            this.fps = i,
            this.interval = this.fps / 60,
            this.collisions = new n.Collisions,
            this.spawn = new r.Spawn,
            this.cleanup = new a.Cleanup,
            this.background = new o.Background,
            this.islandspawn = new c.IslandSpawn,
            this.interface = new s.Interface,
            this.initializeGame()
        }
        return t.prototype.initializeGame = function() {
            this.defineCanvas(this.canvas),
            this.resetStats(),
            this.resetGame(),
            this.interface.buildInterface(),
            this.spawn.spawnPlayer(this.width, this.height),
            this.interface.buildCharacterSelection(),
            this.background.setupGradient(this.winDistance)
        }
        ,
        t.prototype.defineCanvas = function(t) {
            this.ctx = t.getContext("2d"),
            this.ctx.imageSmoothingEnabled = !1,
            t.width = document.body.clientWidth,
            t.height = window.innerHeight,
            t.style.width = t.width + "px",
            t.style.height = t.height + "px",
            this.width = t.width,
            this.height = t.height
        }
        ,
        t.prototype.resetStats = function() {
            this.lives = 3,
            this.maxLives = 3,
            this.powerups = 0,
            this.powerupsCollected = 0,
            this.maxPowerups = 3,
            this.shields = 0,
            this.maxShields = 3,
            this.distance = 0,
            this.winDistance = 7900,
            this.clearPath = !1,
            this.dodges = 0,
            this.avoids = 0,
            this.tricks = 0,
            this.boosts = 0,
            this.escapes = 0,
            this.score = 0,
            this.infiniteLives = !1,
            this.infinitePowerups = !1,
            this.krakenCodeUsed = !1,
            this.updateFrames = 0,
            this.updateEnding = !1
        }
        ,
        t.prototype.resetGame = function() {
            this.gameState = "waiting",
            this.gameObjects = [],
            this.objUpper = [],
            this.objMain = [],
            this.objLower = [],
            this.objBack = [],
            this.interface.reset(),
            this.background.reset(),
            this.collisions.reset(),
            this.spawn.reset(),
            this.islandspawn.reset(),
            this.cleanup.reset()
        }
        ,
        t.prototype.reflowCanvas = function() {
            this.defineCanvas(this.canvas);
            var t = h.Player.instance
              , e = Math.round(this.width / 2) - (t.x + t.width / 2)
              , i = Math.round(this.height / 3) - (t.y + t.height / 2);
            this.gameObjects.forEach(function(t) {
                return t.move(e, i)
            }),
            this.background.updateWater(e, i, this.interval, t.xSpeed, t.ySpeed)
        }
        ,
        t.prototype.addLife = function() {
            this.lives < this.maxLives && (this.lives += 1,
            this.interface.updateIcons())
        }
        ,
        t.prototype.removeLife = function() {
            this.lives > 0 && !this.infiniteLives && (this.lives -= 1),
            this.interface.updateIcons()
        }
        ,
        t.prototype.removeAllLives = function() {
            this.infiniteLives = !1,
            this.lives = 0,
            this.interface.updateIcons()
        }
        ,
        t.prototype.addPowerup = function() {
            this.powerups < this.maxPowerups && (this.powerups += 1,
            this.powerupsCollected += 1,
            this.interface.updateIcons())
        }
        ,
        t.prototype.removePowerup = function() {
            this.powerups > 0 && !this.infinitePowerups && (this.powerups -= 1),
            this.interface.updateIcons()
        }
        ,
        t.prototype.removeAllPowerups = function() {
            this.infinitePowerups = !1,
            this.powerups = 0,
            this.interface.updateIcons()
        }
        ,
        t.prototype.addShields = function() {
            h.Player.instance.collectedDog = !0,
            this.shields = this.maxShields,
            this.interface.updateIcons()
        }
        ,
        t.prototype.removeShield = function() {
            this.shields > 0 && (this.shields -= 1),
            this.interface.updateIcons()
        }
        ,
        t.prototype.removeAllShields = function() {
            this.shields = 0,
            this.interface.updateIcons()
        }
        ,
        t.prototype.gameLoop = function(t) {
            "playing" === this.gameState || "ready" === this.gameState ? (this.interval = t / (1e3 / this.fps),
            this.updateAll(),
            this.checkWinDistance()) : "lose" === this.gameState && this.updateGameOver(),
            this.updateDrawOrder(),
            this.drawAll()
        }
        ,
        t.prototype.updateAll = function() {
            h.Player.instance.isMoving && (this.distance += h.Player.instance.ySpeed * t.system.interval / h.Player.instance.maxSpeed,
            this.updateFrames % (1 * this.fps) == 0 && this.background.updateGradient(this.distance, this.winDistance),
            this.background.updateWater(0, 0, this.interval, h.Player.instance.xSpeed, h.Player.instance.ySpeed),
            this.interface.update(),
            this.updateFrames++,
            this.distance < this.winDistance - 1.5 * this.height / h.Player.instance.maxSpeed ? this.spawn.update() : this.distance > this.winDistance - this.height / 1.5 / h.Player.instance.maxSpeed && !this.islandspawn.isSpawned && (this.clearPath = !0,
            this.islandspawn.isSpawned = !0,
            this.islandspawn.spawnIsland())),
            this.collisions.update(),
            this.gameObjects.forEach(function(t) {
                return t.update()
            }),
            this.cleanup.update(),
            this.updateDrawOrder()
        }
        ,
        t.prototype.updateDrawOrder = function() {
            this.objMain = this.objMain.sort(function(t, e) {
                return t.box.y + t.box.height - (e.box.y + e.box.height)
            }),
            this.gameObjects = this.objBack.concat(this.objLower).concat(this.objMain).concat(this.objUpper)
        }
        ,
        t.prototype.linearMap = function(t, e) {
            return Math.floor(t + (e + .99 - t) * Math.random())
        }
        ,
        t.prototype.drawAll = function() {
            var t = this;
            this.ctx.clearRect(0, 0, this.width, this.height),
            this.gameObjects.forEach(function(e) {
                return e.draw(t.ctx)
            })
        }
        ,
        t.prototype.checkWinDistance = function() {
            if (this.islandspawn.isSpawned) {
                if (this.islandspawn.island.y + 192 > h.Player.instance.y + h.Player.instance.height)
                    return;
                this.gameWin()
            }
        }
        ,
        t.prototype.updateGameOver = function() {
            this.updateEnding ? (this.gameObjects.filter(function(t) {
                return "Enemy" === t.ObjectName && t.gotPlayer
            }).forEach(function(t) {
                t.enemyGrab()
            }),
            this.background.gameLoseGradient()) : this.gameState = "over"
        }
        ,
        t.prototype.gameLose = function() {
            t.system.gameState = "over",
            h.Player.instance.lose(),
            p.recordGameEnd(this, h.Player.instance),
            this.interface.drawGameOver(),
            this.removeAllLives(),
            this.removeAllPowerups()
        }
        ,
        t.prototype.gameLoseEnemy = function() {
            this.interface.drawGameOver(),
            h.Player.instance.loseEnemy(),
            this.updateEnding = !0,
            this.gameState = "lose",
            p.recordGameEnd(this, h.Player.instance),
            this.removeAllLives(),
            this.removeAllPowerups()
        }
        ,
        t.prototype.gameWin = function() {
            this.islandspawn.moveIsland(),
            this.distance = this.winDistance,
            this.interface.drawGameWin(),
            h.Player.instance.win(),
            this.gameState = "over",
            p.recordGameEnd(this, h.Player.instance),
            setTimeout(function() {
                c.IslandSpawn.instance.openChest()
            }, 500),
            setTimeout(function() {
                s.Interface.system.showWinModal()
            }, 1500),
            this.islandspawn.handleEndClick()
        }
        ,
        t
    }();
    exports.Game = l