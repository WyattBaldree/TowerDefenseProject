class FrostArcher extends CooldownTower{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.frostArcher0, Art.frostArcher1];
		classRef.unitName = "Frost Archer";
		classRef.description = "This unit launches frost arrows at enemy units, slowing and damaging them.";
		classRef.range = 5;
		classRef.damage = 5;
		classRef.speed = 7;
		classRef.magic = 0;
		classRef.price = 150;
		classRef.maxTargets = 1;
		classRef.upgrades = [];
	}

	shoot(shootTarget){
		super.shoot();
		let projectile = new ProjectileToUnitDamage(this.getXGrid(), this.getYGrid(), shootTarget, this.getDamage());
		projectile.animationFrames = [Art.frostArrow];
		projectile.texture = Art.frostArrow;
		projectile.angleOffset = 315;
		projectile.effect = "frost;40;30";
	}
}