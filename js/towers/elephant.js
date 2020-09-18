class Elephant extends CooldownTower{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.elephant0, Art.elephant1];
		classRef.unitName = "Elephant";
		classRef.description = "Tramples the ground with tremendous force.";
		classRef.range = 2;
		classRef.damage = 3;
		classRef.speed = 27;
		classRef.magic = 30;
		classRef.price = 0;
		classRef.maxTargets = 1;
		classRef.upgrades = [];
	}

	constructor(x, y){
		super(x, y);
		this.ability = this.devolve;
		this.attackAnimationToggle = false;
		this.attackAnimationProgress = 0.0;
	}

	devolve(){
		replaceTower(this, Druid, true);
	}

	updateOffset(dTime){
		if(!this.targets[0]){
			this.attackAnimationProgress = 0;
		}else{
			this.attackAnimationProgress += dTime*.4;
		}
		

		if(this.attackAnimationProgress > 1.0){
			this.attackAnimationProgress -= 1.0;
			this.attackAnimationToggle = !this.attackAnimationToggle;
		}

		let attackAnimation = Math.sin(this.attackAnimationProgress * Math.PI);

		this.drawOffsetY = attackAnimation * -4;
		if(this.attackAnimationToggle){
			this.drawOffsetX = attackAnimation * -4;
			this.angle = attackAnimation * -15;
		}else{
			this.drawOffsetX = attackAnimation * 4;
			this.angle = attackAnimation * 15;
		}
	}

	shoot(shootTarget){
		super.shoot();

		new Explosion(this.getXGrid() + .5, this.getYGrid() + .5, this.getRange(), this.getDamage());
	}
}