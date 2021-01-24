class DemonHunter extends CooldownTower{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.demonHunter0, Art.demonHunter1];
		classRef.unitName = "Demon Hunter";
		classRef.description = "This unit fires mutiple bolts with its multi-crossbow.";
		classRef.range = 6;
		classRef.damage = 8;
		classRef.speed = 5;
		classRef.magic = 200;
		classRef.price = 150;
		classRef.maxTargets = 1;
		classRef.upgrades = [];
	}

	constructor(x, y){
		super(x, y)
		this.ability = function(){
			for(let i = 0 ; i < 360; i += 20){

				let projectile = new ProjectileToDirectionDamage(this.getXGrid(), this.getYGrid(), i, this.getDamage());
				projectile.animationFrames = [Art.bolt];
				projectile.texture = Art.bolt;
				projectile.angleOffset = 45;
				projectile.maxRange = this.getRange();
			}
		}
		
		this.extraArrowAngle = 22.5;
	}

	shoot(shootTarget){
		super.shoot();
		let projectile = new ProjectileToUnitDamage(this.getXGrid(), this.getYGrid(), shootTarget, this.getDamage());
		projectile.animationFrames = [Art.bolt];
		projectile.texture = Art.bolt;
		projectile.angleOffset = 45;

		let leftProjectile = new ProjectileToDirectionDamage(this.getXGrid(), this.getYGrid(), getDegreesToOtherUnit(this, shootTarget) + this.extraArrowAngle, this.getDamage());
		leftProjectile.animationFrames = [Art.bolt];
		leftProjectile.texture = Art.bolt;
		leftProjectile.angleOffset = 45;
		leftProjectile.maxRange = this.getRange();

		let rightProjectile = new ProjectileToDirectionDamage(this.getXGrid(), this.getYGrid(), getDegreesToOtherUnit(this, shootTarget) - this.extraArrowAngle, this.getDamage());
		rightProjectile.animationFrames = [Art.bolt];
		rightProjectile.texture = Art.bolt;
		rightProjectile.angleOffset = 45;
		rightProjectile.maxRange = this.getRange();
	}
}