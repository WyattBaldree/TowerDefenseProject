var enemyList = new Array(); // holds all enemy objects.

class Enemy extends Unit{
	constructor(x,y,pathID){
		super(x,y);
		this.health = 10;
		this.armor = 0;
		this.speed = 2;
		this.damage = 1;
		this.pathID = pathID;
		this.moneyValue = 10;
		this.currentIndex = 0;
		this.untargetable = false;
		enemyList.push(this);

		this.debug = color('green');
	}

	drawSelf(){
		super.drawSelf();
	}

	update(){
		super.update();

		this.move();
	}

	takeDamage(damage){
		let preDamageHealth = this.health;
		let finalDamage = damage - this.armor;
		if(finalDamage < 0){
			finalDamage = 0;
		}
		this.health = preDamageHealth - finalDamage;//this is wrong
		if(this.health <= 0 && preDamageHealth > 0){
			this.die();
		}

		let temp = 'rgb(' + int(random(255)) + ',' + int(random(255)) + ',' + int(random(255)) + ')';
		this.debug = color(temp);
	}

	move(){

		if (this.currentIndex < Path.length(this.pathID)){
			let finalSpeed = this.speed;

			let currentNodeX = Path.getX(this.pathID,this.currentIndex) * gridScale;
			let currentNodeY = Path.getY(this.pathID,this.currentIndex) * gridScale;

			let deltaX = currentNodeX - this.x;
			let deltaY = currentNodeY - this.y;

			let distance = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));

			while(distance < finalSpeed){
				
				finalSpeed = finalSpeed - distance;
				this.x = currentNodeX;
				this.y = currentNodeY;



				this.currentIndex++;
				if (this.currentIndex < Path.length(this.pathID)){
					currentNodeX = Path.getX(this.pathID,this.currentIndex) * gridScale;
					currentNodeY = Path.getY(this.pathID,this.currentIndex) * gridScale;

					deltaX = currentNodeX - this.x;
					deltaY = currentNodeY - this.y;

					distance = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));
				}
				else{
					return;
				}
			}

			let vI = deltaX/distance
			let vJ = deltaY/distance
			let velocityX = vI * finalSpeed;
			let velocityY = vJ * finalSpeed;

			console.log(distance)
			console.log(velocityX)
			this.x += velocityX;
			this.y += velocityY;
			
		}
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

	die()
	{
		// award gold/xp then remove from the game
		super.die();
		player.money += this.moneyValue;
	}

	removeFromGame(){
		super.removeFromGame();
		let removeIndex = enemyList.indexOf(this);
		if(removeIndex >= 0) enemyList.splice(removeIndex, 1);
	}

}