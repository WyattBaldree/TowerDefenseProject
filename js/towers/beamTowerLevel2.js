class BeamTowerLevel2 extends BeamTowerLevel1{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.wizard0, Art.wizard1];
		classRef.unitName = "Mage LV.2";
		classRef.description = "Beam Tower Stronger";
		classRef.range = 5;
		classRef.damage = 1;
		classRef.speed = 60;
		classRef.price = 150;
		classRef.upgrades = [];
	}
}