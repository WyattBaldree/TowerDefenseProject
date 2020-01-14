class ArrowTowerLevel1 extends CooldownTower{
	constructor(x, y){
		super(x, y);
		this.range = 3;
		this.damage = 4;
		this.speed = 3;
	}

	shoot(){
		super.shoot();
		new ProjectileToUnitDamage(this.getXGrid() + .5, this.getYGrid() + .5, this.target, this.damage);
	}
}