class ArmoredEnemy extends Enemy{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.cyclops0, Art.cyclops1];
		classRef.unitName = "Armored Dude";
		classRef.description = "Armored dude";
		classRef.maxHealth = 30;
		classRef.armor = 1;
		classRef.speed = 3;
		classRef.damage = 1;
		classRef.moneyValue = 10;
	}
}