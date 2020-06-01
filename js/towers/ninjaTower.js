class NinjaTower extends CooldownTower{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.ninja0, Art.ninja1];
		classRef.unitName = "Ninja";
		classRef.description = "Throws shuriken from afar and uses a katana up close.";
		classRef.range = 6;
		classRef.damage = 5;
		classRef.speed = 12;
		classRef.price = 200;
		classRef.upgrades = [];
	}

	shoot(){
		super.shoot();
		let dist = getDistanceBetweenUnits(this,this.target)
		if(dist < this.getRange()*gridScale/2){
			new Explosion(this.getXGrid() + .5, this.getYGrid() + .5, this.getRange()/2, this.getDamage());
		}else{
			let projectile = new ProjectileToUnitDamage(this.getXGrid(), this.getYGrid(), this.target, this.getDamage()/2);
			projectile.animationFrames = [Art.ninjaStar0, Art.ninjaStar1];
			projectile.texture = projectile.animationFrames[0];
			projectile.doUpdateAngle = false;
			projectile.animationSpeed = .6;
			projectile.speed = 30;
		}
	}
}