define(["knockout", "./TetrisViewmodel"], function(ko, TetrisViewmodel) {
	var canvas = document.getElementById("canvas");
	var viewModel = new TetrisViewmodel(10, 22, "blue", canvas);
	viewModel.grid.addTetromino(viewModel.grid.getNewTetromino());
	setInterval(viewModel.tick.bind(viewModel), 200);
	ko.applyBindings(viewModel);	
});