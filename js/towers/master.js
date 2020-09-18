class Master extends CooldownTower{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.master0, Art.master1];
		classRef.unitName = "Master";
		classRef.description = "The master has harnessed the power of chi to incredible levels.";
		classRef.range = 3;
		classRef.damage = 3;
		classRef.speed = 50;
		classRef.price = 100;
		classRef.maxTargets = 1;
		classRef.upgrades = [];
	}

	shoot(shootTarget){
		super.shoot();

		let u = getUnitVector(shootTarget.x - this.x, shootTarget.y - this.y);

		this.drawOffsetX = u.x*16;
		this.drawOffsetY = u.y*16;

		shootTarget.takeDamage(this.getDamage());
		let punchDecal = new Decal(shootTarget.x, shootTarget.y, 1);
		punchDecal.animationFrames = [Art.fist];

		punchDecal.angle = pointsToDegrees(0, 0, u.x, u.y)

		punchDecal.doUpdateAngle = false;
	}
}