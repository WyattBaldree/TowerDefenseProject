class Fighter extends CooldownTower{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.fighter0, Art.fighter1];
		classRef.unitName = "Fighter";
		classRef.description = "Occasionally kicks dealing extra damage.";
		classRef.range = 2;
		classRef.damage = 2;
		classRef.speed = 18;
		classRef.magic = 0;
		classRef.price = 100;
		classRef.maxTargets = 1;
		classRef.upgrades = [Brawler, Knight];
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