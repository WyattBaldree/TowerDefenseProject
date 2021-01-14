class ProjectileToDirection extends Projectile{
	constructor(x, y, direction, size = 1, targetType = "enemy"){
		super(x, y);
		this.direction = direction;
		this.size = size;
		this.targetType = targetType
	}

	update(dTime){
		super.update(dTime);
		
		this.moveInDirection(dTime, this.direction);
		this.checkForHits();
		this.checkForOutOfBounds();
	}

	checkForHits(){
		let hitUnits = getListOfUnitsInRange(this.x + (gridScale/2), this.y + (gridScale/2), this.size/2, this.targetType);
		if(hitUnits.length <= 0){
			return;
		}

		this.onOverlap(hitUnits[0]);
	}

	checkForOutOfBounds(){
		if(this.x < -gridScale || this.x > playAreaWidth || this.y < -gridScale || this.y > playAreaHeight){
			this.die();
		}
	}

	onOverlap(overlappedUnit){
		this.onHit()
	}

	updateAngle(){
		if(this.doUpdateAngle){
			this.angle = this.direction + this.angleOffset;
		}
	}
}