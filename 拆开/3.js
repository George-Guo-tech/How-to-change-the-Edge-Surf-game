"use strict";
    exports.__esModule = !0;
    var s = function() {
        function t(t, e, i) {
            var s = $(t);
            this.numFrames = e,
            this.frameWidth = s.width / e,
            this.frameHeight = s.height / i,
            this.image = s
        }
        return t.prototype.draw = function(t, e, i, s, n) {
            void 0 === n && (n = 0),
            t.drawImage(this.image, s * this.frameWidth, n * this.frameHeight, this.frameWidth, this.frameHeight, e, i, this.frameWidth, this.frameHeight)
        }
        ,
        t
    }();
    exports.Sprite = s,
    exports.surfboard64Sprite = function() {
        return new s("surfboard64",13,3)
    }
    ,
    exports.player64Sprite = function() {
        return new s("player64",13,7)
    }
    ,
    exports.konami64Sprite = function() {
        return new s("konami64",13,1)
    }
    ,
    exports.dogsurf64Sprite = function() {
        return new s("dogsurf64",14,1)
    }
    ,
    exports.enemy128Sprite = function() {
        return new s("enemy128",10,1)
    }
    ,
    exports.surfer64Sprite = function() {
        return new s("surfer64",27,2)
    }
    ,
    exports.objects64Sprite = function() {
        return new s("objects64",21,1)
    }
    ,
    exports.objects32Sprite = function() {
        return new s("objects32",4,1)
    }
    ,
    exports.interactive64Sprite = function() {
        return new s("interactive64",12,3)
    }
    ,
    exports.interactive192Sprite = function() {
        return new s("interactive192",3,3)
    }
    ,
    exports.ripple92Sprite = function() {
        return new s("ripple92",1,3)
    }
    ,
    exports.ambient64Sprite = function() {
        return new s("ambient64",24,1)
    }
    ,
    exports.swirl128Sprite = function() {
        return new s("swirl128",4,3)
    }
    ,
    exports.sandbar256Sprite = function() {
        return new s("sandbar256",5,1)
    }
    ,
    exports.island1280Sprite = function() {
        return new s("island1280",1,1)
    }
    ,
    exports.chestSprite = function() {
        return new s("chest128",3,2)
    }
    ,
    exports.bottleSprite = function() {
        return new s("bottle64",1,1)
    }