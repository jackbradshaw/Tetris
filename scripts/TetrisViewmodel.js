define(["./Grid"], function(Grid) {

    return function() {
        var TetrisViewModel = function(width, height, colour) {
            var self = this;
            self.grid = new Grid(width, height, colour);

        };
            
        TetrisViewModel.prototype.tick = function() {
             self.grid.moveDown();         
        }
        
        TetrisViewModel.prototype.keyDown = function(viewModel, event) {
            var code = event.keyCode || event.which; 
            if(code === 97) {
                self.grid.block.move({x:-1, y:0}); 
            }
            if(code === 100) {
                 self.grid.block.move({x:1, y:0});
            }
            if(code === 115) {
                self.grid.block.move({x:0, y:1});
            }
            if(code === 32) {
                 self.grid.block.rotate();   
            }
        }
        return TetrisViewModel;
    }();
});