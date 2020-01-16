class UntargetableEnemy extends Enemy{
	constructor(x,y,pathID){
		super(x,y,pathID);
		this.health = 20;
		this.armor = 0;
		this.speed = 2;
		this.moneyValue = 10;
		this.animationFrames = [Art.ghost0, Art.ghost1];
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
