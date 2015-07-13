define(function() {

    return function () {

    	var Tetromino = function(minos, grid, colour) {
            this.minos = minos;
            this.grid = grid;
            this.colour = colour;
    	};
    	    
        Tetromino.prototype.height = function() {
            var yValues = this.minos.map(function(mino) { 
                return mino.y
            });
            var minY = Math.min.apply(null, yValues);   
            var maxY = Math.max.apply(null, yValues);  
            return maxY - minY;
        }
        
        Tetromino.prototype.getTiles = function() {
            var self = this;
            return self.getOffsetCoordinates().map(function(coordinate) {
                if(!self.grid.contains(coordinate)) {
                    throw new Error("Coordinate not in grid");
                } else {
                    return self.grid.tiles()[coordinate.y][coordinate.x];
                }
            })
        }

        Tetromino.prototype.move = function(direction) {
            var self = this;
            var canMoveBlock = self.canMove(direction);
            if(canMoveBlock) {
                this.redrawBlock(function() {         
                    self.position.y += direction.y;
                    self.position.x += direction.x;
                });
            }
            return canMoveBlock;
        }  
                           
        Tetromino.prototype.rotate = function() {
            var self = this;
            if(self.canRotate()) {
                self.redrawBlock(function() {
                    self.minos = self.getRotated(self.minos);
                });           
            }
        }

        Tetromino.prototype.getRotated = function(coordinates) {
            return coordinates.map(function(coordinate) {
                return { 
                    x: coordinate.y, 
                    y: -coordinate.x
                };  
            });
        }
        
        Tetromino.prototype.canRotate = function() {
            return this.willFit(this.getOffsetCoordinates(this.getRotated(this.minos)));
        }

        Tetromino.prototype.getOffsetCoordinates = function(coordinates) {
            var self = this;
            coordinates = coordinates || self.minos;
            return coordinates.map(function(coordinate) {
                return {
                    x: self.position.x + coordinate.x,
                    y: self.position.y + coordinate.y
                };
            });
        }
        
        Tetromino.prototype.redrawBlock = function(update) {
            var self = this;
            self.getTiles().forEach(function(tile) {
                tile.occupied(false);   
                tile.colour(self.grid.colour);         
            });    
            update(); 
            self.getTiles().forEach(function(tile) {
                tile.occupied(true);
                tile.colour(self.colour);
            });
        }
        
        Tetromino.prototype.canMove = function(direction) {
            var coordinates = this.getOffsetCoordinates();
            return this.willFit(coordinates.map(function(tile) {
                return {
                    x: tile.x + direction.x, 
                    y: tile.y + direction.y
                };
            }));
        }
        
        Tetromino.prototype.willFit = function(coordinates) {
            var self = this;
            var blockTiles = self.getTiles();
            return coordinates.every(function(coordinate) {
                var coordinateFree = false;
                if(self.grid.contains(coordinate)) {
                    var tile = self.grid.tiles()[coordinate.y][coordinate.x];
                    coordinateFree = !tile || blockTiles.indexOf(tile) !== -1 || !tile.occupied(); 
                }
                return coordinateFree;
            });    
    	}
    	return Tetromino;
    }();
});