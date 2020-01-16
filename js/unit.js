var unitList = new Array(); // holds all unit objects.
var toBeRemovedList = new Array(); //holds all objects which are waiting to be removed from the game at the end of the step.

class Unit{


	constructor(x, y){
		this.setXGrid(x);
		this.setYGrid(y);
		this.deleted = false;

		//Things that control the sprite drawing.
		this.angle = 0;
		this.tint = color("white");
		this.opacity = 255;
		this.animationFrames = [Art.noSprite0, Art.noSprite1];
		this.texture = this.animationFrames[0];
		this.animationTime = 0;
		this.animationSpeed = .1;
		this.flipX = 0;
		this.flipY = 0;

		unitList.push(this);
	}

	drawSelf(){
		if(this.texture){
			push();
			noSmooth();
			angleMode(DEGREES)
			this.tint.setAlpha(this.opacity);
			tint(this.tint);
			translate(this.x + gridScale/2, this.y + gridScale/2);
			rotate(this.angle);
			scale(1 - 2 * this.flipX,1 - 2 * this.flipY);
			image(this.texture, -gridScale/2, -gridScale/2, gridScale, gridScale);
			pop();
		}
		else{
			strokeWeight(1);
			stroke(color('black'));
			fill(color('blue'));
			ellipse(this.x + gridScale/2, this.y + gridScale/2, gridScale);
		}		
	}

	updateAnimation(){
		this.texture = this.animationFrames[Math.floor(this.animationTime) % this.animationFrames.length];
		this.animationTime += this.animationSpeed;
	}

	update(){
		this.updateAnimation();
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