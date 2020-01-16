var towerList = new Array(); // holds all tower objects.

var towerArray; // a 2d array which holds all towers.

class Tower extends Unit{
	constructor(x, y){
		super(x, y);
		this.range = 3;
		this.damage = 5;
		this.speed = 5;
		this.cooldown = 0;
		towerList.push(this);
		towerArray[this.getXGrid()][this.getYGrid()] = this;
	}

	update(){
		super.update();
	}

	shoot(){
		this.cooldown = 100;
	}

	die(){
		// award gold/xp then remove from the game
		super.die();
	}

	removeFromGame(){
		super.removeFromGame();
		let removeIndex = towerList.indexOf(this);
		if(removeIndex >= 0) towerList.splice(removeIndex, 1);

		if(towerArray[this.getXGrid()][this.getYGrid()] == this) towerArray[this.getXGrid()][this.getYGrid()] = null;
	}

	drawSelf(){
		super.drawSelf();
	}

	drawHovered(){
		// draw the range of the tower.
		stroke(color('rgba(255,255,51, 1)'));
		fill(color('rgba(255,255,51,.2)'));
		ellipse(this.getXGridCenter(), this.getYGridCenter(), this.range * 2 * gridScale);
	}

	drawSelected(){
		// draw the range of the tower.
		stroke(color('rgba(255,255,51, 1)'));
		fill(color('rgba(255,255,51,.2)'));
		ellipse(this.getXGridCenter(), this.getYGridCenter(), this.range * 2 * gridScale);

		// draw a red square around the tower.
		stroke(color('rgba(255,0,0, 1)'));
		fill(color('rgba(255,0,0,.2)'));
		rect(this.x, this.y, gridScale, gridScale);
	}
}