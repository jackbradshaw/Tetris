define(["./TetrominoFactory", "./Tile"], function(TetrominoFactory, Tile) {

    return function() {     

        var Grid = function Grid(width, height, updated) {

            this.width = width;
            this.height = height;

            this.updated = updated;

            this.dropInterval = 200;
            this.lockInterval = 400;

            this.tetrominoFactory = new TetrominoFactory(
                { x: width / 2, y: 1 },
                this.isTileAvailable.bind(this));

            this.rows = [];
            for(var y = 0; y < height ; y++) {
                this.rows[y] = this.newRow();
            }

            this.dropNewTetromino();
        };
        
        Grid.prototype.newRow = function() {
            var newRow = []; 
            for(var x = 0; x < this.width; x++) {
                newRow[x] = undefined;
            }
            return newRow;
        }

        Grid.prototype.removeCompleteRows = function() {
            var self = this;
            var completeRows = self.rows.filter(function(row, y) {
                return row.every(function(tile) {
                    return !!tile;   
                });
            });
            this.removeAndReplaceRows(completeRows);
        }

        Grid.prototype.removeAndReplaceRows = function(rows) {
            var self = this;
            rows.forEach(function(row) {
                self.rows.splice(self.rows.indexOf(row), 1);
                self.rows.unshift(self.newRow());
            });
        } 
        
        Grid.prototype.scheduleMoveDown = function() {
            this.scheduledMoveDown = setTimeout(this.moveDown.bind(this), this.dropInterval);
        }

        Grid.prototype.moveDown = function() {
            if(!this.tetromino.move({x: 0, y: 1})){
                this.scheduleLock();  
            } else {
                this.updated();
                this.scheduleMoveDown();
            }
        };

        Grid.prototype.scheduleLock = function() {
            var self = this;
            this.scheduledLock = setTimeout(function() {
                self.lockTetromino.call(self);
                self.scheduledLock = undefined;
            }, self.lockInterval);
        }

        Grid.prototype.resetScheduledLock = function() {
            var reset = false;
            if(this.scheduledLock) {
                clearTimeout(this.scheduledLock);
                this.scheduleLock();
                reset = true;
            }
            return reset;
        }

        Grid.prototype.lockTetromino = function() {
            var self = this;
            self.getTetrominoTiles().forEach(function (tile) {
               self.rows[tile.y][tile.x] = tile.colour; 
            });
           
            this.removeCompleteRows();
            this.dropNewTetromino();
        };

        Grid.prototype.getTetrominoTiles = function() {
            var self = this;
            return !self.tetromino ? [] : self.tetromino.getOffsetCoordinates().map(function(coordinate) {
                return new Tile(coordinate, self.tetromino.colour);
            });
        };

        Grid.prototype.getGhostTiles = function() {
            var self = this;
            return !self.tetromino ? [] : self.tetromino.getDroppedCoordinates().map(function(coordinate) {
                return new Tile(coordinate, self.tetromino.colour);
            });
        };
        
        Grid.prototype.dropNewTetromino = function() {
            this.tetromino = this.tetrominoFactory.makeTetromino();  
            if(!this.tetromino.getOffsetCoordinates().every(this.isTileAvailable.bind(this))) {
                alert("Game Over!");
                clearTimeout(this.scheduledMoveDown);
                this.updated();
            } else {
                this.scheduleMoveDown(); 
            }
        };

        Grid.prototype.moveTetromino = function(direction) {
            if(this.tetromino.move(direction)) {
                 if(this.resetScheduledLock()) {
                    while(this.tetromino.move({x: 0, y: 1}));
                }
            }
            this.updated();
        };

        Grid.prototype.dropTetromino = function(direction) {
            this.tetromino.drop();            
            this.updated();
        };

        Grid.prototype.rotateTetromino = function(direction) {
            if(this.tetromino.rotate(direction)) {                
                if(this.resetScheduledLock()) {
                    while(this.tetromino.move({x: 0, y: 1}));
                }
            }
            this.updated();
        };

        Grid.prototype.contains = function(coordinate) {
             return 0 <= coordinate.x && coordinate.x < this.width && 0 <= coordinate.y && coordinate.y < this.height;  
        };        

        Grid.prototype.isTileAvailable = function(coordinate) {
            return this.contains(coordinate) && !this.rows[coordinate.y][coordinate.x];
        };

        return Grid;
    }();
});
