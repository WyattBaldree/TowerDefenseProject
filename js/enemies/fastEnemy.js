class FastEnemy extends Enemy{
	constructor(x,y,pathID){
		super(x,y,pathID);
		this.health = 10;
		this.armor = 0;
		this.speed = 3;
		this.moneyValue = 10;
	}
	drawSelf(){
		push()
		angleMode(DEGREES)
		translate(this.x + gridScale/2 ,this.y +gridScale/2)
		rotate(this.angle);
		image(Art.brownSoldier, -32 , -32 )
		pop()
	}
}