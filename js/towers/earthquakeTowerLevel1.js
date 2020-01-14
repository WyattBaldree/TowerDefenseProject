class EarthquakeTowerLevel1 extends CooldownTower{
	constructor(x, y){
		super(x, y);
		this.range = 4;
		this.damage = 3;
		this.speed = 1;
	}

	shoot(){
		super.shoot();
		new Explosion(this.getXGrid() + .5, this.getYGrid() + .5, this.range, this.damage);
	}
}