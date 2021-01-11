class Engineer extends CooldownTower{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.engineer0, Art.engineer1];
		classRef.unitName = "Engineer";
		classRef.description = "Lobs area-of-effect bombs at enemies.";
		classRef.range = 3;
		classRef.damage = 4;
		classRef.speed = 6;
		classRef.magic = 0;
		classRef.price = 100;
		classRef.maxTargets = 1;
		classRef.upgrades = [Acolyte];
	}

	constructor(x, y){
		super(x, y);
		this.bombRadius = 1.5;
	}

	shoot(shootTarget){
		super.shoot();
		let projectile = new ProjectileToUnitExplosion(this.getXGrid(), this.getYGrid(), shootTarget, this.bombRadius, this.getDamage());
		projectile.animationFrames = [Art.potion];
		projectile.texture = Art.potion;
		projectile.doUpdateAngle = false;
	}
}