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
		classRef.upgrades = [];
	}

	constructor(x, y){
		super(x, y);

		this.animationSpeed = .15;

		this.isOnDamageTile = this.isOnTile("Damage");
		this.isOnRangeTile = this.isOnTile("Range");
		this.isOnSpeedTile = this.isOnTile("Speed");

		this.cooldown = 0;
		towerList.push(this);
		towerArray[this.getXGrid()][this.getYGrid()] = this;
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

	getUpgrades(){
		return this.constructor.upgrades;
	}

	update(dTime){
		super.update(dTime);
	}

	shoot(){
		this.cooldown += 100;
	}

	die(){
		// award gold/xp then remove from the game
		super.die();
	}

	getDamage(){
		let multiplier = 1;
		if(this.isOnDamageTile){
			multiplier*=2;
		}
		return this.getBaseDamage() * multiplier;
	}

	getRange(){
		let multiplier = 1;
		if(this.isOnRangeTile){
			multiplier*=2;
		}
		return this.getBaseRange() * multiplier;
	}

	getSpeed(){
		let multiplier = 1;
		if(this.isOnSpeedTile){
			multiplier*=2;
		}
		return this.getBaseSpeed() * multiplier;
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

		// draw a red square around the tower.
		stroke(color('rgba(255,0,0, 1)'));
		fill(color('rgba(255,0,0,.2)'));
		rect(this.x, this.y, gridScale, gridScale);
	}
}