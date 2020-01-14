class ProjectileToUnit extends Projectile{
	constructor(x, y, unit){
		super(x, y);
		this.target = unit;
	}

	update(){
		super.update();
		if(this.target.deleted){
			this.die();
			return;
		}
		this.moveTowardsPoint(this.target.getXGridCenter(), this.target.getYGridCenter());
	}

	onHit(){
		super.onHit();
	}
}