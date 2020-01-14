class ProjectileToUnitDamage extends ProjectileToUnit{
	constructor(x, y, unit, damage){
		super(x, y, unit);
		this.damage = damage;
	}
	
	onHit(){
		super.onHit();
		this.target.takeDamage(this.damage);
	}
}