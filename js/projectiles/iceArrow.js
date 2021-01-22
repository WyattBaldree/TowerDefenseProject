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

		anim.animationFrames = [Art.explosion0, Art.explosion1, Art.explosion2, Art.explosion3, Art.explosion4, Art.explosion5];
		anim.texture = anim.animationFrames[0];
		anim.animationSpeed = 1.5;
		anim.w = this.explosionRange*2*gridScale;
		anim.h = this.explosionRange*2*gridScale;
    }
}