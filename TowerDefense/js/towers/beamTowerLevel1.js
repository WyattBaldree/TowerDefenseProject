class BeamTowerLevel1 extends CooldownTower{
	constructor(x, y){
		super(x, y);
		this.range = 4;
		this.damage = 1;
		this.speed = 15;
	}

	shoot(){
		super.shoot();
		this.target.takeDamage(this.damage);
	}

	drawSelf(){
		super.drawSelf();
		if(this.target){
			strokeWeight(4);
			stroke(color('rgba(255,0,0, .7)'));
			line(this.getXGridCenter(), this.getYGridCenter(), this.target.x + gridScale/2, this.target.y + gridScale/2);
		}
	}
}