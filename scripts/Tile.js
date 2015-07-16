define(function() {
	return function() {
		var Tile = function(coordinate, colour) {
		    this.x = coordinate.x;
		    this.y = coordinate.y;
		    this.colour = colour;
		};
		return Tile;
	}();
});