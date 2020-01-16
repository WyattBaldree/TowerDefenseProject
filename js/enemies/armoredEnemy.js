class ArmoredEnemy extends Enemy{
	constructor(x,y,pathID){
		super(x,y,pathID);
		this.health = 30;
		this.armor = 1;
		this.speed = 1;
		this.moneyValue = 10;
		this.animationFrames = [Art.cyclops0, Art.cyclops1];
	}
}
