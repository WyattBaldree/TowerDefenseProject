class FireElementalist extends BeamTowerLevel1{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.fireElementalist0, Art.fireElementalist1];
		classRef.unitName = "Fire Elementalist";
		classRef.description = "Ignite 2 enemies at once with beams of fire.";
		classRef.range = 6;
		classRef.damage = 1;
		classRef.speed = 30;
		classRef.price = 150;
		classRef.maxTargets = 2;
		classRef.upgrades = [FireElemental];
	}
}