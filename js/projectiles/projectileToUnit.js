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
		this.moveTowardsPoint(dTime, this.target.getXGridCenter(), this.target.getYGridCenter());
	}

	onHit(){
		super.onHit();
	}
}