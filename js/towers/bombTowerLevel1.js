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
		this.bombRadius = 1.5;
	}

	shoot(){
		super.shoot();
		let projectile = new ProjectileToUnitExplosion(this.getXGrid(), this.getYGrid(), this.target, this.bombRadius, this.damage);
		projectile.animationFrames = [Art.potion];
		projectile.texture = Art.potion;
		projectile.doUpdateAngle = false;
	}
}