class Player{
	constructor(startingGold){
		this.setGold(startingGold);
	}

	setGold(gold){
		this.gold = gold;
		playerGoldDisplay.text = this.gold;
	}
}