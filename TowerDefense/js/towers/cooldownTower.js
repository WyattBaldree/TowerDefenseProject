class CooldownTower extends Tower{
	constructor(x, y){
		super(x, y);
		this.range = 3;
		this.damage = 5;
		this.speed = 5;
		this.target = null;

		this.debug = false;
	}

	update(){
		super.update();

		// check if our current target is still valid
		if(this.target != null){
			if( getDistanceBetweenUnits(this, this.target) > this.range * gridScale ||
				this.target.untargetable||
				this.target.deleted){
				this.target = null;
			}
		}

		// check if we need a new target and if we do get one.
		if(this.target == null){
			this.findTarget();
		}

		// if we have a target, try to shoot at it.
		if(this.target != null && this.cooldown <= 0){
			this.shoot();
		}

		this.cooldown -= this.speed;
	}

	findTarget(){
		let potentialTargets = getListOfUnitsInRange(this.x, this.y, this.range, "enemy");
		let finalTarget;
		let smallestDistanceFromGoal = Number.MAX_VALUE;
		for(let enemy of potentialTargets){
			if(enemy.untargetable) continue;
			let distanceFromEnd = enemy.getDistanceToEndOfPath();
			if(distanceFromEnd < smallestDistanceFromGoal){
				finalTarget = enemy;
				smallestDistanceFromGoal = distanceFromEnd;
			}
		}

		this.target = finalTarget;
	}

	drawSelf(){
		super.drawSelf();
	}
}