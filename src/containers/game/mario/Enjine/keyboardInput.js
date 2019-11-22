/**
	Class that helps to manage keyboard input.
	Code by Rob Kleffner, 2011
*/
import Enjine from './core.js';

import $ from "jquery";

Enjine.Keys = {
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 80,
    Left: 37,
    Up: 38,
    Right: 39,
    Down: 40,
    Space: 32
};

Enjine.KeyboardInput = {
    Pressed: {},

    Initialize: function (isMobile) {
        var self = this;
        var isGameStarted = false;
        var el =   window.document ||  window.document.body ||   window;
        el.onkeydown = function (event) {
            self.KeyDownEvent(event);
        }
        el.onkeyup = function (event) {
            self.KeyUpEvent(event);
        }
        if (isMobile) {
            el.addEventListener('touchstart', function (event) {

                var keyCode =  event.target.getAttribute("data-type") || event.target.parentElement.getAttribute("data-type") ;
                if (!isGameStarted && keyCode === '83') {
                    isGameStarted = !isGameStarted;
                    $(document).trigger('enterGame');
                }
                event.keyCode = keyCode;
                self.KeyDownEvent(event);
            }, false);
            el.addEventListener('touchend', function (event) {
                // event.keyCode = event.target.getAttribute("data-type");
                event.keyCode =  event.target.getAttribute("data-type") || event.target.parentElement.getAttribute("data-type") ;
                self.KeyUpEvent(event);
            }, false);
        }
    },

    IsKeyDown: function (key) {
        if (this.Pressed[key] != null)
            return this.Pressed[key];
        return false;
    },

    KeyDownEvent: function (event) {
        this.Pressed[event.keyCode] = true;
        this.PreventScrolling(event);
    },

    KeyUpEvent: function (event) {
        this.Pressed[event.keyCode] = false;
        this.PreventScrolling(event);
    },

    PreventScrolling: function (event) {        
        // 37: left, 38: up, 39: right, 40: down
        if (event.keyCode >= 32 && event.keyCode <= 40 ) {
            var e = event || window.event;
            if(e.type.indexOf('touch')!==0){
            e.preventDefault && e.preventDefault();
            e.stopPropagation && e.stopPropagation();
            e.cancelBubble = true;
            e.returnValue = false;
            }
        }
    }
};