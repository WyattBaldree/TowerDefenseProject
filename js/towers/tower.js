var towerList = new Array(); // holds all tower objects.

var towerArray; // a 2d array which holds all towers.

class Tower extends Unit{

	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.noSprite0, Art.noSprite1];
		classRef.unitName = "Tower";
		classRef.description = "Default tower class";
		classRef.range = 3;
		classRef.damage = 5;
		classRef.speed = 5;
		classRef.price = 100;
		classRef.maxTargets = 1;
		classRef.upgrades = [];
	}

	constructor(x, y){
		super(x, y);

		this.animationSpeed = .15;

		this.canTargetMultiple = false;

		this.targetType = "enemy";

		this.cooldown = 0;

		this.permanent = false;

		this.ability = null;

		this.move(x, y);
		towerArray[this.getXGrid()][this.getYGrid()] = this;
		towerList.push(this);
	}

	move(x, y){
		if(x >= 0 && y >= 0 && x < towerArray.length && y < towerArray[0].length){
			//towerArray[this.getXGrid()][this.getYGrid()] = null;
			this.removeAllEffects();

			this.setPosGrid(x, y);

			let isOnDamageTile = this.isOnTile("Damage");
			let isOnRangeTile = this.isOnTile("Range");
			let isOnSpeedTile = this.isOnTile("Speed");

			if(isOnDamageTile){
				this.addEffect(new Effect("tileDamageBonus;100;-1"));
			}
			if(isOnRangeTile){
				this.addEffect(new Effect("tileRangeBonus;100;-1"));
			}
			if(isOnSpeedTile){
				this.addEffect(new Effect("tileSpeedBonus;100;-1"));
			}

			//towerArray[this.getXGrid()][this.getYGrid()] = this;
			this.onStatUpdated();

			return true;
		}
		return false;
	}

	getBaseRange(){
		return this.constructor.range;
	}

	getBaseDamage(){
		return this.constructor.damage;
	}

	getBaseSpeed(){
		return this.constructor.speed;
	}

	getBasePrice(){
		return this.constructor.price;
	}

	getBaseMaxTargets(){
		return this.constructor.maxTargets;
	}

	getUpgrades(){
		return this.constructor.upgrades;
	}

	update(dTime){
		super.update(dTime);
	}

	shoot(shootTarget){
	}

	die(){
		// award gold/xp then remove from the game
		super.die();
	}

	getDamage(){
		let multiplier = 1;
		multiplier+=this.tileDamageBonus/100;
		return this.getBaseDamage() * multiplier;
	}

	getRange(){
		let multiplier = 1;
		multiplier+=this.tileRangeBonus/100;
		return this.getBaseRange() * multiplier;
	}

	getSpeed(){
		let multiplier = 1;
		multiplier+=this.tileSpeedBonus/100;

		return (this.getBaseSpeed() + this.speedAura) * multiplier;
	}

	isOnTile(tileType){
		for(let i = 0 ; i < levelData[currentLevelIndex].powerTiles.length ; i++){
			let currentTile = levelData[currentLevelIndex].powerTiles[i];
			if(currentTile.x == this.getXGrid() && currentTile.y == this.getYGrid() && currentTile.name == tileType){
				return true;
			}
		}
		return false;
	}


	removeFromGame(){
		super.removeFromGame();
		let removeIndex = towerList.indexOf(this);
		if(removeIndex >= 0) towerList.splice(removeIndex, 1);

		if(towerArray[this.getXGrid()][this.getYGrid()] == this) towerArray[this.getXGrid()][this.getYGrid()] = null;
	}

	drawSelf(){
		if(this.isOnDamageTile){
			this.tint = color("red");
		}
		else if(this.isOnRangeTile){
			this.tint = color("green");
		}
		else if(this.isOnSpeedTile){
			this.tint = color("yellow");
		}
		super.drawSelf();
	}

	drawHovered(){
		// draw the range of the tower.
		stroke(color('rgba(255,255,51, 1)'));
		fill(color('rgba(255,255,51,.2)'));
		ellipse(this.getXGridCenter(), this.getYGridCenter(), this.getRange() * 2 * gridScale);
	}

	drawSelected(){
		// draw the range of the tower.
		stroke(color('rgba(255,255,51, 1)'));
		fill(color('rgba(255,255,51,.2)'));
		ellipse(this.getXGridCenter(), this.getYGridCenter(), this.getRange() * 2 * gridScale);
	}
}