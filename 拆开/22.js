"use strict";
    exports.__esModule = !0;
    var s = require(0);
    exports.GameSetup = function() {
        var t = $("game-canvas")
          , e = new s.Game(t,60)
          , i = window.performance.now()
          , n = function() {
            requestAnimationFrame(n);
            var t = window.performance.now() - i;
            t > 1e3 / 60 && (e.gameLoop(t),
            i = window.performance.now())
        };
        requestAnimationFrame(n),
        function(t, e) {
            var i = null;
            window.addEventListener("resize", function() {
                null != i && (clearTimeout(i),
                i = null),
                i = setTimeout(function() {
                    i = null,
                    t()
                }, e)
            })
        }(function() {
            e.reflowCanvas()
        }, 50)
    }