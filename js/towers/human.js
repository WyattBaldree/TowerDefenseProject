class Human extends CooldownTower{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.human0, Art.human1];
		classRef.unitName = "Human";
		classRef.description = "Humans are known for their devotion and flexibility.";
		classRef.range = 2;
		classRef.damage = 2;
		classRef.speed = 9;
		classRef.price = 100;
		classRef.maxTargets = 1;
		classRef.upgrades = [EarthquakeTowerLevel1];
	}

	shoot(shootTarget){
		super.shoot();

		let u = getUnitVector(shootTarget.x - this.x, shootTarget.y - this.y);

		this.drawOffsetX = u.x*10;
		this.drawOffsetY = u.y*10;

		shootTarget.takeDamage(this.getDamage());
		let punchDecal = new Decal(shootTarget.x, shootTarget.y, 1.5);
		punchDecal.animationFrames = [Art.fist];

		let a =  Math.atan2(u.y, u.x)
		punchDecal.angle = a * 180 / Math.PI;

		punchDecal.doUpdateAngle = false;
	}
}