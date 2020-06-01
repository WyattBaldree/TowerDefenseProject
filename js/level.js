//This javascript file handles loading levels that are created using the Tiled tool

let levelCollection = {}; //an object that holds all of the levels.
var selectedLevel = {};
var levelData = [];
var tilesetArt = {};
let levelNames = [];
function loadLevel(levelName){
	//let levelJson = loadJSON('levels/' + levelName + '.json');

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "levels/" + levelName + ".json", false);
	xmlhttp.send();
	let levelJson = JSON.parse(xmlhttp.responseText);


	levelCollection[levelName] = levelJson;
	levelNames.push(levelName);

	loadTilesets(levelName);
	return levelJson;
}

function buildAllLevels(){
	for(let levelName of levelNames){
		buildLevel(levelName);
		levelData.push(selectedLevel);
	}
}

function buildLevel(levelName){
	let levelJson = levelCollection[levelName];

	let levelTileLayerBottom = levelJson.layers.find(x => x.name == "BottomLayer").data;
	let levelTileLayerMiddle = levelJson.layers.find(x => x.name == "MiddleLayer").data;
	let levelTileLayerTop = levelJson.layers.find(x => x.name == "TopLayer").data;

	let levelPaths = levelJson.layers.find(x => x.name == "Paths").objects;
	let levelWaves = levelJson.layers.find(x => x.name == "Waves").objects;
	let levelSolids = levelJson.layers.find(x => x.name == "Solid").objects;
	let levelInfo = levelJson.layers.find(x => x.name == "LevelInfo").objects;
	let levelStartingTowers = levelJson.layers.find(x => x.name == "StartingTowers").objects;
	let levelPowerTiles = levelJson.layers.find(x => x.name == "PowerTiles").objects;

	let levelTileSets = levelJson.tilesets;

	selectedLevel = {};

	setLevelName(levelInfo);
	setLevelX(levelInfo);
	setLevelY(levelInfo);
	setLevelStartingGold(levelInfo);
	setSolidAreas(levelSolids);
	setPaths(levelPaths);
	setTimeline(levelWaves);
	setStartingTowers(levelStartingTowers);
	setPowerTiles(levelPowerTiles);

	setLevelCanvases(levelName);
}

function setPowerTiles(levelPowerTiles){
	selectedLevel.powerTiles = [];

	for(var i = 0 ; i < levelPowerTiles.length ; i++){

		let xx = Math.floor(levelPowerTiles[i].x/16);
		let yy = Math.floor(levelPowerTiles[i].y/16);
		let tileName = levelPowerTiles[i].name;
		selectedLevel.powerTiles[i] = {x:xx, y:yy, name:tileName};
	}
}

function setStartingTowers(levelStartingTowers){
	selectedLevel.startingTowers = [];

	for(var i = 0 ; i < levelStartingTowers.length ; i++){

		let xx = Math.floor(levelStartingTowers[i].x/16);
		let yy = Math.floor(levelStartingTowers[i].y/16);
		let towerName = levelStartingTowers[i].name;
		selectedLevel.startingTowers[i] = {x:xx, y:yy, name:towerName};
	}
}

function setSolidAreas(levelSolids){
	selectedLevel.solidArray = createArray(playAreaGridWidth, playAreaGridHeight);

	for(var i = 0 ; i < levelSolids.length ; i++){

		let x = Math.floor(levelSolids[i].x/16);
		let y = Math.floor(levelSolids[i].y/16);
		selectedLevel.solidArray[x][y] = 1;
	}

}

function setPaths(levelPaths){
	selectedLevel.paths = [];

	for(var i = 0 ; i < levelPaths.length ; i++){
		selectedLevel.paths[i] = [];
		for(var j = 0 ; j < levelPaths[i].polyline.length ; j++){
			selectedLevel.paths[i][j] = {"x":levelPaths[i].polyline[j].x/16, "y":levelPaths[i].polyline[j].y/16};
		}
	}
}

function setTimeline(levelWaves){
	selectedLevel.waves = [];
	for(var i = 0 ; i < levelWaves.length ; i++){
		selectedLevel.waves[i] = [];
		var waveText = levelWaves[i].text.text;
		var waveTextSplit = waveText.split("\n");
		for(var j = 0 ; j < waveTextSplit.length ; j++){
			var enemyInfoSplit = waveTextSplit[j].split(",");

			selectedLevel.waves[i][j] = {};
			selectedLevel.waves[i][j].time = parseInt(enemyInfoSplit[0]);
			selectedLevel.waves[i][j].enemyId = parseInt(enemyInfoSplit[1]);
			selectedLevel.waves[i][j].pathId = parseInt(enemyInfoSplit[2]);
		}
	}
}

