class RegularEnemy extends Enemy{
	constructor(x,y,pathID){
		super(x,y,pathID);
		this.health = 20;
		this.armor = 0;
		this.speed = 2;
		this.moneyValue = 10;
		this.texture = Art.undeadSpritePack0
	}
	drawSelf(){
		push()
		//angleMode(DEGREES)
		//translate(this.x +32 ,this.y +32)
		//rotate(this.angle);
		//image(Art.greenSoldier, -32 , -32 )
		image(this.texture, this.x, this.y, 32, 32, 0, 0, 16, 16);
		pop()
	}
}