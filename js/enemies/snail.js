class Snail extends Enemy{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.snail0, Art.snail1];
		classRef.unitName = "Snail";
		classRef.description = "I wonder what's inside?";
		classRef.maxHealth = 70;
		classRef.armor = 1;
		classRef.speed = 4;
		classRef.damage = 1;
		classRef.moneyValue = 70;
	}

	die(){
		super.die();
		//spawn 5 - snail
		spawnInPath(6, this.pathID, this.getCurrentDistanceOfPath());
	}
}