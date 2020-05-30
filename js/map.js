let flagList = [];

function loadMap(){
	for(let i = 0 ; i < levelData.length ; i++){
		let name = levelData[i].name;
		let x = levelData[i].x;
		let y = levelData[i].y;
		let flag = new Flag(x*gridScale, y*gridScale, 2, name, i);
		flag.flagButton.onClickFunction = function(){
			currentlySelectedLevel = i.valueOf();
			levelSelectionPrompt.setActive(true);
			levelSelectionPrompt.titleText.text = name;
		};
		levelSelectGuiGroup.addGui(flag);
		flag.setActive(false);
		flagArray.push(flag);
	}
}

function updateFlags(){
	for(let i = 0 ; i < flagArray.length ; i++){
		if(i < levelProgress){
			flagArray[i].setActive(true);
			if(i == levelProgress - 1){
				flagArray[i].flagSprite = Art.crossedSwords;
				flagArray[i].flagSpriteHighlighted = Art.crossedSwordsHighlighted; 
				flagArray[i].flagSpriteObject.texture = flagArray[i].flagSprite;
			}
			else{
				flagArray[i].flagSprite = Art.crown;
				flagArray[i].flagSpriteHighlighted = Art.crownHighlighted; 
				flagArray[i].flagSpriteObject.texture = flagArray[i].flagSprite;
			}
		}else{
			flagArray[i].setActive(false);
		}
	}
}