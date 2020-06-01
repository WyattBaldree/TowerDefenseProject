class FireElemental extends BeamTowerLevel1{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.fireElemental0, Art.fireElemental1];
		classRef.unitName = "Fire Elemental";
		classRef.description = "3 deadly fire beams destroy your foes.";
		classRef.range = 5;
		classRef.damage = 2;
		classRef.speed = 30;
		classRef.price = 150;
		classRef.maxTargets = 3;
		classRef.upgrades = [];
	}

	shoot(shootTarget){
		super.shoot(shootTarget);
		let explosion = new Explosion(shootTarget.getXGrid() + .5, shootTarget.getYGrid() + .5, 2, this.getDamage());
		explosion.numberOfFrames = 1;
	}
}