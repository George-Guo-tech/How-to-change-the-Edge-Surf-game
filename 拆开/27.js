"use strict";
    exports.__esModule = !0;
    var s = function() {
        function t() {
            if (t.instance)
                return t.instance;
            t.instance = this,
            this.water = $("water"),
            this.gradient = $("gradient"),
            this.reset()
        }
        return t.prototype.reset = function() {
            this.x = 0,
            this.y = 0,
            this.stepCount = 0,
            this.updateWater(0, 0, 0, 0, 0)
        }
        ,
        t.prototype.updateWater = function(t, e, i, s, n) {
            this.x = (this.x + s * i - t) % 256,
            this.y = (this.y + n * i * 1.025 - e) % 256,
            this.water.style.backgroundPosition = -this.x + "px " + -this.y + "px"
        }
        ,
        t.prototype.setupGradient = function(t) {
            function e(e, i) {
                return (i - e) / t
            }
            this.startA = [56, 194, 238],
            this.stopA = [46, 195, 208],
            this.startB = [46, 195, 208],
            this.stopB = [248, 255, 214],
            this.gradient.style.background = "linear-gradient(180deg, rgb(" + this.startA + ") 0%, rgb(" + this.stopA + ") 100%)",
            this.stepStart = [0, 0, 0],
            this.stepStop = [0, 0, 0];
            for (var i = 0; i < 3; i++)
                this.stepStart[i] = e(this.startA[i], this.startB[i]),
                this.stepStop[i] = e(this.stopA[i], this.stopB[i])
        }
        ,
        t.prototype.updateGradient = function(t, e) {
            var i = this;
            if (!(this.stepCount >= t || this.stepCount > e)) {
                this.stepCount = t;
                var s = this.startA.map(function(t, e) {
                    return t + i.stepStart[e] * i.stepCount
                })
                  , n = this.stopA.map(function(t, e) {
                    return t + i.stepStop[e] * i.stepCount
                });
                this.gradient.style.background = "linear-gradient(180deg, rgb(" + s + ") 0%, rgb(" + n + ") 100%)"
            }
        }
        ,
        t.prototype.gameLoseGradient = function() {
            this.gradient.style.background = "linear-gradient(180deg, rgb(" + [126, 126, 126] + ") 0%, rgb(" + [187, 187, 187] + ") 100%)"
        }
        ,
        t
    }();
    exports.Background = s