class Rabbit extends Enemy{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.rabbit0, Art.rabbit1];
		classRef.unitName = "Rabbit";
		classRef.description = "A cute rabbit.";
		classRef.maxHealth = 3;
		classRef.armor = 0;
		classRef.speed = 12;
		classRef.damage = 1;
		classRef.moneyValue = 15;
	}	
}