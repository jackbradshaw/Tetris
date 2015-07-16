define(["./Tetromino"], function(Tetromino) {

	var TetrominoFactory = function(position, isCoordinateAvailable) {
		this.bag = [];
		this.position = position;
		this.isCoordinateAvailable = isCoordinateAvailable;
	};

	TetrominoFactory.prototype.makeTetromino = function() {
		if(this.bag.length === 0) {
			this.bag = this.makeBag();
		}
		var randomIndex = Math.floor(Math.random() * this.bag.length);
		return this.bag.splice(randomIndex, 1)[0];
	};

	TetrominoFactory.prototype.makeBag = function() {
		return [
			this.makeO(),
			this.makeT(),
			this.makeL(),
			this.makeJ(),
			this.makeS(),
			this.makeZ(),
			this.makeI()
		];
	};

	TetrominoFactory.prototype.make = function(minos, colour) {
		return new Tetromino(
			minos, 
			colour,
			{x: this.position.x, y: this.position.y},
			this.isCoordinateAvailable
		);
	};

	TetrominoFactory.prototype.makeO = function() {
		return this.make([
			{x : 0, y: 0},
			{x : 0, y: 1},
			{x : 1, y: 0},
			{x : 1, y: 1}
			],
			"yellow"
		);
	};

	TetrominoFactory.prototype.makeT = function() {
		return this.make([
			{x : -1, y: 0},
			{x : 0, y: 0},
			{x : 1, y: 0},
			{x : 0, y: -1}
			],
			"purple"
		);
	};

	TetrominoFactory.prototype.makeS = function() {
		return this.make([
			{x : -1, y: 0},
			{x : 0, y: 0},
			{x : 0, y: -1},
			{x : 1, y: -1}
			],
			"green"
		);
	};

	TetrominoFactory.prototype.makeZ = function() {
		return this.make([
			{x : -1, y: -1},
			{x : 0, y: -1},
			{x : 0, y: 0},
			{x : 1, y: 0}
			],
			"red"
		);
	};

	TetrominoFactory.prototype.makeL = function() {
		return this.make([
			{x : -1, y: 0},
			{x : 0, y: 0},
			{x : 1, y: 0},
			{x : 1, y: 1}
			],
			"orange"
		);
	};

	TetrominoFactory.prototype.makeJ = function() {
		return this.make([
			{x : -1, y: -1},
			{x : -1, y: 0},
			{x : 0, y: 0},
			{x : 1, y: 0}
			],
			"blue"
		);
	};

	TetrominoFactory.prototype.makeI = function() {
		return this.make([
			{x : -1, y: 0},
			{x : 0, y: 0},
			{x : 1, y: 0},
			{x : 2, y: 0}
			],
			"cyan"
		);
	};

	return TetrominoFactory;
});