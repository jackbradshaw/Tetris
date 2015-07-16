define(function() {

    return function () {

    	var Tetromino = function(minos, colour, position, isCoordinateAvailable) {
            this.minos = minos;
            this.position = position;
            this.colour = colour;
            this.isCoordinateAvailable = isCoordinateAvailable;
    	};
    	    
        //Do we need?
        Tetromino.prototype.height = function() {
            var yValues = this.minos.map(function(mino) { 
                return mino.y
            });
            var minY = Math.min.apply(null, yValues);   
            var maxY = Math.max.apply(null, yValues);  
            return 1 + maxY - minY;
        }; 

        Tetromino.prototype.move = function(direction) {
            var self = this;
            var canMoveBlock = self.canMove(direction);
            if(canMoveBlock) {       
                self.position.y += direction.y;
                self.position.x += direction.x;
            }
            return canMoveBlock;
        };

        Tetromino.prototype.canMove = function(direction) {
            var coordinates = this.getOffsetCoordinates();
            return this.willFit(coordinates.map(function(tile) {
                return {
                    x: tile.x + direction.x, 
                    y: tile.y + direction.y
                };
            }));
        }; 
                           
        Tetromino.prototype.rotate = function() {
            var self = this;
            if(self.canRotate()) {
                self.minos = self.getRotated(self.minos);          
            }
        };

        Tetromino.prototype.canRotate = function() {
            return this.willFit(this.getOffsetCoordinates(this.getRotated(this.minos)));
        };    
                
        Tetromino.prototype.willFit = function(coordinates) {
            return coordinates.every(this.isCoordinateAvailable);
    	};

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

        Tetromino.prototype.getRotated = function(coordinates) {
            return coordinates.map(function(coordinate) {
                return { 
                    x: coordinate.y, 
                    y: -coordinate.x
                };  
            });
        }; 

    	return Tetromino;
    }();
});