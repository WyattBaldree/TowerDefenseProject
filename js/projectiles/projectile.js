
var projectileList = new Array(); // holda all projectile objects.

class Projectile extends Unit{
	constructor(x, y){
		super(x, y)
		this.speed = 45;
		this.damage = 1;
		this.rotationOffset = 0;
		this.doUpdateAngle = true;
		projectileList.push(this);
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

	drawSelf(){
		if(this.texture){
			push();
			noSmooth();
			angleMode(DEGREES)
			this.tint.setAlpha(this.opacity);
			tint(this.tint);
			translate(this.x + gridScale/2, this.y + gridScale/2);
			rotate(this.angle + this.rotationOffset);
			scale(1 - 2 * this.flipX,1 - 2 * this.flipY);
			image(this.texture, -gridScale/2 + this.drawOffsetX, -gridScale/2 + this.drawOffsetY, gridScale, gridScale);
			pop();
		}
		else{
			strokeWeight(1);
			stroke(color('black'));
			fill(color('red'));
			ellipse(this.x + gridScale/2, this.y + gridScale/2, gridScale/5);
		}
	}
}