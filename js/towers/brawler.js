class Brawler extends CooldownTower{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.brawler0, Art.brawler1];
		classRef.unitName = "Brawler";
		classRef.description = "Attacks incredibly fast.";
		classRef.range = 2;
		classRef.damage = 3;
		classRef.speed = 27;
		classRef.magic = 0;
		classRef.price = 100;
		classRef.maxTargets = 1;
		classRef.upgrades = [Druid, Master];
	}

	constructor(x, y){
		super(x, y);
	}

	shoot(shootTarget){
		super.shoot();

		let bonusDamage;
		let attackSprite;
		let angleOffset;

		if(Math.random() < .5){
			bonusDamage = 0;
			attackSprite = Art.fist;
			angleOffset = 0;
		}else{
			bonusDamage = 2;
			attackSprite = Art.boot;
			angleOffset = 270;
		}

		let u = getUnitVector(shootTarget.x - this.x, shootTarget.y - this.y);

		this.drawOffsetX = u.x*16;
		this.drawOffsetY = u.y*16;

		shootTarget.takeDamage(this.getDamage() + bonusDamage);
		let punchDecal = new Decal(shootTarget.x, shootTarget.y, 1);
		punchDecal.animationFrames = [attackSprite];

		punchDecal.angle = pointsToDegrees(0, 0, u.x, u.y) + angleOffset;

		punchDecal.doUpdateAngle = false;

		this.attackTypeBool = !this.attackTypeBool;
	}
}