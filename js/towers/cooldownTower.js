class CooldownTower extends Tower{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.noSprite0, Art.noSprite1];
		classRef.unitName = "Cooldown Tower";
		classRef.description = "Default cooldown tower class";
		classRef.range = 3;
		classRef.damage = 5;
		classRef.speed = 10;
		classRef.price = 100;
	}

	constructor(x, y){
		super(x, y);
		this.target = null;
	}

	update(dTime){
		super.update(dTime);

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
		else{
			if(this.target.x > this.x){
				this.flipX = 1;
			}
			else{
				this.flipX = 0;
			}
		}

		// if we have a target, try to shoot at it.
		if(this.target != null && this.cooldown <= 0){
			this.shoot();
		}

		if(this.cooldown > 0) this.cooldown -= this.speed*dTime;
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
}