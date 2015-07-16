define(["./TetrominoFactory", "./Tile"], function(TetrominoFactory, Tile) {

    return function() {     

        var Grid = function Grid(width, height) {

            this.width = width;
            this.height = height;

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
        
        Grid.prototype.moveDown = function() {
            var moved = this.tetromino.move({x: 0, y: 1});
            if(!moved) {
                this.lockTetromino();
                this.dropNewTetromino();
                this.removeCompleteRows();
            }
        };

        Grid.prototype.lockTetromino = function() {
            var self = this;
            self.getTetrominoTiles().forEach(function (tile) {
               self.rows[tile.y][tile.x] = tile.colour; 
            });
        };

        Grid.prototype.getTetrominoTiles = function() {
            var self = this;
            return !self.tetromino ? [] : self.tetromino.getOffsetCoordinates().map(function(coordinate) {
                return new Tile(coordinate, self.tetromino.colour);
            });
        };
        
        Grid.prototype.dropNewTetromino = function() {
            this.tetromino = this.tetrominoFactory.makeTetromino();   
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
