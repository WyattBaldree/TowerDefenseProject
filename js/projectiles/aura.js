class Aura extends Projectile{
	constructor(x, y, range, effect = null){
		super(x, y);
		this.range = range;
		this.speed = 0;

		this.numberOfFrames = 10;
		this.numberOfFramesMax = this.numberOfFrames;

		this.effect = effect;

		if (this.effect != null) addEffectInArea(this.x, this.y, this.range, this.effect, "tower");
	}
	
	update(dTime){
		super.update(dTime);
		if(this.numberOfFrames <= 0) this.die();
		this.numberOfFrames -= dTime;
	}

	drawSelf(){
		strokeWeight(1);
		stroke(color('rgba(0,255,0, 1)'));
		fill(color('rgba(0,255,0,.2)'));
		ellipse(this.x, this.y, this.range * 2 * gridScale);
	}
}