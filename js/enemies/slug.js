class Slug extends Enemy{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.slug0, Art.slug1];
		classRef.unitName = "Slug";
		classRef.description = "Watch out! Slugs are as fast as they are slimy.";
		classRef.maxHealth = 30;
		classRef.armor = 0;
		classRef.speed = 8;
		classRef.damage = 1;
		classRef.moneyValue = 10;
	}
}