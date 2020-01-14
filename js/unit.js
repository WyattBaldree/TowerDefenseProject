var unitList = new Array(); // holds all unit objects.
var toBeRemovedList = new Array(); //holds all objects which are waiting to be removed from the game at the end of the step.

class Unit{
	constructor(x, y){
		this.setXGrid(x);
		this.setYGrid(y);
		this.deleted = false;
		unitList.push(this);
	}

	drawSelf(){
		strokeWeight(1);
		stroke(color('black'));
		fill(color('blue'));
		ellipse(this.x + gridScale/2, this.y + gridScale/2, gridScale);
	}

	update(){

	}

	drawHovered(){

	}

	getTimelineTime(index){
		return currentLevel.levelData.timeline[index][0];
	}

	drawSelected(){

	}

	die(){
		// award gold/xp then mark for removal.
		this.markForRemoval();
	}

	markForRemoval(){
		this.deleted = true;
		toBeRemovedList.push(this);
	}

	removeFromGame(){
		let removeIndex = unitList.indexOf(this);
		if(removeIndex >= 0) unitList.splice(removeIndex, 1);
	}

	setXGrid(x){
		this.x = x*gridScale;
	}

	setYGrid(y){
		this.y = y*gridScale;
	}

	setPosGrid(x, y){
		setXGrid(x);
		setYGrid(y);
	}

	getXGrid(){
		return (this.x) / gridScale;
	}

	getYGrid(){
		return (this.y) / gridScale;
	}

	getXGridCenter(){
		return this.x + gridScale/2;
	}

	getYGridCenter(){
		return this.y + gridScale/2;
	}
}