class ArrowTowerLevel1 extends CooldownTower{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.archer0, Art.archer1];
		classRef.unitName = "Archer LV.1";
		classRef.description = "Arrow tower";
		classRef.range = 3;
		classRef.damage = 4;
		classRef.speed = 3;
		classRef.price = 100;
	}

	shoot(){
		super.shoot();
		new ProjectileToUnitDamage(this.getXGrid() + .5, this.getYGrid() + .5, this.target, this.damage);
	}
}