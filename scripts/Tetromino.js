define(function() {

    return function () {

    	var Tetromino = function(minos, colour, position, rotationOffsetData, isCoordinateAvailable) {
            this.minos = minos;
            this.position = position;
            this.colour = colour;
            this.rotationOffsetData = rotationOffsetData;
            this.rotationState = 0;
            this.isCoordinateAvailable = isCoordinateAvailable;
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

        Tetromino.prototype.canMove = function(offset) {
            return this.willFit(this.getOffsetCoordinates(offset));
        }; 

        Tetromino.prototype.getRotationState = function(direction) {
            direction = direction || 0;
            return (4 + this.rotationState + direction) % 4;
        } 
                           
        Tetromino.prototype.rotate = function(direction) {
            var self = this;
            var rotated = false;
            var targetRotationState = self.getRotationState(direction);
            var rotationOffset = self.canRotate(targetRotationState)
            if(rotationOffset) {
                self.position.x += rotationOffset.x;
                self.position.y += rotationOffset.y;
                self.rotationState = targetRotationState;  
                rotated = true;        
            }
            return rotated;
        };

        Tetromino.prototype.canRotate = function(targetRotationState) {
            var self = this;
            var rotationOffset;
            var sourceOffsets = self.rotationOffsetData[self.rotationState];
            var targetOffsets = self.rotationOffsetData[targetRotationState];
            for(var i = 0; i < targetOffsets.length && !rotationOffset; i++) { 
                var offset = {
                    x: sourceOffsets[i].x - targetOffsets[i].x,
                    y: sourceOffsets[i].y - targetOffsets[i].y
                };
                if(self.willFit(self.getOffsetCoordinates(offset, targetRotationState))) {
                    rotationOffset = offset;
                }
            }
            return rotationOffset;
        };    
                
        Tetromino.prototype.willFit = function(coordinates) {
            return coordinates.every(this.isCoordinateAvailable);
    	};

        Tetromino.prototype.getOffsetCoordinates = function(offset, rotationState) {
            var self = this;
            offset = offset || { x: 0, y: 0 }; 
            rotationState = rotationState !== undefined ? rotationState : self.rotationState;

            var rotated = self.getRotated(rotationState);
            return rotated.map(function(coordinate) {
                return {
                    x: self.position.x + offset.x + coordinate.x,
                    y: self.position.y + offset.y + coordinate.y
                };
            });
        }

        Tetromino.prototype.getRotated = function(rotationState) {
            var rotated = this.minos;
            for(var i = 0; i < rotationState; i++) {
                rotated = rotated.map(function(coordinate) {
                    return { 
                        x: coordinate.y, 
                        y: -coordinate.x
                    };  
                });
            }
            return rotated;
        }; 

    	return Tetromino;
    }();
});