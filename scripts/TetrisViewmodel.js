define(["./Grid"], function(Grid) {

    return function() {

        var TetrisViewModel = function(width, height, colour) {
            this.grid = new Grid(width, height, colour);
        };
            
        TetrisViewModel.prototype.tick = function() {
             this.grid.moveDown();         
        }
        
        TetrisViewModel.prototype.keyDown = function(viewModel, event) {
            var code = event.keyCode || event.which; 
            if(code === 97) {
                this.grid.block.move({x:-1, y:0}); 
            }
            if(code === 100) {
                 this.grid.block.move({x:1, y:0});
            }
            if(code === 115) {
                this.grid.block.move({x:0, y:1});
            }
            if(code === 32) {
                this.grid.block.rotate();   
            }
        }
        return TetrisViewModel;
    }();
});