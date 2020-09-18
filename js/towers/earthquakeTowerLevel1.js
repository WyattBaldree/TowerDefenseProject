class EarthquakeTowerLevel1 extends CooldownTower{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.warrior0, Art.warrior1];
		classRef.unitName = "Warrior LV.1";
		classRef.description = "Earthquake Tower";
		classRef.range = 2.5;
		classRef.damage = 3;
		classRef.speed = 8;
		classRef.magic = 0;
		classRef.price = 100;
		classRef.maxTargets = 1;
		classRef.upgrades = [NinjaTower];
	}

	constructor(x, y){
		super(x, y);
		this.arcAngle = 70;
	}

	shoot(shootTarget){
		super.shoot(shootTarget);

		let u = getUnitVector(shootTarget.x - this.x, shootTarget.y - this.y);

		this.drawOffsetX = u.x*16;
		this.drawOffsetY = u.y*16;

		let directionToTarget = pointsToDegrees(0, 0, u.x, u.y);

		new Arc(this.getXGrid() + .5, this.getYGrid() + .5, directionToTarget, this.arcAngle, this.getRange(), this.getDamage());
	}
}