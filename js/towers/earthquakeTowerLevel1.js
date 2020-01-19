class EarthquakeTowerLevel1 extends CooldownTower{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.noSprite0, Art.noSprite1];
		classRef.unitName = "Earthquake Tower";
		classRef.description = "Earthquake Tower";
		classRef.range = 4;
		classRef.damage = 3;
		classRef.speed = 1;
		classRef.price = 100;
	}

	shoot(){
		super.shoot();
		new Explosion(this.getXGrid() + .5, this.getYGrid() + .5, this.range, this.damage);
	}
}