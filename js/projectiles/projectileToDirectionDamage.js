class ProjectileToDirectionDamage extends ProjectileToDirection{
	constructor(x, y, direction, damage, size = 1){
		super(x, y, direction, size, "enemy");
		this.damage = damage;
	}

	onOverlap(overlappedUnit){
		super.onOverlap(overlappedUnit);
		if(this.effect != null) overlappedUnit.addEffect(new Effect(this.effect));
		overlappedUnit.takeDamage(this.damage);
	}
}