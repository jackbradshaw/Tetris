define(["knockout"], function(ko) {
	return function() {
		var self;
		var Tile = function(occupied, colour) {
		    self = this;
		    self.occupied = ko.observable(occupied);
		    self.colour = ko.observable(colour);
		};
		return Tile;
	}();
});