class Explosion extends Projectile{
	constructor(x, y, range, damage, effect = null){
		super(x, y);
		this.damage = damage;
		this.range = range;
		this.speed = 0;

		this.numberOfFrames = 1;

		this.effect = effect;

		dealDamageInArea(this.x, this.y, this.range, this.damage);
		if (this.effect != null) addEffectInArea(this.x, this.y, this.range, this.effect);
	}
	
	update(dTime){
		super.update(dTime);
		if(this.numberOfFrames <= 0) this.die();
		this.numberOfFrames -= dTime;
	}

	drawSelf(){
		strokeWeight(1);
		stroke(color('rgba(255,0,0, 1)'));
		fill(color('rgba(255,0,0,.2)'));
		ellipse(this.x, this.y, this.range * 2 * gridScale);
	}
}