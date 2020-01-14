
var projectileList = new Array(); // holda all projectile objects.

class Projectile extends Unit{
	constructor(x, y){
		super(x, y)
		this.speed = 5;
		this.damage = 1;
		projectileList.push(this);
	}

	update(){
		super.update();
	}

	onHit(){
		this.die();
	}

	moveTowardsPoint(x, y){
		let deltaX = x - this.x;
		let deltaY = y - this.y;

		let distance = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));

		if(distance <= this.speed){
			this.onHit();
			return;
		}
		else
		{
			let vI = deltaX/distance
			let vJ = deltaY/distance
			let velocityX = vI * this.speed;
			let velocityY = vJ * this.speed;

			this.x += velocityX;
			this.y += velocityY;
		}
	}

	die(){
		super.die();
	}

	removeFromGame(){
		super.removeFromGame();
		let removeIndex = projectileList.indexOf(this);
		if(removeIndex >= 0) projectileList.splice(removeIndex, 1);
	}

	drawSelf(){
		strokeWeight(1);
		stroke(color('black'));
		fill(color('red'));
		ellipse(this.x, this.y, gridScale/5);
	}
}