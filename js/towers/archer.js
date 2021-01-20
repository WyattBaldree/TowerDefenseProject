class Archer extends CooldownTower{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.archer0, Art.archer1];
		classRef.unitName = "Archer";
		classRef.description = "Fires arrows at distant foes.";
		classRef.range = 5;
		classRef.damage = 5;
		classRef.speed = 6;
		classRef.magic = 0;
		classRef.price = 100;
		classRef.maxTargets = 1;
		classRef.upgrades = [FrostArcher, DemonHunter];
	}

	shoot(shootTarget){
		super.shoot();
		let projectile = new ProjectileToUnitDamage(this.getXGrid(), this.getYGrid(), shootTarget, this.getDamage());
		projectile.animationFrames = [Art.arrow];
		projectile.texture = Art.arrow;
		projectile.angleOffset = 225;
	}
}