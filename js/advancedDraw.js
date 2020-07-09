class AdvancedDraw{

	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.noSprite0, Art.noSprite1];
	}

	constructor(x, y){
		this.y = y;
		this.x = x;

		this.animationFrames = this.getAnimationFrames();

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
		this.draw = true;
	}

	getAnimationFrames(){
		return this.constructor.animationFrames;
	}

	getClass(){
		return this.constructor;
	}

	drawSelf(){
		if(!this.draw) return;
		if(this.texture){
			push();
			noSmooth();
			angleMode(DEGREES)
			this.tint.setAlpha(this.opacity);
			tint(this.tint);
			translate(this.x + gridScale/2, this.y + gridScale/2);
			rotate(this.angle);
			let xFlipSign = 1 - 2 * this.flipX;
			let yFlipSign = 1 - 2 * this.flipY;
			scale(xFlipSign, yFlipSign);
			image(this.texture, -gridScale/2 + (this.drawOffsetX*xFlipSign), -gridScale/2 + (this.drawOffsetY*yFlipSign), gridScale, gridScale);
			pop();
		}
		else{
			strokeWeight(1);
			stroke(color('black'));
			fill(color('blue'));
			ellipse(this.x + gridScale/2, this.y + gridScale/2, gridScale);
		}		
	}

	drawAtPosition(x, y){
		let oldX = this.x;
		let oldY = this.y;
		this.x = x;
		this.y = y;

		let d = this.draw;
		this.draw = true;

		this.drawSelf();

		this.draw = d;

		this.x = oldX;
		this.y = oldY;
	}

	getAnimationSpeed(){
		return this.animationSpeed;
	}

	updateAnimation(dTime){
		this.texture = this.animationFrames[Math.floor(this.animationTime) % this.animationFrames.length];
		this.animationTime += (this.getAnimationSpeed())*dTime;
	}

	update(dTime){
		this.updateAnimation(dTime);

		this.drawOffsetX -= this.drawOffsetX - this.drawOffsetX*3/5*dTime;
		this.drawOffsetY -= this.drawOffsetY - this.drawOffsetY*3/5*dTime;
	}

	setXGrid(x){
		this.x = x*gridScale;
	}

	setYGrid(y){
		this.y = y*gridScale;
	}

	setPosGrid(x, y){
		this.setXGrid(x);
		this.setYGrid(y);
	}

	getXGrid(){
		return (this.x) / gridScale;
	}

	getYGrid(){
		return (this.y) / gridScale;
	}

	getXGridCenter(){
		return this.x + gridScale/2;
	}

	getYGridCenter(){
		return this.y + gridScale/2;
	}
}