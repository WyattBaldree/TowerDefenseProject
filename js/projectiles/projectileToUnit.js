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
			this.angle = pointsToDegrees(this.x, this.y, this.target.x, this.target.y)  + this.angleOffset;
		}
	}
}