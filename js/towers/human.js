class Human extends CooldownTower{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.human0, Art.human1];
		classRef.unitName = "Human";
		classRef.description = "Humans are known for their devotion and flexibility.";
		classRef.range = 2;
		classRef.damage = 2;
		classRef.speed = 9;
		classRef.magic = 0;
		classRef.price = 100;
		classRef.maxTargets = 1;
		classRef.upgrades = [Fighter, Acolyte];
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