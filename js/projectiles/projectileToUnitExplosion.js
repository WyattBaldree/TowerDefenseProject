class ProjectileToUnitExplosion extends ProjectileToUnit{
	constructor(x, y, unit, range, damage){
		super(x, y, unit);
		this.range = range;
		this.damage = damage;
	}
	
	onHit(){
		super.onHit();
		new Explosion(this.getXGrid() + .5, this.getYGrid() + .5, this.range, this.damage, this.effect);
	}
}