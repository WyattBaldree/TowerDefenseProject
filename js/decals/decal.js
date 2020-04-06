
var decalList = new Array(); // holds all projectile objects.

class Decal{
	constructor(x, y, lifetime){
		this.x = x;
		this.y = y;
		this.deleted = false;

		this.animationFrames = [Art.noSprite0, Art.noSprite1];

		//Things that control the sprite drawing.
		this.angle = 0;
		this.tint = color("white");
		this.opacity = 255;
		this.texture = this.animationFrames[0];
		this.animationTime = 0;
		this.animationSpeed = .08;
		this.flipX = 0;
		this.flipY = 0;
		this.drawOffsetX = 0;
		this.drawOffsetY = 0;

		this.lifetime = lifetime;
		this.removeOnLifetimeEnd = true;

		decalList.push(this);
	}

	update(dTime){
		this.updateAnimation(dTime);

		if(this.removeOnLifetimeEnd && this.lifetime <= 0){
			this.markForRemoval();
		}

		this.lifetime -= dTime;
	}

	updateAnimation(dTime){
		this.texture = this.animationFrames[Math.floor(this.animationTime) % this.animationFrames.length];
		this.animationTime += (this.animationSpeed)*dTime;
	}

	markForRemoval(){
		this.deleted = true;
		toBeRemovedList.push(this);
	}

	removeFromGame(){
		let removeIndex = decalList.indexOf(this);
		if(removeIndex >= 0) decalList.splice(removeIndex, 1);
	}

	drawSelf(){
		if(this.texture){
			push();
			noSmooth();
			angleMode(DEGREES)
			this.tint.setAlpha(this.opacity);
			tint(this.tint);
			translate(this.x + gridScale/2, this.y + gridScale/2);
			rotate(this.angle);
			scale(1 - 2 * this.flipX,1 - 2 * this.flipY);
			image(this.texture, -gridScale/2 + this.drawOffsetX, -gridScale/2 + this.drawOffsetY, gridScale, gridScale);
			pop();
		}
		else{
			strokeWeight(1);
			stroke(color('black'));
			fill(color('blue'));
			ellipse(this.x + gridScale/2, this.y + gridScale/2, gridScale);
		}		
	}
}