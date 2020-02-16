class EarthquakeTowerLevel1 extends CooldownTower{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.warrior0, Art.warrior1];
		classRef.unitName = "Warrior LV.1";
		classRef.description = "Earthquake Tower";
		classRef.range = 2;
		classRef.damage = 3;
		classRef.speed = 8;
		classRef.price = 100;
		classRef.upgrades = [];
	}

	shoot(){
		super.shoot();
		new Explosion(this.getXGrid() + .5, this.getYGrid() + .5, this.range, this.damage);
	}
}