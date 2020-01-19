var gridScale = 30;
var screenWidth = 960;
var screenHeight = 540;
var playAreaWidth = 660;
var playAreaHeight = 540;
var playAreaGridWidth = playAreaWidth/gridScale;
var playAreaGridHeight = playAreaHeight/gridScale;

var FPS = 60;


var currentLevel;

var player = new Player(1000);

var selectedUnit = null;

var mouseGridX;
var mouseGridY;

let levelArray = new Array();

let gameState = 0; //0 - main menu, 1 - level select, 2 - inGame;
let levelPlay = false; //Is the level currently playing or paused.
let controlMode = 0; //How we are currently controlling the game. 0 - normal, 1 - placing tower
let placeTowerID = 0; // Which tower we are currently trying to place.

let fontKenny;
let fontKennyThin;

// load all artwork and json data before the game begins.
function preload(){
	levelArray.push(loadJSON('json/level1.json'));
	levelArray.push(loadJSON('json/level2.json'));
	currentLevel = levelArray[0];

	fontKenny = loadFont('font/kenvector_future.ttf');
	fontKennyThin = loadFont('font/kenvector_future_thin.ttf');

	Art.loadArt();
}

// setup the game
function setup() {

	towerArray = createArray(playAreaGridWidth, playAreaGridHeight);


	frameRate = 60;
	createCanvas(screenWidth, screenHeight);
	noFill();

	//Initialize all unit classes
	Unit.initializeClass();
	Enemy.initializeClass();
	FastEnemy.initializeClass();
	RegularEnemy.initializeClass();
	ArmoredEnemy.initializeClass();
	UntargetableEnemy.initializeClass();
	Tower.initializeClass();
	CooldownTower.initializeClass();
	ArrowTowerLevel1.initializeClass();
	BeamTowerLevel1.initializeClass();
	BombTowerLevel1.initializeClass();
	EarthquakeTowerLevel1.initializeClass();

	makeMainMenu();
	makeLevelSelectMenu();
	makeLevelGUI();
	setGameState(0);
	//SpawnEnemy(1, 1, 100);
}

// This is our main loop.
function draw() {
	
	updateStep();
	cleanUp();
	drawStep();
	//debugCoordinates();
}

// Update the game state in this loop.
function updateStep(){
	//Get the mouse coordinates in the grid.

	mouseGridX = getSelectionSquareX();
	mouseGridY = getSelectionSquareY();

	if(levelPlay){
		Timeline.advanceTimeline();

		for(var u of unitList){
			if(u.deleted) continue;
	  		u.update();
		}
	}

	for(let gui of guiList){
  		if(!gui.active) continue;
  		if(mouseX >= gui.x && mouseX < gui.x + gui.w && mouseY >= gui.y && mouseY < gui.y + gui.h){
  			if(!gui.hovered) gui.beginHover();
  		}
  		else{
  			if(gui.hovered) gui.endHover();
  		}
  	}
}

// Draw everything in the game here.
function drawStep(){
	//rotate(0);
	stroke(color('black'));
	fill(color('lightBlue'));
	
	background(200);
	strokeWeight(2);

	drawGrid(0, 0, playAreaWidth, playAreaHeight);

	for(var u of unitList){
  		u.drawSelf();
	}

	switch(controlMode){
		case 0:
			if(selectedUnit != null){
				selectedUnit.drawSelected();
			}

			//Do stuff based off of the position of the mouse in the grid only if the mouse is in the grid.
			if(mouseGridX != -1 && mouseGridY != -1){
				let hoveredTower = towerArray[mouseGridX][mouseGridY];
				if(hoveredTower != null){
					if(hoveredTower != selectedUnit){
						hoveredTower.drawHovered();
					}
				}
			}
			Path.draw();
			break;
		case 1:
			drawTowerPlacementGrid();
			break;
	}
	noStroke();
	fill(color('rgba(255, 127, 0, .5)'));
	drawSelectionSquare();

	for(var gui of guiList){
  		gui.drawSelf();
	}
}

