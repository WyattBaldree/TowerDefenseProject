class Fireball extends Spell{
	constructor(){
		super();
		this.range = 2.5;
	}

	activate(x, y){
		super.activate(x, y);
		let explosion = new Explosion(getXGrid(x), getYGrid(y), this.range, 100, null);
		let anim = new DeleteOnAnimEnd(x - this.range*gridScale, y - this.range*gridScale);

		anim.animationFrames = [Art.explosion0, Art.explosion1, Art.explosion2, Art.explosion3, Art.explosion4, Art.explosion5];
		anim.texture = anim.animationFrames[0];
		anim.animationSpeed = 1.5;
		anim.w = this.range*2*gridScale;
		anim.h = this.range*2*gridScale;
	}
}