class FrostElementalist extends Wizard{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.frostElementalist0, Art.frostElementalist1];
		classRef.unitName = "Frost Elementalist";
		classRef.description = "WIP";
		classRef.range = 5;
		classRef.damage = 1;
		classRef.speed = 60;
		classRef.magic = 0;
		classRef.price = 150;
		classRef.maxTargets = 1;
		classRef.upgrades = [];
	}
}