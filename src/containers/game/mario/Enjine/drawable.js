/**
	Base class for all drawable objects, makes ordering automatic.
	Code by Rob Kleffner, 2011
*/
import Enjine from './core.js';

Enjine.Drawable = function() {
    this.ZOrder = 0;
};

Enjine.Drawable.prototype = {
    Draw: function(context) { }
};