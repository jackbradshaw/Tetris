define(["knockout", "./TetrisViewmodel"], function(ko, TetrisViewmodel) {
	var canvas = document.getElementById("canvas");
	var viewModel = new TetrisViewmodel(10, 22, canvas);
	ko.applyBindings(viewModel);	
});