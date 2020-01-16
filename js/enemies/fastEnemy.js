class FastEnemy extends Enemy{
	constructor(x,y,pathID){
		super(x,y,pathID);
		this.health = 10;
		this.armor = 0;
		this.speed = 3;
		this.moneyValue = 10;
		this.animationFrames = [Art.kobold0, Art.kobold1];
	}
	
}