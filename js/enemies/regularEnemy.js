class RegularEnemy extends Enemy{
	constructor(x,y,pathID){
		super(x,y,pathID);
		this.health = 20;
		this.armor = 0;
		this.speed = 2;
		this.moneyValue = 10;
	}
	drawSelf(){
		push()
		angleMode(DEGREES)
		translate(this.x + gridScale/2 ,this.y +gridScale/2)
		rotate(this.angle);
		image(Art.greenSoldier, -32 , -32 )
		pop()
	}
}