class RegularEnemy extends Enemy{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.orc0, Art.orc1];
		classRef.unitName = "Regular Dude";
		classRef.description = "Regular dude";
		classRef.maxHealth = 15;
		classRef.armor = 0;
		classRef.speed = 5;
		classRef.damage = 1;
		classRef.moneyValue = 30;
	}
}