class Explosion extends Projectile{
	constructor(x, y, range, damage, effect = null, filter = "enemy"){
		super(x, y);
		this.damage = damage;
		this.range = range;
		this.speed = 0;
		this.animationSpeed = 1;

		this.animationFrames = [];
		this.texture = null;

		this.effect = effect;

		this.timer = 0;

		dealDamageInArea(this.x, this.y, this.range, this.damage);
		if (this.effect != null) addEffectInArea(this.x, this.y, this.range, this.effect, filter);
	}
	
	update(dTime){
		if(this.timer > 3) this.die();
		this.timer += dTime;
	}

	drawSelf(){
		if(DEBUG){
			strokeWeight(1);
			stroke(color('rgba(255,0,0, 1)'));
			fill(color('rgba(255,0,0,.2)'));
			ellipse(this.x, this.y, this.range * 2 * gridScale);
		}
	}
}