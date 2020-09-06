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

		this.chargingAbility = false;

		this.chargeSpeed = 1;

		this.chargeProgress = 0;

		this.ability = null;

		this.abilityCooldown = 0;

		this.abilityCooldownSpeed = 1;

		this.move(x, y);
		towerArray[this.getXGrid()][this.getYGrid()] = this;
		towerList.push(this);
	}

	move(x, y){
		if(x >= 0 && y >= 0 && x < towerArray.length && y < towerArray[0].length){
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

		//update our ability cooldown
		if(this.abilityCooldown<100){
			this.abilityCooldown+=dTime*this.abilityCooldownSpeed;
		}
		else{
			this.abilityCooldown = 100
		}
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
		super.drawSelf();
		if(this.ability) drawBar(this.x, this.y + gridScale - 6, gridScale, 6, this.abilityCooldown/100, color("rgb(255,215,0)"), color("rgb(230,149,0)"));
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

	updateCharge(dTime){
		//handle the charging
		if(this.chargingAbility){
	  		if(this.chargeProgress <= 100){
	  			this.chargeProgress += dTime*12;

	  		}
	  		else{
	  			this.ability();
				this.abilityCooldown = 0;
	  			this.endCharging();
	  			skipNextUserRelease = true;
	  		}
	  	}
	  	else{
	  		if(this.chargeProgress >= 0){
	  			this.chargeProgress -= dTime*24;
	  		}
	  	}

	  	if(this.chargeProgress > 0){
			this.drawOffsetX = (Math.random() * 30 - 15)*(this.chargeProgress/100);
			this.drawOffsetY = (Math.random() * 30 - 15)*(this.chargeProgress/100);
		}
	}

	beginCharging(){
		if(this.ability != null && this.abilityCooldown >= 100){
			this.chargingAbility = true;
			towerBeingCharged = this;
		}
	}

	endCharging(){
		this.drawOffsetX = 0;
		this.drawOffsetY = 0;
		this.chargeProgress = 0;
		this.chargingAbility = false;
		towerBeingCharged = null;
	}
}