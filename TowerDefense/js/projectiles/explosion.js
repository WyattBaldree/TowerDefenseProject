class Explosion extends Projectile{
	constructor(x, y, range, damage){
		super(x, y);
		this.damage = damage;
		this.range = range;
		this.speed = 0;

		this.numberOfFrames = 10;

		dealDamageInArea(this.x, this.y, this.range, this.damage);
	}
	
	update(){
		super.update();
		if(this.numberOfFrames <= 0) this.die();
		this.numberOfFrames--;
	}

	drawSelf(){
		strokeWeight(1);
		stroke(color('rgba(255,0,0, 1)'));
		fill(color('rgba(255,0,0,.2)'));
		ellipse(this.x, this.y, this.range * 2 * gridScale);
	}
}