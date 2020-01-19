class UntargetableEnemy extends Enemy{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.ghost0, Art.ghost1];
		classRef.unitName = "Untargetable Dude";
		classRef.description = "Untargetable dude";
		classRef.maxHealth = 20;
		classRef.armor = 0;
		classRef.speed = 2;
		classRef.damage = 1;
		classRef.moneyValue = 10;
	}	
	constructor(x,y,pathID){
		super(x,y,pathID);
		this.untargetable = false;
		this.untargetableTimeCurrent = 0;
		this.untargetableTime = 75;
	}

	takeDamage(damage){
		super.takeDamage(damage);
		this.untargetable = true;
		this.untargetableTimeCurrent = this.untargetableTime;
	}

	becomeTargetable(){
		this.untargetableTimeCurrent--;
		if (this.untargetable == true && this.untargetableTimeCurrent <= 0){
			this.untargetable = false;
		}
	}

	update(){
		this.becomeTargetable();

		if(this.untargetable == true){
			this.opacity = 128;
		}
		else{
			this.opacity = 255;
		}

		super.update();
	}
}
