class ArmoredEnemy extends Enemy{
	constructor(x,y,pathID){
		super(x,y,pathID);
		this.health = 30;
		this.armor = 1;
		this.speed = 1;
		this.moneyValue = 10;
	}
	drawSelf(){
		push()
		angleMode(DEGREES)
		translate(this.x + gridScale/2 ,this.y +gridScale/2)
		rotate(this.angle);
		image(Art.graySoldier, -32 , -32 )
		pop()
	}
}
