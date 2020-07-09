class Elf extends CooldownTower{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.elf0, Art.elf1];
		classRef.unitName = "Elf";
		classRef.description = "Elves exceed in feats of dexterity and intelligence.";
		classRef.range = 3.5;
		classRef.damage = 3;
		classRef.speed = 4;
		classRef.price = 50;
		classRef.maxTargets = 1;
		classRef.upgrades = [ArrowTowerLevel1];
	}

	shoot(shootTarget){
		super.shoot();
		let projectile = new ProjectileToUnitDamage(this.getXGrid(), this.getYGrid(), shootTarget, this.getDamage());
		projectile.speed = 30;
		projectile.animationFrames = [Art.rock];
		projectile.texture = Art.rock;
		projectile.doUpdateAngle = false;
		projectile.angleOffset = Math.random()*360;
	}
}