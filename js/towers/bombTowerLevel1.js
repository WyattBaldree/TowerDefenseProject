class BombTowerLevel1 extends CooldownTower{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.engineer0, Art.engineer1];
		classRef.unitName = "Engineer LV.1";
		classRef.description = "Bomb Tower";
		classRef.range = 3;
		classRef.damage = 4;
		classRef.speed = 6;
		classRef.price = 100;
		classRef.upgrades = [];
	}

	constructor(x, y){
		super(x, y);
		this.bombRadius = 1;
	}

	shoot(){
		super.shoot();
		new ProjectileToUnitExplosion(this.getXGrid() + .5, this.getYGrid() + .5, this.target, this.bombRadius, this.damage);
	}
}