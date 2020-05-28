//This javascript file handles loading levels that are created using the Tiled tool

let levelCollection = {}; //an object that holds all of the levels.
var selectedLevel = {};
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

function buildLevel(levelName){
	let levelJson = levelCollection[levelName];

	let levelTileLayerBottom = levelJson.layers[0].data;
	let levelTileLayerMiddle = levelJson.layers[1].data;
	let levelTileLayerTop = levelJson.layers[2].data;

	let levelPaths = levelJson.layers[3].objects;
	let levelWaves = levelJson.layers[4].objects;
	let levelSolids = levelJson.layers[5].objects;

	let levelTileSets = levelJson.tilesets;

	selectedLevel = {};
	setSolidAreas(levelName);
	setPaths(levelName);
	setTimeline(levelName);

	drawLevelCanvases(levelName);
}

function setSolidAreas(levelName){
	let levelSolids = levelCollection[levelName].layers[5].objects;

	selectedLevel.solidArray = createArray(playAreaGridWidth, playAreaGridHeight);

	for(var i = 0 ; i < levelSolids.length ; i++){

		let x = Math.floor(levelSolids[i].x/16);
		let y = Math.floor(levelSolids[i].y/16);
		selectedLevel.solidArray[x][y] = 1;
	}
}

function setPaths(levelName){
	let levelPaths = levelCollection[levelName].layers[3].objects;

	selectedLevel.paths = [];

	for(var i = 0 ; i < levelPaths.length ; i++){
		selectedLevel.paths[i] = [];
		for(var j = 0 ; j < levelPaths[i].polyline.length ; j++){
			selectedLevel.paths[i][j] = {"x":levelPaths[i].polyline[j].x/16, "y":levelPaths[i].polyline[j].y/16};
		}
	}
}

function setTimeline(levelName){
	let levelWaves = levelCollection[levelName].layers[4].objects;

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

function drawLevelCanvases(levelName){
	bottomCanvas.clear();
	middleCanvas.clear();
	topCanvas.clear();

	drawLayerCanvas(levelName, levelCollection[levelName].layers[0], bottomCanvas)
	drawLayerCanvas(levelName, levelCollection[levelName].layers[1], middleCanvas)
	drawLayerCanvas(levelName, levelCollection[levelName].layers[2], topCanvas)
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

function getLevelName(level){
	let levelInfo = level.layers[6].objects;

	return levelInfo[2].text.text;
}

function getLevelX(level){
	let levelInfo = level.layers[6].objects;

	return parseInt(levelInfo[1].text.text);
}

function getLevelY(level){
	let levelInfo = level.layers[6].objects;

	return parseInt(levelInfo[0].text.text);
}