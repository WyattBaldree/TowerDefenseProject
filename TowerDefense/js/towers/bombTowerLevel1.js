class BombTowerLevel1 extends CooldownTower{
	constructor(x, y){
		super(x, y);
		this.range = 3;
		this.damage = 4;
		this.speed = 3;
		this.bombRadius = 1;
	}

	shoot(){
		super.shoot();
		new ProjectileToUnitExplosion(this.getXGrid() + .5, this.getYGrid() + .5, this.target, this.bombRadius, this.damage);
	}
}