function setLevelName(levelInfo){
	selectedLevel.name = levelInfo[2].text.text;
	selectedLevel.name = levelInfo.find(e => e.name == "LevelName").text.text;
}

function setLevelX(levelInfo){
	selectedLevel.x = parseInt(levelInfo.find(e => e.name == "MapX").text.text);
}

function setLevelY(levelInfo){
	selectedLevel.y = parseInt(levelInfo.find(e => e.name == "MapY").text.text);
}

function setLevelStartingGold(levelInfo){
	selectedLevel.startingGold = parseInt(levelInfo.find(e => e.name == "StartingGold").text.text);
}

function loadTilesets(levelName){
	loadAllTileMapsForLayer(levelName, levelCollection[levelName].layers[0])
	loadAllTileMapsForLayer(levelName, levelCollection[levelName].layers[1])
	loadAllTileMapsForLayer(levelName, levelCollection[levelName].layers[2])
}

function loadAllTileMapsForLayer(levelName, layer){
	let tiles = layer.data;
	for(let i = 0 ; i < tiles.length ; i++){
		let tilesetName = getTilesetFromNumber(levelName, tiles[i]);

		//tilesetName == null means that there is no tile in this position.
		if(tilesetName == null) continue;

		if(tilesetArt[tilesetName] == null){

			var xmlhttp = new XMLHttpRequest();
			let blah = "levels/tilesets/" + tilesetName;
			xmlhttp.open("GET", "levels/" + tilesetName, false);
			xmlhttp.send();

			let parser = new DOMParser();
			let tilesetXML = parser.parseFromString(xmlhttp.responseText,"text/xml");

			let imageTag = tilesetXML.getElementsByTagName("image")[0];
			let imageSource = imageTag.getAttribute("source");

			tilesetArt[tilesetName] = {}
			tilesetArt[tilesetName].image = loadImage("levels/" + imageSource.substring(3));
		}
	}
}

function getTilesetFromNumber(levelName, number){
	if(number == 0) return null;

	var tilesets = levelCollection[levelName].tilesets;
	for (var i = 0 ; i < tilesets.length-1 ; i++){
		if(number < tilesets[i+1].firstgid){
			return tilesets[i].source;
		}
	}

	return tilesets[tilesets.length-1].source;
}

function setLevelCanvases(levelName){
	selectedLevel.bottomCanvas = createGraphics(playAreaWidth, playAreaHeight);
	selectedLevel.middleCanvas = createGraphics(playAreaWidth, playAreaHeight);
	selectedLevel.topCanvas = createGraphics(playAreaWidth, playAreaHeight);

	drawLayerCanvas(levelName, levelCollection[levelName].layers[0], selectedLevel.bottomCanvas)
	drawLayerCanvas(levelName, levelCollection[levelName].layers[1], selectedLevel.middleCanvas)
	drawLayerCanvas(levelName, levelCollection[levelName].layers[2], selectedLevel.topCanvas)
}

function drawLayerCanvas(levelName, layer, canvas){
	let tiles = layer.data;

	let tilesets = levelCollection[levelName].tilesets;


	for(let i = 0 ; i < tiles.length ; i++){
		let tileNumber = tiles[i];
		if(tileNumber == 0) continue;

		for (var j = 0 ; j < tilesets.length ; j++){
			if(j == tilesets.length-1){
				let numberInTileset = tileNumber - tilesets[j].firstgid;
				drawToCanvas(i, tilesets[j].source, canvas, numberInTileset);
			}
			else if(tileNumber < tilesets[j+1].firstgid){
				let numberInTileset = tileNumber - tilesets[j].firstgid;
				drawToCanvas(i, tilesets[j].source, canvas, numberInTileset);
				break;
			}
		}
	}
}


function drawToCanvas(index, tileset, canvas, number){
	let sourceImage = tilesetArt[tileset].image;

	let drawx = index%playAreaGridWidth;
	let drawy = Math.floor(index/playAreaGridWidth);

	let sourceGridWidth = sourceImage.width/16;
	let sourceGridHeight = sourceImage.height/16;

	let sourcex = number%sourceGridWidth;
	let sourcey = Math.floor(number/sourceGridWidth);

	canvas.noSmooth();
	canvas.image(sourceImage, drawx*gridScale, drawy*gridScale, gridScale, gridScale, sourcex*16, sourcey*16, 16, 16);
}