// This function deletes all units that have been marked for deletion.
function cleanUp(){
	for(var u of toBeRemovedList){
  		u.removeFromGame();
	}
	// everything has been removed so now we remove the last reference to those items.
	toBeRemovedList = new Array();
}

// Begin the currently selected level.
function startLevel(){
	levelPlay = true;
	Timeline.currentSpawn = 0
	Timeline.levelTimer = 0;

	for(var u of unitList){
		if(u.deleted) continue;
  		u.markForRemoval();
	}

	new ArrowTowerLevel1(6, 7);

	new ArrowTowerLevel1(6, 13);

	new BombTowerLevel1(12, 7);

	new BombTowerLevel1(12, 13);
}

// End the level we are currently on.
function endLevel(){
	levelPlay = false;

	for(var u of unitList){
		if(u.deleted) continue;
  		u.markForRemoval();
	}
}

// Set the game state. The options are currently 0: main menu; 1: level select; 2: in game.
function setGameState(state){
	closeMainMenu();
	closeLevelSelectMenu();
	closeLevelGUI();
	switch(state){
		case 0:
			endLevel();
			openMainMenu();
			gameState = 0;
			break;
		case 1:
			endLevel();
			openLevelSelectMenu();
			gameState = 1;
			break;
		case 2:
			startLevel();
			openLeveLGUI();
			gameState = 2;
			break;
	}
}

function mousePressed(event) {
  	console.log(event);

  	for(let gui of guiList){
  		if(!gui.active) continue;
  		if(mouseX >= gui.x && mouseX < gui.x + gui.w && mouseY >= gui.y && mouseY < gui.y + gui.h){
  			if (gui.press()) break;
  		}
  	}

  	switch(controlMode){
  		case 0:
  			//Do stuff based off of the position of the mouse in the grid only if the mouse is in the grid.
			if(mouseGridX != -1 && mouseGridY != -1){
				let hoveredTower = towerArray[mouseGridX][mouseGridY];
				// When we click a grid space with a tower, selectedUnit is set to that tower. Else selectedUnit becomes null;
				if(hoveredTower != null){
					selectedUnit = hoveredTower;
				}
				else{
					selectedUnit = null;
				}
			}
  			break;
  		case 1:
  			if(mouseGridX != -1 && mouseGridY != -1){
				let hoveredTower = towerArray[mouseGridX][mouseGridY];
				// When we click a grid space with a tower, selectedUnit is set to that tower. Else selectedUnit becomes null;
				if(hoveredTower != null){
					controlMode = 0;
				}
				else{
					placeTower(mouseGridX, mouseGridY, placeTowerID);
				}
			}
  			break;
  	}
}

function mouseReleased(event) {
  	console.log(event);

  	for(let gui of guiList){
  		if(!gui.active) continue;
  		if(mouseX >= gui.x && mouseX < gui.x + gui.w && mouseY >= gui.y && mouseY < gui.y + gui.h){
  			gui.release();
  		}
  	}
}

function getSelectionSquareX(){
	retX = (mouseX - (mouseX % gridScale))/gridScale;
	if(retX < 0 || retX >= playAreaGridWidth) retX = -1;
	return retX;
}

function getSelectionSquareY(){
	retY = (mouseY - (mouseY % gridScale))/gridScale;
	if(retY < 0 || retY >= playAreaGridWidth) retY = -1;
	return retY;
}

function drawGrid(x, y, gridWidth, gridHeight){
	for(let i = 0 ; i <= gridWidth/gridScale ; i++){
		line(x + i * gridScale, y, x + i * gridScale, y + gridHeight);
	}
	for(let i = 0 ; i <= gridHeight/gridScale ; i++){
		line(x, y + i * gridScale, x + gridWidth, y + i * gridScale);		
	}
}

function drawFilledGridSpace(x, y){
	rect(x * gridScale, y * gridScale, gridScale, gridScale);
}

function drawSelectionSquare(){
	let x = getSelectionSquareX();
	let y = getSelectionSquareY();

	drawFilledGridSpace(x, y);
}

