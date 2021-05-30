"use strict";
    exports.__esModule = !0;
    var s = require(0)
      , n = require(6)
      , r = require(1)
      , a = function() {
        function t() {
            if (t.instance)
                return t.instance;
            t.instance = this,
            this.reset()
        }
        return t.prototype.reset = function() {
            this.clear()
        }
        ,
        t.prototype.clear = function() {
            this.surfers = [],
            this.enemies = [],
            this.obstacles = []
        }
        ,
        t.prototype.update = function() {
            function t(t) {
                return t.ObjectName
            }
            this.clear();
            for (var e = s.Game.system.gameObjects, i = 0; i < e.length; i++) {
                var n = e[i];
                "Player" !== t(n) && ("Surfer" !== t(n) ? "Enemy" !== t(n) ? this.obstacles.push(n) : this.enemies.push(n) : this.surfers.push(n))
            }
            0 === this.obstacles.length || s.Game.system.clearPath || this.checkCollisions()
        }
        ,
        t.prototype.collisionHappened = function(t, e) {
            return t.box.rectOverlaps(e.box)
        }
        ,
        t.prototype.checkCollisions = function() {
            for (var t = r.Player.instance, e = this.enemies, i = this.surfers, n = this.surfers.concat(this.enemies), a = 0; a < this.obstacles.length; a++) {
                var o = this.obstacles[a];
                if (!this.collisionHappened(t, o) || o.hitByPlayer || "air" === t.state.substring(0, 3)) {
                    if ("ambient" === o.effect && o.hitByPlayer && o.y + o.height < t.y)
                        this.interactAmbient(o);
                    else if ("tentacle" === o.effect && o.hitByPlayer && o.y + o.box.height < t.y)
                        this.interactTentacle(o);
                    else if ("powerup" === o.effect && o.hitByPlayer)
                        this.interactPowerup(o);
                    else
                        for (var h = 0; h < n.length; h++)
                            if (this.collisionHappened(n[h], o) && n[h].hitObstacle !== o) {
                                if (o.y + o.height < 64)
                                    continue;
                                switch (o.effect) {
                                case "hit":
                                case "ramp":
                                case "float":
                                    this.handleCrash(o, n[h]);
                                    continue;
                                case "slow":
                                case "superslow":
                                case "spin":
                                    if (n[h].hitObstacle = o,
                                    "Enemy" === n[h].ObjectName) {
                                        n[h].currentSpeed = -t.ySpeed / 2;
                                        continue
                                    }
                                    n[h].currentSpeed = n[h].currentSpeed / 2;
                                    continue
                                }
                            }
                } else
                    switch (o.hitByPlayer = !0,
                    o.effect) {
                    case "hit":
                    case "float":
                        r.Player.instance.fall();
                        continue;
                    case "slow":
                        r.Player.instance.slow();
                        continue;
                    case "superslow":
                        r.Player.instance.superSlow();
                        continue;
                    case "spin":
                        r.Player.instance.spin();
                        continue;
                    case "ramp":
                        r.Player.instance.jump();
                        continue;
                    case "dogsurf":
                        this.playerAddDog(o);
                        continue
                    }
            }
            if ("air" !== t.state.substring(0, 3)) {
                for (a = 0; a < e.length; a++) {
                    var c = e[a];
                    if (!this.collisionHappened(c, t) || c.gotPlayer || 0 !== c.crashTimer)
                        for (var p = 0; p < i.length; p++) {
                            var l = i[p];
                            this.collisionHappened(c, l) && 0 === l.crashTimer && (l.crashTimer = 1)
                        }
                    else {
                        if (s.Game.system.shields > 0) {
                            this.enemyStun(e[a]);
                            continue
                        }
                        this.playerGrabbed(t, e[a])
                    }
                }
                for (a = 0; a < i.length; a++) {
                    l = i[a];
                    this.collisionHappened(l, t) && 0 === t.crashTimer && 0 === l.crashTimer && (l.hitByPlayer = !0,
                    t.boostTimer > 0 ? l.crashTimer = 1 : t.fall())
                }
            }
        }
        ,
        t.prototype.playerGrabbed = function(t, e) {
            t.crashTimer = 0,
            t.state = "stop",
            e.gotPlayer = !0,
            e.whichFrame = 4,
            e.state = "grab",
            s.Game.system.gameLoseEnemy()
        }
        ,
        t.prototype.playerAddDog = function(t) {
            s.Game.system.addShields(),
            t.effect = null,
            t.destroy = !0
        }
        ,
        t.prototype.interactAmbient = function(t) {
            t.whichPose = 0,
            t.animCounter % t.animRate == 0 && (t.animCounter = 0,
            t.whichFrame += 1),
            t.animCounter += 1,
            t.whichFrame > 6 * t.ambientInstance + 5 && (t.whichFrame = 6 * t.ambientInstance + 5,
            t.effect = null,
            t.hitByPlayer = !1)
        }
        ,
        t.prototype.interactPowerup = function(t) {
            if (t.collectedByPlayer)
                return t.animCounter += 1,
                t.animCounter % t.animRate == 0 && (t.animCounter = 0,
                t.whichPose += 1),
                void (t.whichPose > 3 && (t.effect = null,
                t.destroy = !0));
            t.collectedByPlayer || (t.collectedByPlayer = !0,
            s.Game.system.addPowerup(),
            t.hasRipple = !1,
            t.whichFrame += 1,
            t.isAnimated = !1,
            t.whichPose = 0)
        }
        ,
        t.prototype.interactTentacle = function(t) {
            var e = t.x - 32
              , i = t.y - 64;
            n.Spawn.instance.spawnNewEnemy("tentacle", e, i, 0),
            t.effect = null,
            t.destroy = !0
        }
        ,
        t.prototype.handleCrash = function(t, e) {
            e.hitObstacle = t,
            e.crashTimer = 1
        }
        ,
        t.prototype.enemyStun = function(t) {
            t.move(0, -20),
            t.crashTimer = 2,
            r.Player.instance.dogTimer = 4,
            s.Game.system.shields <= 1 ? s.Game.system.removeAllShields() : s.Game.system.removeShield()
        }
        ,
        t
    }();
    exports.Collisions = a