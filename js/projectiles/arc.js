class Arc extends Projectile{
	constructor(x, y, direction, arcAngle, range, damage, effect = null, filter = "enemy"){
		super(x, y);
		this.direction = direction;
		this.arcAngle = arcAngle;
		this.range = range;
		this.damage = damage;

		this.speed = 0;
		this.animationSpeed = 1;

		this.animationFrames = [];
		this.texture = null;

		this.effect = effect;

		this.timer = 0;

		dealDamageInArc(this.x, this.y, this.direction, this.arcAngle, this.range, this.damage);
		if (this.effect != null) addEffectInArc(this.x, this.y, this.direction, this.arcAngle, this.range, this.effect, filter);
	}
	
	update(dTime){
		if(this.timer > 1) this.die();
		this.timer += dTime;
	}

	drawSelf(){
		if(DEBUG){
			strokeWeight(1);
			stroke(color('rgba(255,0,0, 1)'));
			fill(color('rgba(255,0,0,.2)'));

			let adjustRange = this.range * 2 * gridScale;
			let start = this.direction - this.arcAngle/2;
			let end = this.direction + this.arcAngle/2;
			arc(this.x, this.y, adjustRange, adjustRange, start, end, PIE);
		}
	}
}