function drawTowerPlacementGrid(){
	for(let i = 0 ; i < playAreaGridWidth ; i++){
		for(let j = 0 ; j < playAreaGridHeight ; j++){
			if(canPlaceTowerHere(i, j)){
				fill(color('rgba(0, 255, 0, .6)'));
			}
			else{
				fill(color('rgba(255, 0, 0, .6)'));
			}
			drawFilledGridSpace(i, j);
		}
	}
}

function canPlaceTowerHere(x, y){
	return (towerArray[x][y] == null); 
}

function spawn(_enemyID, _pathID){
	let startPathX = Path.getX(_pathID,0);
	let startPathY = Path.getY(_pathID,0);

	let enemy;
	switch(_enemyID) {
		case 0:
		    enemy = new RegularEnemy(startPathX,startPathY,_pathID)
		    break;
		case 1:
		    enemy = new ArmoredEnemy(startPathX,startPathY,_pathID)
			break;
		case 2:
		    enemy = new FastEnemy(startPathX,startPathY,_pathID)
			break;
		case 3:
		    enemy = new UntargetableEnemy(startPathX,startPathY,_pathID)
			break;
		default:
		    // code block
	} 
	return enemy;
}

function spawnInPath(_enemyID, _pathID, pathprogress){
	let enemy = spawn(_enemyID, _pathID);
	enemy.move(pathprogress);

	/*//convert this.currentDistanceOnPath to x and y coordinate
	//find the the 2 closest nodes by the distance
	//subtract the xs and ys and mult by distance
	//add that number to x and y of past node
	let distance = pathprogress;
	let nodeProgress = 0;
	let nodeLength = 0;
	for(let i = 0; i < Path.length(pathID) - 1; i++){
			let deltaX = Path.getX(pathID, i + 1) * gridScale - Path.getX(pathID, i) * gridScale;
			let deltaY = Path.getY(pathID, i + 1) * gridScale - Path.getY(pathID, i) * gridScale;
			let currentNodeLength = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));
			
			distance -= currentNodeLength;
			if (Math.sign(distance) <= 0){ 
				nodeProgress = i;
				distance += currentNodeLength;
				break;
			}

		}
	//distance between two nodes
	let deltaX = Path.getX(pathID, nodeProgress + 1) * gridScale - Path.getX(pathID, nodeProgress) * gridScale;
	let deltaY = Path.getY(pathID, nodeProgress + 1) * gridScale - Path.getY(pathID, nodeProgress) * gridScale;

	let totalDistanceBetweenNodes = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));
	let distanceRatio = distance/totalDistanceBetweenNodes

	let X =  (Path.getX(pathID, nodeProgress + 1)  - Path.getX(pathID, nodeProgress) ) * distanceRatio + Path.getX(pathID, nodeProgress) ;
	let Y =  (Path.getY(pathID, nodeProgress + 1)  - Path.getY(pathID, nodeProgress) ) * distanceRatio + Path.getY(pathID, nodeProgress) ;

	new Enemy(X, Y, pathID);*/
	
}

function placeTower(x, y, towerId){
	let cost = 9999;
	let towerFunction = null; 
	switch(towerId){
		case 0:
			cost = 100;
			towerFunction = function(){new ArrowTowerLevel1(x, y)}; 
			break;
		case 1:
			cost = 150;
			towerFunction = function(){new BeamTowerLevel1(x, y)}; 
			break;
	}

	if(player.money >= cost && canPlaceTowerHere(x, y)){
		player.money -= cost;
		towerFunction();
	}

	controlMode = 0;
}

function beginTowerPlacement(towerId){
	controlMode = 1; //How we are currently controlling the game. 0 - normal, 1 - placing tower
	placeTowerID = towerId; // Which tower we are currently trying to place.
}

function setLevel(i){
	currentLevel = levelArray[i];
}

function debugCoordinates(){
	if (gameState == 2){
		textSize(9)
		for( let i = 0 ; i < playAreaGridWidth ; i ++){

			for( let j = 0 ; j < playAreaGridHeight ; j++){
				let coordinate = i + "," + j;
				text( coordinate , i*gridScale + gridScale/2 , j*gridScale + gridScale/2);
			}
		}	
	}
}

