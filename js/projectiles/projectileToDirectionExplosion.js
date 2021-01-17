class ProjectileToDirectionExplosion extends ProjectileToDirection{
	constructor(x, y, direction, damage, explosionRange, size = 1){
		super(x, y, direction, size, "enemy");
		this.damage = damage;
		this.explosionRange = explosionRange;
	}

	onOverlap(overlappedUnit){
		super.onOverlap(overlappedUnit);
		new Explosion(this.getXGrid() + .5, this.getYGrid() + .5, this.explosionRange, this.damage, this.effect);
	}
}