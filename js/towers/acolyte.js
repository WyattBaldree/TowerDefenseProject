class Acolyte extends CooldownTower{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.acolyte0, Art.acolyte1];
		classRef.unitName = "Acolyte";
		classRef.description = "Gives all nearby units additional attack speed.";
		classRef.range = 2.5;
		classRef.damage = 2;
		classRef.speed = 10;
		classRef.magic = 0;
		classRef.price = 100;
		classRef.maxTargets = 1;
		classRef.upgrades = [];
	}

	constructor(x, y){
		super(x, y);
		this.targetType = "tower";
	}

	shoot(shootTarget){
		super.shoot();
		let effect = "speedAura;" + this.getDamage() + ";" + 100/this.getSpeed();
		let aura = new Aura(this.getXGrid() + .5, this.getYGrid() + .5, this.getRange(), effect);
		aura.drawSelf = function(){
			strokeWeight(1);
			noStroke();
			fill(color('rgba(255, 223, 0, .125)'));
			ellipse(this.x, this.y, this.range * 2 * gridScale * sin(this.numberOfFrames/this.numberOfFramesMax*90 + 90));
		}
	}
}