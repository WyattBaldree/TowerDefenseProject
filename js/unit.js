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
		this.active = true;

		this.unitName = this.getUnitName();
		this.description = this.getDescription();

		////////////////EFFECTS
		this.effectStack = [];
		this.frost = 0;
		this.shock = 0;
		this.tileDamageBonus = 0;
		this.tileRangeBonus = 0;
		this.tileSpeedBonus = 0;
		this.tileMagicBonus = 0;
		this.speedAura = 0;

		unitList.push(this);
	}

	update(deltaTime){
		super.update(deltaTime);
		this.updateEffects(deltaTime);
	}

	// event called after a stat has potentially been updated.
	onStatUpdated(){};

	updateEffects(deltaTime){
		for( let i = this.effectStack.length-1 ; i >= 0; i--){
			if(this.effectStack[i].permanent) continue;
			this.effectStack[i].updateEffect(deltaTime);
			if(this.effectStack[i].currentDuration > this.effectStack[i].duration){
				this.removeEffect(this.effectStack[i]);
			}
		}
	}

	getEffectMax(effectName){
		let max = 0;
		for( let i = this.effectStack.length-1 ; i >= 0; i--){
			if(this.effectStack[i].effectName == effectName){
				if(this.effectStack[i].magnitude > max) max = this.effectStack[i].magnitude;
			}
		}

		return max;
	}

	addEffect(effect){
		this.effectStack.push(effect);

		this.setStatus(effect.effectName, this.getEffectMax(effect.effectName));
	}

	removeEffect(effect){
		for( let i = this.effectStack.length-1 ; i >= 0; i--){
			if(this.effectStack[i] === effect){
				this.effectStack.splice(i, 1);
			}
		}

		this.setStatus(effect.effectName, this.getEffectMax(effect.effectName));
	}

	setStatus(effectName, magnitude){
		switch(effectName){
			case "frost":
				this.frost = magnitude;
				break;
			case "shock":
				this.shock = magnitude;
				break;
			case "tileDamageBonus":
				this.tileDamageBonus = magnitude;
				break;
			case "tileRangeBonus":
				this.tileRangeBonus = magnitude;
				break;
			case "tileSpeedBonus":
				this.tileSpeedBonus = magnitude;
				break;
			case "speedAura":
				this.speedAura = magnitude;
				break;
		}
		this.onStatUpdated();
	}

	removeAllEffectWithName(effectName){
		for( let i = this.effectStack.length-1 ; i >= 0; i--){
			if(this.effectStack[i].effectName == effectName){
				this.effectStack.splice(i, 1);
			}
		}

		this.setStatus(effectName, this.getEffectMax(effectName));
	}

	removeAllEffects(){
		this.effectStack = [];
		this.frost = 0;
		this.shock = 0;
		this.tileDamageBonus = 0;
		this.tileRangeBonus = 0;
		this.tileSpeedBonus = 0;
		this.speedAura = 0;
		this.onStatUpdated();
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

		this.permanent = false;
		
		this.effectName = this.effectArray[0];
		this.magnitude = parseInt(this.effectArray[1]);
		this.duration = parseInt(this.effectArray[2]);

		if(this.duration = -1){
			this.permanent = true;
		}

		this.currentDuration = 0;
	}

	updateEffect(deltaTime){
		this.currentDuration += deltaTime;
	}
}