class DemonHunter extends CooldownTower{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.demonHunter0, Art.demonHunter1];
		classRef.unitName = "Demon Hunter";
		classRef.description = "This unit stuns enemies with its powerful crossbow.";
		classRef.range = 6;
		classRef.damage = 8;
		classRef.speed = 5;
		classRef.magic = 0;
		classRef.price = 150;
		classRef.maxTargets = 1;
		classRef.upgrades = [];
	}

	shoot(shootTarget){
		super.shoot();
		let projectile = new ProjectileToUnitDamage(this.getXGrid(), this.getYGrid(), shootTarget, this.getDamage());
		projectile.animationFrames = [Art.bolt];
		projectile.texture = Art.bolt;
		projectile.angleOffset = 45;
		projectile.effect = "stun;1;20";
	}
}