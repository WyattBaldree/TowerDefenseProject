class RegularEnemy extends Enemy{
	constructor(x,y,pathID){
		super(x,y,pathID);
		this.health = 20;
		this.armor = 0;
		this.speed = 2;
		this.moneyValue = 10;
		this.animationFrames = [Art.orc0, Art.orc1];
	}
}