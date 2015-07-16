define(["./Tetromino", "./Tile"], function(Tetromino, Tile) {

    return function() {     

        var Grid = function Grid(width, height) {
            this.width = width;
            this.height = height;
            this.rows = [];
            for(var y = 0; y < height ; y++) {
                this.rows[y] = this.newRow();
            }
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
                this.addTetromino(this.getNewTetromino(), { x:5, y:0 });
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
        
        Grid.prototype.addTetromino = function(tetromino) {
            this.tetromino = tetromino;   
        };

        Grid.prototype.contains = function(coordinate) {
             return 0 <= coordinate.x && coordinate.x < this.width && 0 <= coordinate.y && coordinate.y < this.height;  
        };        

        Grid.prototype.isTileAvailable = function(coordinate) {
            return this.contains(coordinate) && !this.rows[coordinate.y][coordinate.x];
        };

        //Move to Tetromino factory
        Grid.prototype.getNewTetromino = function() {
            var Tetrominos = [
                this.makeTetromino([{x:0, y:0}, {x:0, y:1}, {x: 1, y: 1}, {x:1, y:2}], "red"),
                this.makeTetromino([{x:0, y:1}, {x:1, y:1}, {x: 1, y: 0}, {x:2, y:0}], "green"),
                this.makeTetromino([{x:0, y:0}, {x:0, y:1}, {x: 0, y: 2}, {x:0, y:3}], "orange"),
                this.makeTetromino([{x:0, y:0}, {x:1, y:0}, {x: 0, y: 1}, {x:1, y:1}], "yellow"),
                this.makeTetromino([{x:1, y:-1}, {x:1, y:0}, {x: 1, y: 1}, {x:0, y:1}], "magenta"),
                this.makeTetromino([{x:-1, y:-1}, {x:-1, y:0}, {x: -1, y: 1}, {x:0, y:1}], "cyan")
            ];
            
            var randomIndex = Math.floor(Math.random() * Tetrominos.length);
            return Tetrominos[randomIndex];
        };
        
        Grid.prototype.makeTetromino = function(points, colour) {
            var position = {
                x: this.width / 2,
                y: 1
            };
            var tetromino = new Tetromino( 
                points,
                colour,
                position,
                this.isTileAvailable.bind(this));  
            
            return tetromino;        
        };

        return Grid;
    }();
});
