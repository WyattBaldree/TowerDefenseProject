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

		////////////////EFFECTS
		this.effectStack = [];
		this.frost = 0;
		this.shock = 0;

		unitList.push(this);
	}

	update(deltaTime){
		this.updateEffects(deltaTime);
	}

	updateEffects(deltaTime){
		for( let i = this.effectStack.length-1 ; i >= 0; i--){
			this.effectStack[i].currentDuration += deltaTime;
			if(this.effectStack[i].currentDuration > this.effectStack[i].duration){
				this.removeEffect(this.effectStack[i]);
			}
		}
	}

	getEffectMax(effectName){
		let max = 0;
		for( let i = this.effectStack.length-1 ; i >= 0; i--){
			if(this.effectStack[i].name == effectName){
				if(this.effectStack[i].magnitude > max) max = this.effectStack[i].magnitude;
			}
		}

		return max;
	}

	addEffect(effect){
		this.effectStack.push(effect);

		this.setStatus(effect.name, this.getEffectMax(effect.name));
	}

	removeEffect(effect){
		this.effectStack.splice(Array.prototype.indexOf(effect), 1);

		this.setStatus(effect.name, this.getEffectMax(effect.name));
	}

	setStatus(effectName, magnitude){
		switch(effectName){
			case "frost":
				this.frost = magnitude;
				break;
			case "shock":
				this.shock = magnitude;
				break;
		}
	}

	removeAllEffectWithName(effectName){
		for( let i = this.effectStack.length-1 ; i >= 0; i--){
			if(this.effectStack[i].name == effectName){
				this.effectStack.splice(i, 1);
			}
		}

		this.setStatus(effectName, this.getEffectMax(effectName));
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

		this.currentDuration = 0;
	}

	updateEffect(deltaTime){
		this.currentDuration += deltaTime;

	}
}