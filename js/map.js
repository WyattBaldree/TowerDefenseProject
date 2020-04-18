let flagList = [];

/*class Flag extends AdvancedDraw{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.crossedSwords];
	}

	constructor(x, y, level){
		super(x, y);
		this.level = level;
		this.animationSpeed = 0;
		this.texture = Art.crossedSwords;
	}
}

function loadMap(){
	flagList = {};

	let flag = new Flag(200, 200);
	flagList.push(flag);
}

function drawMap(){
	image(Art.map, 0, 0);

	for(var flag of flagList){
		flag.drawSelf();
	}
}*/

function loadMap(){
	for(let i = flagArray.length -1 ; i >=0 ; i--){
			guiList.splice(guiList.indexOf(flagArray[i]), 1);
			levelSelectGuiGroup.splice(levelSelectGuiGroup.indexOf(flagArray[i]), 1);
			flagArray.splice(i, 1);
	}


	for(let i = 0 ; i < Object.keys(levelCollection).length ; i++){
		let name = getLevelName(Object.values(levelCollection)[i]);
		let x = getLevelX(Object.values(levelCollection)[i]);
		let y = getLevelY(Object.values(levelCollection)[i]);
		let flag = new Flag(x*gridScale, y*gridScale, 2, name, i);
		flagArray.push(flag);
	}

	for(let i = 0 ; i < flagArray.length ; i++){
		if(i < levelProgress){
			flagArray[i].setActive(true);
		}else{
			flagArray[i].setActive(false);
		}
	}
}