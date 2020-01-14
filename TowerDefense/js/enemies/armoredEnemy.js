class ArmoredEnemy extends Enemy{
	constructor(x,y,pathID){
		super(x,y,pathID);
		this.health = 10;
		this.armor = 1;
		this.speed = 1;
		this.moneyValue = 10;
	}

}
