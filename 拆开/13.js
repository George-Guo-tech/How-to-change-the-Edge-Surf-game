"use strict";
    exports.__esModule = !0;
    var s = Date.now()
      , n = 0;
    exports.recordGameEnd = function(t, e) {
        var i = e.state || "lose"
          , s = Math.round(t.distance) || 0
          , n = t.tricks || 0
          , r = t.boosts || 0
          , a = !!e.collectedDog
          , o = t.escapes || 0
          , h = {
            endCondition: i,
            distance: s,
            rampsHit: n,
            powerupsCollected: t.powerupsCollected || 0,
            powerupsUsed: r,
            dogSaved: a,
            krakensAvoided: o,
            konamiCodeUsed: !!e.usingKonamiSprite,
            msftCodeUsed: !!t.infiniteLives,
            edgeCodeUsed: !!t.infinitePowerups,
            krakenCodeUsed: !!t.krakenCodeUsed
        };
        "win" === i && (h.remainingLives = t.lives,
        h.remainingShields = t.shields,
        h.remainingPowerups = t.powerups),
        "undefined" != typeof chrome && "function" == typeof chrome.send && chrome.send("record-game-end", [h])
    }
    ,
    exports.recordGameStart = function() {
        n += 1
    }
    ,
    window.addEventListener("beforeunload", function() {
        var t = Date.now() - s;
        "undefined" != typeof chrome && "function" == typeof chrome.send && chrome.send("record-unload", [n, t])
    })