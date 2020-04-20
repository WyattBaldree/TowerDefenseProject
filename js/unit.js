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

		this.effectStack = [];

		unitList.push(this);
	}

	update(deltaTime){
		this.updateEffects(deltaTime);
	}

	updateEffects(deltaTime){
		for( let i = this.effectStack.length-1 ; i >= 0; i--){
			this.effectStack[i].currentDuration -= deltaTime;
			if(Math.floor(this.effectStack[i].currentDuration) != this.effectStack[i].previousFloor){
				this.processEffect(this.effectStack[i]);
			}

			this.effectStack[i].previousFloor = Math.floor(this.effectStack[i].currentDuration);

			if(this.effectStack[i].currentDuration > this.effectStack[i].duration){
				this.effectRemove(this.effectStack[i]);
				this.effectStack.splice(i, 1);

			}
		}
	}

	processEffect(effect){
		//implement in children
	}

	addEffect(effect){
		this.effectStack.push(effect);
		this.processEffect(effect);
	}

	processEffect(effect){

	}

	removeEffect(effectName){
		for( let i = this.effectStack.length-1 ; i >= 0; i--){
			if(this.effectStack[i].name == effectName){
				this.effectStack.splice(i, 1);
			}
		}
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

class Effect{
	constructor(effectText){
		this.effectArray = effectText.split(";");

		this.name = this.effectArray[0];
		this.magnitude = this.effectArray[1];
		this.duration = this.effectArray[2];

		this.currentDuration = this.duration;
		this.previousFloor = 0;
	}

	updateEffect(deltaTime){
		this.currentDuration += deltaTime;

	}
}