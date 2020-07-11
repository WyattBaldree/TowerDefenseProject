class Dwarf extends CooldownTower{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.dwarf0, Art.dwarf1];
		classRef.unitName = "Dwarf";
		classRef.description = "Dwarves are fond of drink and industry.";
		classRef.range = 2;
		classRef.damage = 2;
		classRef.speed = 9;
		classRef.price = 100;
		classRef.maxTargets = 1;
		classRef.upgrades = [BombTowerLevel1];
	}

	constructor(x, y){
		super(x, y);
		this.attackRadius = 1.5;
	}

	shoot(shootTarget){
		super.shoot();

		let u = getUnitVector(shootTarget.x - this.x, shootTarget.y - this.y);

		this.drawOffsetX = u.x*16;
		this.drawOffsetY = u.y*16;

		new Explosion(shootTarget.x + .5, shootTarget.y + .5, this.attackRadius, this.getDamage());
	}
}