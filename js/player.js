class Player{
	constructor(startingGold){
		this.setGold(startingGold);
	}

	setGold(gold){
		this.gold = gold;
		playerDisplayPanel.goldComponent.text = this.gold;
	}
}