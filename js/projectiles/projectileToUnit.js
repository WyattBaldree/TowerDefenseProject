class ProjectileToUnit extends Projectile{
	constructor(x, y, unit){
		super(x, y);
		this.target = unit;
	}

	update(dTime){
		super.update(dTime);
		if(this.target.deleted){
			this.die();
			return;
		}
		this.moveTowardsPoint(dTime, this.target.x, this.target.y);
	}

	updateAngle(){
		if(this.target && this.doUpdateAngle){
			let a =  Math.atan2(this.target.y - this.y, this.target.x - this.x)
			this.angle = a * 180 / Math.PI;
		}
	}

	onHit(){
		super.onHit();
	}
}