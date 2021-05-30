"use strict";
    exports.__esModule = !0;
    var s = require(0)
      , n = function() {
        function t() {
            if (t.instance)
                return t.instance;
            t.instance = this,
            this.reset()
        }
        return t.prototype.reset = function() {}
        ,
        t.prototype.update = function() {
            this.cleanObjects()
        }
        ,
        t.prototype.cleanObjects = function() {
            function t(t) {
                return !!t && !((e = t).y + e.height < -200 || function(t) {
                    return t.y > s.Game.system.height + 200
                }(t) || t.destroy);
                var e
            }
            s.Game.system.objUpper = s.Game.system.objUpper.filter(t),
            s.Game.system.objMain = s.Game.system.objMain.filter(t),
            s.Game.system.objLower = s.Game.system.objLower.filter(t),
            s.Game.system.objBack = s.Game.system.objBack.filter(t)
        }
        ,
        t
    }();
    exports.Cleanup = n