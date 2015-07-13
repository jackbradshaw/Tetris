define(["knockout"], function(ko) {
	return function() {
		var Tile = function(occupied, colour) {
		    this.occupied = ko.observable(occupied);
		    this.colour = ko.observable(colour);
		};
		return Tile;
	}();
});