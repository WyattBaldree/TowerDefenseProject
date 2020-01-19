class ArrowTowerLevel1 extends CooldownTower{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.noSprite0, Art.noSprite1];
		classRef.unitName = "Arrow Tower";
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