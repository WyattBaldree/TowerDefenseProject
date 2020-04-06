
var decalList = new Array(); // holds all projectile objects.

class GoldNumber extends DecalText{
	constructor(x, y, amount){
		super(x, y, 13);
		this.text = amount;
		this.fontColor = color("yellow");
		this.fontSize = 20;
		this.ysp = 6;
		this.acceleration = 0;

		this.timeAlive = 0;
	}

	update(dTime){
		super.update(dTime);
		this.y -= dTime * this.ysp;
		this.drawOffsetX = Math.sin(this.timeAlive) * 5;
		this.ysp -= (Math.abs(this.ysp) > this.acceleration) ? dTime * this.acceleration : this.ysp;
		this.timeAlive += dTime * .7;
		this.fontOpacity -= dTime * 20;
	}
}