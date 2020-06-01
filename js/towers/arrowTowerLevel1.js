class ArrowTowerLevel1 extends CooldownTower{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.archer0, Art.archer1];
		classRef.unitName = "Archer LV.1";
		classRef.description = "This is an arrow tower. This tower has average shooting speed, average damage, and average range. In fact, this tower is all around average. This is an arrow tower. This tower has average shooting speed, average damage, and average range. In fact, this tower is all around average.";
		classRef.range = 4;
		classRef.damage = 4;
		classRef.speed = 6;
		classRef.price = 100;
		classRef.upgrades = [FrostArcher];
	}

	shoot(){
		super.shoot();
		let projectile = new ProjectileToUnitDamage(this.getXGrid(), this.getYGrid(), this.target, this.getDamage());
		projectile.animationFrames = [Art.arrow];
		projectile.texture = Art.arrow;
		projectile.angleOffset = 225;
	}
}