define(["knockout", "./Tetromino", "./Tile"], function(ko, Block, Tile) {

    return function() {     

        var Grid = function Grid(width, height, colour) {
            this.width = width;
            this.height = height;
            this.colour = colour;
            this.row = 0;
            this.tiles = ko.observableArray();
            for(var y = 0; y < height; y++) {
                this.addRow();
            }
        };
        
        Grid.prototype.addRow = function() {
            var row = [];
            for(var x = 0; x < this.width; x++) {
                row[x] = new Tile(false, this.colour);
            }
            this.tiles.unshift(row);
        }  
        
        Grid.prototype.removeCompleteRows = function() {
            var self = this;
            self.tiles().forEach(function(row) {
                var rowComplete = row.every(function(tile) {
                     return tile.occupied();   
                });
                if(rowComplete) {
                    self.tiles.remove(row);
                    self.addRow();
                }
            });
        }
        
        Grid.prototype.moveDown = function() {
            var moved = this.block.move({x: 0, y: 1});
            if(!moved){
                this.addBlock(this.getNewBlock(), { x:5, y:0 });
                this.removeCompleteRows();
            }
        };
        
        Grid.prototype.addBlock = function(block) {
            this.block = block;   
        }
        
        Grid.prototype.getNewBlock = function() {
            var blocks = [
                this.makeBlock([{x:0, y:0}, {x:0, y:1}, {x: 1, y: 1}, {x:1, y:2}], "red"),
                this.makeBlock([{x:0, y:1}, {x:1, y:1}, {x: 1, y: 0}, {x:2, y:0}], "green"),
                this.makeBlock([{x:0, y:0}, {x:0, y:1}, {x: 0, y: 2}, {x:0, y:3}], "white"),
                this.makeBlock([{x:0, y:0}, {x:1, y:0}, {x: 0, y: 1}, {x:1, y:1}], "yellow"),
                this.makeBlock([{x:1, y:-1}, {x:1, y:0}, {x: 1, y: 1}, {x:0, y:1}], "magenta"),
                this.makeBlock([{x:-1, y:-1}, {x:-1, y:0}, {x: -1, y: 1}, {x:0, y:1}], "cyan")
            ];
            
            var randomIndex = Math.floor(Math.random() * blocks.length);
            return blocks[randomIndex];
        };
        
        Grid.prototype.makeBlock = function(points, blockColour) {
            var block = new Block( 
                points,
                this,
                blockColour);  
            block.position = {
                x: this.width / 2,
                y: block.height()
            };
            return block;        
        }
        
        Grid.prototype.contains = function(coordinate) {
             return 0 <= coordinate.x && coordinate.x < this.width && 0 <= coordinate.y && coordinate.y < this.height;  
        }

        return Grid;
    }();
});
