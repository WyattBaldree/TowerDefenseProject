class ProjectileToUnitDamage extends ProjectileToUnit{
	constructor(x, y, unit, damage){
		super(x, y, unit);
		this.damage = damage;
	}
	
	onHit(){
		super.onHit();
		if(this.effect != null) this.target.addEffect(new Effect(this.effect));
		this.target.takeDamage(this.damage);
	}
}