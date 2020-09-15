class Elephant extends CooldownTower{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.elephant0, Art.elephant1];
		classRef.unitName = "Elephant";
		classRef.description = "Tramples the ground with tremendous force.";
		classRef.range = 2;
		classRef.damage = 3;
		classRef.speed = 27;
		classRef.price = 0;
		classRef.maxTargets = 1;
		classRef.upgrades = [];
	}

	constructor(x, y){
		super(x, y);
		this.ability = this.devolve;
	}

	devolve(){
		replaceTower(this, Druid, true);
	}

	shoot(shootTarget){
		super.shoot();

		this.drawOffsetY = -.5*16;

		new Explosion(this.getXGrid() + .5, this.getYGrid() + .5, this.getRange(), this.getDamage());
	}
}