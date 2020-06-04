class Player{
	constructor(startingGold = 300, startingHealth = 5){
		this.setGold(startingGold);
		this.setHealth(startingHealth);
	}

	setGold(gold){
		this.gold = gold;
		playerDisplayPanel.goldComponent.setText(this.gold);
	}

	setHealth(health){
		this.health = health;
		playerDisplayPanel.healthComponent.setText(this.health);
		if (this.health <= 0) loseLevel();
	}
}