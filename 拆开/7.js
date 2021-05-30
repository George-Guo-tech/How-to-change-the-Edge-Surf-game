"use strict";
    exports.__esModule = !0;
    var s = require(0)
      , n = require(1)
      , r = require(12)
      , a = function() {
        function t() {
            if (t.system)
                return t.system;
            t.system = this,
            this.reset()
        }
        return t.prototype.reset = function() {
            this.defineInterface()
        }
        ,
        t.prototype.update = function() {
            this.updateCounter()
        }
        ,
        t.prototype.buildInterface = function() {
            this.stats.setAttribute("style", "opacity: 0;"),
            this.title.setAttribute("style", "opacity: 1;"),
            this.select.setAttribute("style", "opacity: 1;"),
            this.info.setAttribute("style", "opacity: 0;"),
            this.stats.innerHTML = "<div id='distance'><div id='counter'>0%</div><div id='bar-fill'></div></div><div id='lives'></div><div id='powerups'></div><div id='shields'></div>",
            this.title.innerHTML = "<div id='main'>TITLE</div><div id='cta'>MESSAGE</div>",
            this.select.innerHTML = "<div id='selector'><svg id='arrow-left' width='40px' height='40px' viewBox='0 0 20 20'><path d='M10,5 l-5,5 M5,10 l5,5' stroke='#000000' stroke-linecap='round' stroke-width='1' /></svg><svg id='arrow-right' width='40px' height='40px' viewBox='0 0 20 20'><path d='M10,5 l 5,5 M 15,10 l -5,5' stroke='#000000' stroke-linecap='round' stroke-width='1' /></svg></div>",
            this.defineInterface()
        }
        ,
        t.prototype.defineInterface = function() {
            this.stats = $("stats"),
            this.title = $("title"),
            this.select = $("select"),
            this.info = $("info"),
            this.counter = $("counter"),
            this.bar = $("bar-fill"),
            this.lives = $("lives"),
            this.powerups = $("powerups"),
            this.shields = $("shields"),
            this.main = $("main"),
            this.cta = $("cta")
        }
        ,
        t.prototype.updateCounter = function() {
            this.counter.innerHTML = Math.min(Math.floor(s.Game.system.distance / s.Game.system.winDistance * 100), 100) + "%",
            this.bar.setAttribute("style", "width: " + Math.floor(68.99) * (s.Game.system.distance / s.Game.system.winDistance) + "px;")
        }
        ,
        t.prototype.updateIcons = function() {
            this.lives.innerHTML = "",
            this.powerups.innerHTML = "",
            this.shields.innerHTML = "";
            for (var t = 1; t <= s.Game.system.maxLives; t++) {
                var e = document.createElement("div");
                t <= s.Game.system.lives ? e.setAttribute("class", "icon life-full") : e.setAttribute("class", "icon life-empty"),
                this.lives.appendChild(e)
            }
            for (t = 1; t <= s.Game.system.maxPowerups; t++) {
                var i = document.createElement("div");
                t <= s.Game.system.powerups ? i.setAttribute("class", "icon powerup-full") : i.setAttribute("class", "icon powerup-empty"),
                this.powerups.appendChild(i)
            }
            for (t = 1; t <= s.Game.system.shields; t++)
                if (n.Player.instance.collectedDog) {
                    var r = document.createElement("div");
                    r.setAttribute("class", "icon shield"),
                    this.shields.appendChild(r)
                }
            s.Game.system.infiniteLives && ((e = document.createElement("div")).setAttribute("class", "icon infinite"),
            this.lives.appendChild(e));
            s.Game.system.infinitePowerups && ((i = document.createElement("div")).setAttribute("class", "icon infinite"),
            this.powerups.appendChild(i))
        }
        ,
        t.prototype.buildCharacterSelection = function() {
            this.main.innerHTML = "LET'S SURF",
            this.cta.innerHTML = "USE <span><</span> <span>></span> AND <span>SPACE</span> TO SELECT A SURFER"
        }
        ,
        t.prototype.buildStartScreen = function() {
            this.info.setAttribute("style", "opacity: 1;"),
            this.select.innerHTML = "",
            this.main.innerHTML = "LET'S SURF",
            this.cta.innerHTML = "PRESS <span>SPACE</span> TO START SURFING",
            this.info.innerHTML = "<h2>How to play</h2><p><span class='icon buttons-small'></span> Use the arrow keys or WASD keys to surf</p><p><span class='icon life-small'></span> Hitting a solid obstacle removes a life</p><p><span class='icon powerup-small'></span> Press F to use your speed boost powerup</p><p><span class='icon shield-small'></span> Rescue the dog for shields from enemies</p><p><span class='icon counter-small'></span> A surprise is waiting at the finish line</p>",
            this.stats.setAttribute("style", "opacity: 1;"),
            this.updateIcons()
        }
        ,
        t.prototype.hideScreen = function() {
            this.title.setAttribute("style", "opacity: 0;"),
            this.info.setAttribute("style", "opacity: 0;")
        }
        ,
        t.prototype.clearScreen = function() {
            this.stats.innerHTML = "",
            this.title.innerHTML = "",
            this.select.innerHTML = "",
            this.info.innerHTML = "",
            this.modal = $("win-modal"),
            this.credits = $("credit-modal"),
            this.modal && document.body.removeChild(this.modal),
            this.credits && document.body.removeChild(this.credits)
        }
        ,
        t.prototype.drawGameOver = function() {
            this.title.setAttribute("style", "opacity: 1;"),
            this.main.innerHTML = "TRY AGAIN",
            this.cta.innerHTML = "PRESS <span>SPACE</span> TO SURF AGAIN"
        }
        ,
        t.prototype.drawGameWin = function() {
            this.updateCounter(),
            this.title.setAttribute("style", "opacity: 1;"),
            this.main.innerHTML = "YOU WIN!",
            this.cta.innerHTML = "PRESS <span>SPACE</span> TO SURF AGAIN"
        }
        ,
        t.prototype.buildWinModal = function() {
            return cr.sendWithPromise("get-logo").then(function(t) {
                var e = loadTimeData.getString("logoKey").split("").map(function(t) {
                    return t.charCodeAt(0)
                })
                  , i = 0
                  , s = t.map(function(t) {
                    return t ^ e[i++ % e.length]
                })
                  , n = String.fromCharCode.apply(String, s);
                console.log(n);
                var r = document.createElement("div");
                r.innerHTML = "<button id='edmonds-close'><svg width='16' height='16' xmlns='http://www.w3.org/2000/svg'><line x1='1' y1='15' x2='15' y2='1'></line><line x1='1' y1='1' x2='15' y2='15'></line></svg></button><img id='edmonds-logo' alt='New logo!' src='" + n + "'></img><h1 id='edmonds-title'>Thanks for helping us build the new Microsoft Edge</h1><p id='edmonds-text'>Insiders like you make Edge great. Thanks for being part of our community and surfing the web with us!</p><button id='edmonds-cta'>Close</button>",
                r.setAttribute("id", "win-modal"),
                document.body.appendChild(r)
            })
        }
        ,
        t.prototype.buildCreditModal = function() {
            var t = document.createElement("div");
            t.innerHTML = "\n        <button id='edmonds-close'>\n            <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg'>\"\n                <line x1='1' y1='15' x2='15' y2='1'></line><line x1='1' y1='1' x2='15' y2='15'></line>\n            </svg>\n        </button>\n        <h1 id='credits-title'>Credits</h1>\n        <div id='edmonds-text'>\n            <table>\n            <tbody>\n            <tr> <td> Parker Young </td> <td> Patrick Evan Little </td> </tr>\n            <tr> <td> Scott Porterfield </td> <td> Charles Duval </td> </tr>\n            <tr> <td> William Devereux </td> <td> Jonathan Merrin </td> </tr>\n            <tr> <td> Adina Shanholtz </td> <td> Connor Smith </td> </tr>\n            <tr> <td> Addison Kaufmann </td> </tr>\n            </tbody>\n            </table>\n            <h2 id='special-thanks'> Special thanks: </h2>\n            <table>\n            <tbody>\n            <tr> <td>Emily Johnson</td> <td>Ramya Challa</td> </tr>\n            <tr> <td>Rachel Weil</td> <td>Amanda Velasco Gallardo</td> </tr>\n            <tr> <td>Tony Lew</td> <td>Olya Veselova</td> </tr>\n            <tr> <td>Chuck Friedman</td> <td>Rajesh Sundaram</td> </tr>\n            <tr> <td>Joe Belfiore</td> <td>Chris Pirih</td> </tr>\n            </tbody>\n            </table>\n        </div>\n        <button id='edmonds-cta'>Close</button>\n        ",
            t.setAttribute("id", "credit-modal"),
            document.body.appendChild(t)
        }
        ,
        t.prototype.showWinModal = function() {
            this.buildWinModal().then(function() {
                r.IslandSpawn.instance.openChest(),
                s.Game.system.gameState = "modal",
                setTimeout(function() {
                    $("win-modal").classList.add("fade"),
                    $("frost").classList.add("visible")
                }, 500),
                $("edmonds-close").addEventListener("click", function() {
                    t.system.hideWinModal(),
                    s.Game.system.gameState = "over"
                }, !1),
                $("edmonds-cta").addEventListener("click", function() {
                    t.system.hideWinModal(),
                    s.Game.system.gameState = "over"
                }, !1)
            })
        }
        ,
        t.prototype.showCreditModal = function() {
            this.buildCreditModal(),
            s.Game.system.gameState = "modal",
            setTimeout(function() {
                $("credit-modal").classList.add("fade"),
                $("frost").classList.add("visible")
            }, 50),
            $("edmonds-close").addEventListener("click", function() {
                t.system.hideCreditModal(),
                s.Game.system.gameState = "over"
            }, !1),
            $("edmonds-cta").addEventListener("click", function() {
                t.system.hideCreditModal(),
                s.Game.system.gameState = "over"
            }, !1)
        }
        ,
        t.prototype.hideWinModal = function() {
            this.modal = $("win-modal"),
            this.modal.classList.remove("fade"),
            $("frost").classList.remove("visible"),
            setTimeout(function() {
                document.body.removeChild($("win-modal"))
            }, 350),
            setTimeout(function() {
                r.IslandSpawn.instance.closeChest()
            }, 500)
        }
        ,
        t.prototype.hideCreditModal = function() {
            this.credits = $("credit-modal"),
            this.credits.classList.remove("fade"),
            $("frost").classList.remove("visible"),
            setTimeout(function() {
                document.body.removeChild($("credit-modal"))
            }, 350)
        }
        ,
        t
    }();
    exports.Interface = a