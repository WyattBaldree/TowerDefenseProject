
var projectileList = new Array(); // holda all projectile objects.

class Projectile extends Unit{
	constructor(x, y){
		super(x, y)
		this.speed = 55;
		this.damage = 1;
		this.angleOffset = 0;
		this.doUpdateAngle = true;
		projectileList.push(this);

		this.effect = null;
	}

	update(dTime){
		super.update(dTime);
		this.updateAngle();
	}

	onHit(){
		this.die();
	}

	moveTowardsPoint(dTime, x, y){
		let deltaX = x - this.x;
		let deltaY = y - this.y;

		let distance = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));

		if(distance <= this.speed*dTime){
			this.x = x;
			this.y = y;
			this.onHit();
			return;
		}
		else
		{
			let vI = deltaX/distance
			let vJ = deltaY/distance
			let velocityX = vI * this.speed*dTime;
			let velocityY = vJ * this.speed*dTime;

			this.x += velocityX;
			this.y += velocityY;
		}
	}

	die(){
		super.die();
	}

	updateAngle(){
		this.angle = 0;
	}

	removeFromGame(){
		super.removeFromGame();
		let removeIndex = projectileList.indexOf(this);
		if(removeIndex >= 0) projectileList.splice(removeIndex, 1);
	}
}