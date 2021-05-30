"use strict";
    exports.__esModule = !0;
    var s = require(0)
      , n = require(7)
      , r = require(1)
      , a = require(6)
      , o = require(13);
    exports.GameInput = function() {
        window.addEventListener("keyup", function(t) {
            c.onKeyup(t)
        }, !1),
        window.addEventListener("keydown", function(t) {
            c.onKeydown(t)
        }, !1);
        var t = 0
          , e = null
          , i = !1
          , h = null
          , c = {
            _pressed: {},
            UP: 38,
            DOWN: 40,
            LEFT: 37,
            RIGHT: 39,
            ENTER: 13,
            SPACE: 32,
            W: 87,
            A: 65,
            S: 83,
            D: 68,
            F: 70,
            ESC: 27,
            codes: [[38, 38, 40, 40, 37, 39, 37, 39, 66, 65], [77, 73, 67, 82, 79, 83, 79, 70, 84], [69, 68, 71, 69], [75, 82, 65, 75, 69, 78]],
            codePosition: 0,
            isDown: function(t) {
                return this._pressed[t]
            },
            onKeydownPlaying: function(e) {
                if (c.isDown(c.DOWN) || c.isDown(c.S)) {
                    var i = new Date;
                    i - t <= 400 && (r.Player.instance.boost(),
                    i = 0),
                    t = i,
                    "air" === r.Player.instance.state.substring(0, 3) ? (r.Player.instance.trick = (r.Player.instance.trick + 1) % r.Player.instance.maxTricks,
                    s.Game.system.tricks += 1) : r.Player.instance.state = "down"
                } else
                    t = 0;
                c.isDown(c.LEFT) || c.isDown(c.A) ? "left-down" === r.Player.instance.state || "left" === r.Player.instance.state ? r.Player.instance.state = "left" : r.Player.instance.state = "left-down" : c.isDown(c.RIGHT) || c.isDown(c.D) ? "right-down" === r.Player.instance.state || "right" === r.Player.instance.state ? r.Player.instance.state = "right" : r.Player.instance.state = "right-down" : c.isDown(c.UP) || c.isDown(c.W) ? r.Player.instance.state = "stop" : c.isDown(c.F) && r.Player.instance.boost()
            },
            onKeydownWinLose: function(t) {
                (c.isDown(c.ENTER) || c.isDown(c.SPACE)) && (n.Interface.system.clearScreen(),
                s.Game.system.initializeGame())
            },
            onKeydownWaiting: function(t) {
                c.isDown(c.ENTER) || c.isDown(c.SPACE) ? (n.Interface.system.buildStartScreen(),
                a.Spawn.instance.spawnPowerupRow(),
                s.Game.system.gameState = "ready") : c.isDown(c.LEFT) || c.isDown(c.A) ? r.Player.instance.character > 0 && (r.Player.instance.character -= 1) : (c.isDown(c.RIGHT) || c.isDown(c.D)) && r.Player.instance.character < r.Player.instance.totalCharacters - 1 && (r.Player.instance.character += 1);
                var e = t.keyCode;
                if (i && e === this.codes[h][this.codePosition + 1]) {
                    if (this.codePosition++,
                    e === this.codes[h][this.codes[h].length - 1]) {
                        switch (h) {
                        case 0:
                            r.Player.instance.konamiSprite();
                            break;
                        case 1:
                            s.Game.system.infiniteLives = !0,
                            s.Game.system.lives = s.Game.system.maxLives;
                            break;
                        case 2:
                            s.Game.system.infinitePowerups = !0,
                            s.Game.system.powerups = s.Game.system.maxPowerups;
                            break;
                        case 3:
                            s.Game.system.krakenCodeUsed = !0,
                            a.Spawn.instance.nextEnemy = 100,
                            a.Spawn.instance.freqEnemy = 50
                        }
                        i = !1,
                        this.codePosition = 0,
                        h = null
                    }
                } else {
                    if (i && this.codePosition <= 1 && e === this.codes[h][0])
                        return;
                    i = !1,
                    this.codePosition = 0;
                    for (var o = 0; o <= this.codes.length - 1 && !i; o++) {
                        e === this.codes[o][0] && (h = o,
                        i = !0)
                    }
                }
            },
            onKeydownReady: function(t) {
                c.isDown(c.DOWN) || c.isDown(c.S) || c.isDown(c.ENTER) || c.isDown(c.SPACE) ? (r.Player.instance.state = "down",
                s.Game.system.gameState = "playing",
                o.recordGameStart(),
                n.Interface.system.hideScreen()) : c.isDown(c.LEFT) || c.isDown(c.A) ? (r.Player.instance.state = "left-down",
                s.Game.system.gameState = "playing",
                o.recordGameStart(),
                n.Interface.system.hideScreen()) : (c.isDown(c.RIGHT) || c.isDown(c.D)) && (r.Player.instance.state = "right-down",
                s.Game.system.gameState = "playing",
                o.recordGameStart(),
                n.Interface.system.hideScreen())
            },
            onKeydownModal: function(t) {},
            onKeydown: function(t) {
                if (e !== t.keyCode) {
                    switch (this._pressed[t.keyCode] = !0,
                    c.isDown(c.ESC) && (n.Interface.system.clearScreen(),
                    s.Game.system.initializeGame()),
                    s.Game.system.gameState) {
                    case "playing":
                        this.onKeydownPlaying(t);
                        break;
                    case "lose":
                    case "win":
                    case "over":
                        this.onKeydownWinLose(t);
                        break;
                    case "waiting":
                        this.onKeydownWaiting(t);
                        break;
                    case "ready":
                        this.onKeydownReady(t);
                        break;
                    case "modal":
                        this.onKeydownModal(t)
                    }
                    e = t.keyCode,
                    delete this._pressed[t.keyCode]
                }
            },
            onKeyup: function(t) {
                e = null
            }
        }
    }