class UntargetableEnemy extends Enemy{
	constructor(x,y,pathID){
		super(x,y,pathID);
		this.health = 20;
		this.armor = 0;
		this.speed = 2;
		this.moneyValue = 10;
		this.untargetable = false;
		this.targetTime = 0;
	}
	drawSelf(){
		push()
		angleMode(DEGREES)
		translate(this.x + gridScale/2 ,this.y +gridScale/2)
		rotate(this.angle);
		if(this.untargetable == true){
			tint(255, 128);
		}
		if(this.untargetable == false){
			tint(255, 255);
		}
		image(Art.zombieSoldier, -32 , -32 )
		
		pop()
	}
	takeDamage(damage){
		super.takeDamage(damage);
		this.untargetable = true;
		this.targetTime = Timeline.levelTimer + 75;
	}
	becomeTargetable(){
		if (this.untargetable == true && Timeline.levelTimer >= this.targetTime){
			this.untargetable = false;
		}
	}
	update(){
		this.becomeTargetable();
		super.update();
		
	}
}
