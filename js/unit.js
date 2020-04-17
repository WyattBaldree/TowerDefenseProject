var unitList = new Array(); // holds all unit objects.
var toBeRemovedList = new Array(); //holds all objects which are waiting to be removed from the game at the end of the step.

class Unit extends AdvancedDraw{

	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.noSprite0, Art.noSprite1];
		classRef.unitName = "Unit";
		classRef.description = "Default unit class";
	}

	constructor(x, y){
		super(x, y);
		this.setXGrid(x);
		this.setYGrid(y);
		this.deleted = false;

		this.unitName = this.getUnitName();
		this.description = this.getDescription();

		unitList.push(this);
	}

	getUnitName(){
		return this.constructor.unitName;
	}

	getDescription(){
		return this.constructor.description;
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
}