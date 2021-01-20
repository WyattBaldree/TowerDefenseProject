class Recruit extends CooldownTower{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.recruit0, Art.recruit1];
		classRef.unitName = "Recruit";
		classRef.description = "Throws darts at enemies.";
		classRef.range = 4;
		classRef.damage = 4;
		classRef.speed = 6;
		classRef.magic = 0;
		classRef.price = 100;
		classRef.maxTargets = 1;
		classRef.upgrades = [Archer];
	}

	shoot(shootTarget){
		super.shoot();
		let projectile = new ProjectileToUnitDamage(this.getXGrid(), this.getYGrid(), shootTarget, this.getDamage());
		projectile.animationFrames = [Art.dart];
		projectile.texture = Art.dart;
		projectile.angleOffset = 225;
	}
}