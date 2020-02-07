class Player{
	constructor(startingGold = 300, startingHealth = 100){
		this.setGold(startingGold);
		this.setHealth(startingHealth);
	}

	setGold(gold){
		this.gold = gold;
		playerDisplayPanel.goldComponent.text = this.gold;
	}

	setHealth(health){
		this.health = health;
		playerDisplayPanel.healthComponent.text = this.health;
	}
}