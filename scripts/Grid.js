define(["knockout", "./Tetromino", "./Tile"], function(ko, Block, Tile) {

    return function() {
        var self = this;
        var row = 0;         

        var Grid = function Grid(width, height) {
            self = this;
            self.tiles = ko.observableArray();
            for(var y = 0; y < height; y++) {
                addRow();
            }
        };
        
        function addRow() {
            var row = [] ;
            for(var x = 0; x < width; x++) {
                row[x] = new Tile(false, self.colour);
            }
            self.tiles.unshift(row);
        }  
        
        Grid.prototype.removeCompleteRows = function() {
            self.tiles().forEach(function(row) {
                var rowComplete = row.every(function(tile) {
                     return tile.occupied();   
                });
                if(rowComplete) {
                    self.tiles.remove(row);
                    addRow();
                }
            })
        }
        
        Grid.prototype.moveDown = function() {
            var moved = self.block.move({x: 0, y: 1});
            if(!moved){
                self.addBlock(self.getNewBlock(), {x:5, y:0});
                self.removeCompleteRows();
            }
        };
        
        Grid.prototype.addBlock= function(block) {
          self.block = block;   
        }
        
        Grid.prototype.getNewBlock = function() {
            var blocks = [
                makeBlock([{x:0, y:0}, {x:0, y:1}, {x: 1, y: 1}, {x:1, y:2}], "red"),
                makeBlock([{x:0, y:1}, {x:1, y:1}, {x: 1, y: 0}, {x:2, y:0}], "green"),
                makeBlock([{x:0, y:0}, {x:0, y:1}, {x: 0, y: 2}, {x:0, y:3}], "white"),
                makeBlock([{x:0, y:0}, {x:1, y:0}, {x: 0, y: 1}, {x:1, y:1}], "yellow"),
                makeBlock([{x:1, y:-1}, {x:1, y:0}, {x: 1, y: 1}, {x:0, y:1}], "magenta"),
                makeBlock([{x:-1, y:-1}, {x:-1, y:0}, {x: -1, y: 1}, {x:0, y:1}], "cyan")
            ];
            
            var randomIndex = Math.floor(Math.random() * blocks.length);
            return blocks[randomIndex];
        };
        
        function makeBlock(points, blockColour) {
            var block = new Block( 
                points,
                self,
                blockColour);  
            block.position = {
                x: width / 2,
                y: block.height()
            };
            return block;        
        }
        
        Grid.prototype.contains = function(coordinate) {
             return 0 <= coordinate.x && coordinate.x < width && 0 <= coordinate.y && coordinate.y < height;  
        }

        return Grid;
    }();
});
