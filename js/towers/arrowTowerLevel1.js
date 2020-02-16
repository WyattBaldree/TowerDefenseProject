class ArrowTowerLevel1 extends CooldownTower{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.archer0, Art.archer1];
		classRef.unitName = "Archer LV.1";
		classRef.description = "This is an arrow tower. This tower has average shooting speed, average damage, and average range. In fact, this tower is all around average. This is an arrow tower. This tower has average shooting speed, average damage, and average range. In fact, this tower is all around average.";
		classRef.range = 3;
		classRef.damage = 4;
		classRef.speed = 6;
		classRef.price = 100;
		classRef.upgrades = [];
	}

	shoot(){
		super.shoot();
		new ProjectileToUnitDamage(this.getXGrid() + .5, this.getYGrid() + .5, this.target, this.damage);
	}
}