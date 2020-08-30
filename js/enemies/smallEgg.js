class SmallEgg extends Enemy{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.eggSmall0, Art.eggSmall1];
		classRef.unitName = "Small Egg";
		classRef.description = "I wonder what's inside?";
		classRef.maxHealth = 30;
		classRef.armor = 0;
		classRef.speed = 4;
		classRef.damage = 1;
		classRef.moneyValue = 5;
	}

	die(){
		super.die();
		//spawn 5 - snail
		spawnInPath(Snail, this.pathID, this.getCurrentDistanceOfPath());
	}
}