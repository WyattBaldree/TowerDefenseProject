var enemyList = new Array(); // holds all enemy objects.

class Enemy extends Unit{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.noSprite0, Art.noSprite1];
		classRef.unitName = "Enemy";
		classRef.description = "Default enemy class";
		classRef.maxHealth = 100;
		classRef.armor = 0;
		classRef.speed = 2;
		classRef.damage = 1;
		classRef.moneyValue = 10;
	}

	getBaseMaxHealth(){
		return this.constructor.maxHealth;
	}

	getBaseArmor(){
		return this.constructor.armor;
	}

	getBaseSpeed(){
		return this.constructor.speed;
	}

	getBaseDamage(){
		return this.constructor.damage;
	}

	getBaseMoneyValue(){
		return this.constructor.moneyValue;
	}

	constructor(x,y,pathID){
		super(x,y);
		this.maxHealth = this.getBaseMaxHealth();
		this.armor = this.getBaseArmor();
		this.speed = this.getBaseSpeed();
		this.damage = this.getBaseDamage();
		this.moneyValue = this.getBaseMoneyValue();


		this.health = this.maxHealth;
		this.pathID = pathID;
		this.currentIndex = 0;
		this.untargetable = false;
		this.currentDistanceOnPath = 0;
		
		enemyList.push(this);
	}

	update(dTime){
		super.update(dTime);

		this.currentDistanceOnPath = this.getCurrentDistanceOfPath();

		this.move(this.speed*dTime);
	}

	getAnimationSpeed(){
		return this.animationSpeed + this.speed/20;
	}

	takeDamage(damage){
		let preDamageHealth = this.health;
		let finalDamage = damage - this.armor;
		if(finalDamage < 0){
			finalDamage = 0;
		}
		else{
			this.drawOffsetX = Math.random()*12 - 6;
			this.drawOffsetY = Math.random()*12 - 6;
			new DamageNumber(this.x + gridScale/2, this.y + gridScale/2, finalDamage);
		}
		this.health = preDamageHealth - finalDamage;


		if(this.health <= 0 && preDamageHealth > 0){
			this.die();
		}
	}

	move(spd){

		if (this.currentIndex < Path.length(this.pathID)){
			let finalSpeed = spd;

			let currentNodeX = Path.getX(this.pathID,this.currentIndex) * gridScale;
			let currentNodeY = Path.getY(this.pathID,this.currentIndex) * gridScale;

			let deltaX = currentNodeX - this.x;
			let deltaY = currentNodeY - this.y;

			let distance = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));

			while(distance < finalSpeed){
				
				finalSpeed = finalSpeed - distance;
				this.x = currentNodeX;
				this.y = currentNodeY;
				
				if (this.currentIndex < Path.length(this.pathID) - 1){
					this.currentIndex++;
					currentNodeX = Path.getX(this.pathID,this.currentIndex) * gridScale;
					currentNodeY = Path.getY(this.pathID,this.currentIndex) * gridScale;

					deltaX = currentNodeX - this.x;
					deltaY = currentNodeY - this.y;

					distance = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));
				}
				else{
					this.attackPlayer();
					return;
				}
			}

			let vI = deltaX/distance
			let vJ = deltaY/distance
			let velocityX = vI * finalSpeed;
			let velocityY = vJ * finalSpeed;
			//this.angle = Math.atan2(velocityY, velocityX) * 180 / Math.PI;
			this.flipX = Math.sign(-velocityX) <= 0;

			this.x += velocityX;
			this.y += velocityY;
		}
	}

	attackPlayer(){
		player.setHealth(player.health - this.damage);
		this.markForRemoval();
	}

	getDistanceToEndOfPath(){
		//go through every node ugh
		let deltaX = Path.getX(this.pathID,this.currentIndex) * gridScale - this.x;
		let deltaY = Path.getY(this.pathID,this.currentIndex) * gridScale - this.y;
		let distanceToTarget = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));
		let distanceFromTargetToEnd = 0;
		for(let i = this.currentIndex; i < Path.length(this.pathID) - 1; i++){
			let deltaX = Path.getX(this.pathID, i + 1) * gridScale - Path.getX(this.pathID, i) * gridScale;
			let deltaY = Path.getY(this.pathID, i + 1) * gridScale - Path.getY(this.pathID, i) * gridScale;
			distanceFromTargetToEnd += Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));
		}
		return distanceToTarget + distanceFromTargetToEnd;
	}

	getCurrentDistanceOfPath(){
		let totalDistanceOfPath = 0;
		for(let i = 0; i < Path.length(this.pathID) - 1; i++){
			let deltaX = Path.getX(this.pathID, i + 1) * gridScale - Path.getX(this.pathID, i) * gridScale;
			let deltaY = Path.getY(this.pathID, i + 1) * gridScale - Path.getY(this.pathID, i) * gridScale;
			totalDistanceOfPath += Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));
		}
		return totalDistanceOfPath - this.getDistanceToEndOfPath()
	}

	die()
	{
		// award gold/xp then remove from the game
		super.die();
		player.setGold(player.gold + this.moneyValue);
		new GoldNumber(this.x + gridScale/2, this.y + gridScale/2, this.moneyValue);
	}

	removeFromGame(){
		super.removeFromGame();
		let removeIndex = enemyList.indexOf(this);
		if(removeIndex >= 0) enemyList.splice(removeIndex, 1);

		if(enemyList.length <= 0 && Timeline.currentSpawn >= Timeline.totalSpawns()){
			winLevel();
		}
	}

}