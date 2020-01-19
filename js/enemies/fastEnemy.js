class FastEnemy extends Enemy{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.kobold0, Art.kobold1];
		classRef.unitName = "Fast Dude";
		classRef.description = "Fast dude";
		classRef.maxHealth = 10;
		classRef.armor = 0;
		classRef.speed = 3;
		classRef.damage = 1;
		classRef.moneyValue = 10;
	}	
}