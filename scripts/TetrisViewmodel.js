define(["./Grid", "./Tile"], function(Grid, Tile) {

    return function() {

        var TetrisViewModel = function(width, height, canvas) {
            this.blockSize = 20;
            this.grid = new Grid(width, height, this.draw.bind(this));
            this.canvas = canvas;
            this.canvas.width = width * this.blockSize;
            this.canvas.height = (height - 2) * this.blockSize;
        };

        TetrisViewModel.prototype.draw = function() {
            var self = this;
            var context = self.canvas.getContext("2d");
            context.clearRect(0, 0, self.canvas.width, self.canvas.height);

            var tiles = Array.prototype.concat.apply(this.grid.getTetrominoTiles(),
                this.grid.rows.map(function(row, y) {
                    return row.map(function(colour, x) {
                        return colour ? new Tile({x: x, y: y}, colour) : undefined
                    }).filter(function(tile) {
                        return !!tile;
                    });
                }));
            tiles.forEach(function(tile) {
                if(tile.y >= 2) {
                    context.fillStyle = tile.colour;
                    context.fillRect(tile.x * self.blockSize, (tile.y - 2) * self.blockSize, self.blockSize, self.blockSize);
                }
            });
        }
        
        TetrisViewModel.prototype.keyDown = function(viewmodel, event) {
            var code = event.keyCode || event.which; 
            if(code === 97) {
                this.grid.moveTetromino({x:-1, y:0}); 
            }
            if(code === 100) {
                 this.grid.moveTetromino({x:1, y:0});
            }
            if(code === 115) {
                this.grid.moveTetromino({x:0, y:1});
            }
            if(code === 107) {
                this.grid.rotateTetromino(-1);   
            }
            if(code === 108) {
                this.grid.rotateTetromino(1);
            }
        }
        return TetrisViewModel;
    }();
});