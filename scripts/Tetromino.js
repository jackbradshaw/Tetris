define(function() {

    return function () {

    	var self;
    	var Tetromino = function(minos, grid, colour) {
    	    self = this;
    	};
    	    
        Tetromino.prototype.height = function() {
            var yValues = minos.map(function(mino) { 
                return mino.y
            });
            var minY = Math.min.apply(null, yValues);   
            var maxY = Math.max.apply(null, yValues);  
            return maxY - minY;
        }
        
        Tetromino.prototype.getTiles = function() {
            return getOffsetCoordinates().map(function(coordinate) {
                if(!grid.contains(coordinate)) {
                    throw new Error("Coordinate not in grid");
                } else {
                    return grid.tiles()[coordinate.y][coordinate.x];
                }
            })
        }

        Tetromino.prototype.move = function(direction) {
            var canMoveBlock = canMove(direction);
            if(canMoveBlock) {
               redrawBlock(function() {         
               self.position.y += direction.y;
                  self.position.x += direction.x;
               });
            }
            return canMoveBlock;
        }  
                           
        Tetromino.prototype.rotate = function() {
            if(canRotate()) {
                redrawBlock(function() {
                    minos = getRotated(minos);
                });           
            }
        }

        function getRotated(coordinates) {
            return coordinates.map(function(coordinate) {
                return { x: coordinate.y, y: -coordinate.x};  
            });
        }
        
        function canRotate() {
            return willFit(getOffsetCoordinates(getRotated(minos)));
        }

        function getOffsetCoordinates(coordinates) {
            coordinates = coordinates || minos;
            return coordinates.map(function(coordinate) {
                return {
                    x: self.position.x + coordinate.x,
                    y: self.position.y + coordinate.y
                };
            });
        }
        
        function redrawBlock(update) {
            self.getTiles().forEach(function(tile) {
                tile.occupied(false);            
            });    
            update(); 
            self.getTiles().forEach(function(tile) {
                tile.occupied(true);
                tile.colour(colour);
            });
        }
        
        function canMove(direction) {
            var coordinates = getOffsetCoordinates();
            return willFit(coordinates.map(function(tile) {
                return {
                    x: tile.x + direction.x, 
                    y: tile.y + direction.y
                };
            }));
        }
        
        function willFit(coordinates) {
            var blockTiles = self.getTiles();
            return coordinates.every(function(coordinate) {
                var coordinateFree = false;
                if(grid.contains(coordinate)) {
                    var tile = grid.tiles()[coordinate.y][coordinate.x];
                    coordinateFree = !tile || blockTiles.indexOf(tile) !== -1 || !tile.occupied(); 
                }
                return coordinateFree;
            });    
    	}
    	return Tetromino;
    }();
});