class DeleteOnAnimEnd extends Decal{
	constructor(x, y){
		super(x, y, 0);
	}

	update(dTime){
		this.updateAnimation(dTime);
	}

	updateAnimation(dTime){
		super.updateAnimation(dTime);
		if(this.animationTime > this.animationFrames.length){
			this.markForRemoval();
		}
	}
}