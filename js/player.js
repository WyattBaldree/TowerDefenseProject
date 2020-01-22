class Player{
	constructor(startingGold){
		this.gold = startingGold;
	}

	setGold(gold){
		this.gold = gold;
		playerGoldDisplay.text = this.gold;
	}
}