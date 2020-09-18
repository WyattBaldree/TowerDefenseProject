class CooldownTower extends Tower{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.noSprite0, Art.noSprite1];
		classRef.unitName = "Cooldown Tower";
		classRef.description = "Default cooldown tower class";
		classRef.range = 3;
		classRef.damage = 5;
		classRef.speed = 10;
		classRef.magic = 0;
		classRef.price = 100;
		classRef.maxTargets = 1;
		classRef.upgrades = [];
	}

	constructor(x, y){
		super(x, y);
		this.targets = [];
	}

	update(dTime){
		super.update(dTime);

		let hasShot = false;

		// check if our current target is still valid
		for(let i = 0; i < this.getBaseMaxTargets() ; i++){

			if(this.targets[i] != null){
				if( getDistanceBetweenUnits(this, this.targets[i]) > this.getRange() * gridScale ||
				this.targets[i].untargetable||
				this.targets[i].deleted){
					this.targets[i] = null;
				}
			}

			// check if we need a new target and if we do get one.
			if(this.targets[i] == null){
				this.targets[i] = this.findTarget();
			}
			else{
				if(this.targets[i].x > this.x){
					this.flipX = 1;
				}
				else{
					this.flipX = 0;
				}
			}

			// if we have a target, try to shoot at it.
			if(this.targets[i] != null && this.cooldown <= 0){
				this.shoot(this.targets[i]);
				hasShot = true;
			}
		}

		if(hasShot && this.cooldown <= 0){
			this.cooldown += 100;
		}

		if(this.cooldown > 0) this.cooldown -= this.getSpeed()*dTime;
	}

	findTarget(){

		let range = this.getRange();
		let potentialTargets = getListOfUnitsInRange(this.x  + (gridScale/2), this.y + (gridScale/2), range, this.targetType);
		let finalTarget;
		let smallestDistanceFromGoal = Number.MAX_VALUE;
		for(let unit of potentialTargets){
			if(this.targets.find(e => e == unit)) continue;

			if(this.targetType == "enemy"){
				if(unit.untargetable) continue;
				let distanceFromEnd = unit.getDistanceToEndOfPath();
				if(distanceFromEnd < smallestDistanceFromGoal){
					finalTarget = unit;
					smallestDistanceFromGoal = distanceFromEnd;
				}
			}
			else if(this.targetType == "tower"){
				finalTarget = unit;
				break;
			}
		}

		return finalTarget;
	}
}