class IceArrow extends ProjectileToDirectionExplosion{
    constructor(x, y, direction, damage, explosionRange){
        super(x, y, direction, damage, explosionRange, 1);
        this.animationFrames = [Art.frostArrow];
        this.texture = Art.frostArrow;
        this.angleOffset = 315;
        this.drawScale = 2;
		this.effect = "frost;90;40";
    }

    onOverlap(overlappedUnit){
        super.onOverlap(overlappedUnit);
        let anim = new DeleteOnAnimEnd(this.x + gridScale/2 - this.explosionRange*gridScale, this.y + gridScale/2 - this.explosionRange*gridScale);

		anim.animationFrames = [Art.frostExplosion0, Art.frostExplosion1];
		anim.texture = anim.animationFrames[0];
		anim.animationSpeed = 1;
		anim.w = this.explosionRange*2*gridScale;
		anim.h = this.explosionRange*2*gridScale;
    }
}