define(["knockout", "./TetrisViewmodel"], function(ko, TetrisViewmodel) {
	console.log(ko);
	var viewModel = new TetrisViewmodel(12, 20, "blue");
	ko.applyBindings(viewModel);
	viewModel.grid.addBlock(viewModel.grid.getNewBlock());
	setInterval(viewModel.tick.bind(viewModel), 200);
});