class Acolyte extends CooldownTower{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.acolyte0, Art.acolyte1];
		classRef.unitName = "Acolyte";
		classRef.description = "Gives all nearby units additional attack speed.";
		classRef.range = 2.5;
		classRef.damage = 2;
		classRef.speed = 10;
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
		new Aura(this.getXGrid() + .5, this.getYGrid() + .5, this.getRange(), effect);
	}
}