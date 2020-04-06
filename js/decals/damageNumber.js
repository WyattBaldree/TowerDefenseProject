
var decalList = new Array(); // holds all projectile objects.

class DamageNumber extends DecalText{
	constructor(x, y, damage){
		super(x, y, 5);
		this.text = damage;
		this.fontColor = color("red");
		this.fontSize = 20;
		this.ysp = 30;
		this.acceleration = 12
		this.xsp = Math.random() * 10 - 5;
	}

	update(dTime){
		super.update(dTime);
		this.x += dTime * this.xsp;
		this.y -= dTime * this.ysp;
		this.ysp -= dTime * this.acceleration;
		this.fontOpacity -= dTime * 10;
	}
}