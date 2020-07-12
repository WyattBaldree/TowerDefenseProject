class Dwarf extends CooldownTower{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.dwarf0, Art.dwarf1];
		classRef.unitName = "Dwarf";
		classRef.description = "Dwarves are curious beings that love fighting and gold.";
		classRef.range = 2;
		classRef.damage = 1;
		classRef.speed = 7;
		classRef.price = 100;
		classRef.maxTargets = 1;
		classRef.upgrades = [BombTowerLevel1];
	}

	constructor(x, y){
		super(x, y);
		this.attackRadius = 1.5;

		this.goldPer5 = 1;
		this.goldCounter = 0;
	}

	update(deltaTime){
		super.update(deltaTime);
		this.goldCounter += deltaTime;
		if(this.goldCounter >= 50){
			this.goldCounter = 0;
			player.setGold(player.gold + this.goldPer5);
			new GoldNumber(this.x + gridScale/2, this.y + gridScale/2, this.goldPer5);
		} 
	}

	shoot(shootTarget){
		super.shoot();

		let u = getUnitVector(shootTarget.x - this.x, shootTarget.y - this.y);

		this.drawOffsetX = u.x*16;
		this.drawOffsetY = u.y*16;

		//new Explosion(shootTarget.getXGrid() + .5, shootTarget.getYGrid() + .5, this.attackRadius, this.getDamage());

		shootTarget.takeDamage(this.getDamage());
		let punchDecal = new Decal(shootTarget.x, shootTarget.y, 1);
		punchDecal.animationFrames = [Art.fist];

		let a =  Math.atan2(u.y, u.x)
		punchDecal.angle = a * 180 / Math.PI;

		punchDecal.doUpdateAngle = false;
	}
}