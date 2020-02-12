var gridScale = 32;
var screenWidth = 960;
var screenHeight = 540;
var playAreaWidth = 768;
var playAreaHeight = 512;
var playAreaGridWidth = playAreaWidth/gridScale;
var playAreaGridHeight = playAreaHeight/gridScale;

var FPS = 30;
var gameSpeed = 2;


var currentLevel;

var player;

var selectedUnit = null;

var mouseGridX;
var mouseGridY;

let levelArray = new Array();

let gameState = 0; //0 - main menu, 1 - level select, 2 - inGame;
let levelPlay = false; //Is the level currently playing or paused.
let controlMode = 0; //How we are currently controlling the game. 0 - normal, 1 - placing tower
let placeTowerID = 0; // Which tower we are currently trying to place.

let solidBlockArray;

let fontKenny;
let fontKennyThin;
let fontVCR;
let fontMinecraft;

// load all artwork and json data before the game begins.
function preload(){
	levelArray.push(loadJSON('json/level1.json'));
	levelArray.push(loadJSON('json/level2.json'));
	currentLevel = levelArray[0];

	fontKenny = loadFont('font/kenvector_future.ttf');
	fontKennyThin = loadFont('font/kenvector_future_thin.ttf');
	fontVCR = loadFont('font/VCR_OSD_MONO_1.001.ttf');
	fontMinecraft = loadFont('font/Minecraft.ttf');

	Art.loadArt();
}

// setup the game
function setup() {

	towerArray = createArray(playAreaGridWidth, playAreaGridHeight);
	solidBlockArray = createArray(playAreaGridWidth, playAreaGridHeight);


	frameRate = FPS;
	createCanvas(screenWidth, screenHeight);
	noFill();
	noSmooth();

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
	
	updateStep(deltaTime/100);
	cleanUp();
	drawStep();
	//debugCoordinates();
}

// Update the game state in this loop.
function updateStep(dTime){
	//Get the mouse coordinates in the grid.

	mouseGridX = getSelectionSquareX();
	mouseGridY = getSelectionSquareY();

	if(levelPlay){
		Timeline.advanceTimeline(dTime*gameSpeed);

		for(var u of unitList){
			if(u.deleted) continue;
	  		u.update(dTime*gameSpeed);
		}
	}

	for(let gui of guiList){
  		if(!gui.active) continue;
  		gui.update(dTime);
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
	
	background(150);
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

			// draw the tower we intend to place
			image(placeTowerClass.animationFrames[0], mouseX - mouseX%gridScale, mouseY - mouseY%gridScale, gridScale, gridScale);

			// draw the range of the tower.
			stroke(color('rgba(255,255,51, 1)'));
			fill(color('rgba(255,255,51,.2)'));
			ellipse(mouseX - mouseX%gridScale + gridScale/2, mouseY - mouseY%gridScale + gridScale/2, placeTowerClass.range * 2 * gridScale);
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

	player = new Player(1000);

	for(var u of unitList){
		if(u.deleted) continue;
  		u.markForRemoval();
	}

	for(let arr of solidBlockArray){
		arr = []
	}
	for(let pair of currentLevel.levelData.solid){
		solidBlockArray[pair[0]][pair[1]] = 1;
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
					towerDetailsPanel.setTowerClass(selectedUnit.getClass());
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
					placeTower(mouseGridX, mouseGridY, placeTowerClass);
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
  			if(gui instanceof Button){
  				if(!gui.lockIn) gui.release();
  			}
  			else{
  				gui.release();
  			}
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
	strokeWeight(1);
	stroke(color("black"));
	for(let i = 0 ; i <= gridWidth/gridScale ; i++){
		line(x + i * gridScale, y, x + i * gridScale, y + gridHeight);
	}
	for(let i = 0 ; i <= gridHeight/gridScale ; i++){
		line(x, y + i * gridScale, x + gridWidth, y + i * gridScale);		
	}
}

function drawFilledGridSpace(x, y){
	strokeWeight(1);
	stroke(color("black"));
	rect(x * gridScale, y * gridScale, gridScale, gridScale);
}

function drawSelectionSquare(){
	let x = getSelectionSquareX();
	let y = getSelectionSquareY();

	drawFilledGridSpace(x, y);
}

function setGameSpeed(newSpeed){
	gameSpeed = newSpeed;
}

function drawTowerPlacementGrid(){
	for(let i = 0 ; i < playAreaGridWidth ; i++){
		for(let j = 0 ; j < playAreaGridHeight ; j++){
			if(canPlaceTowerHere(i, j)){
				fill(color('rgba(0, 200, 0, .5)'));
			}
			else{
				fill(color('rgba(200, 0, 0, .5)'));
			}
			drawFilledGridSpace(i, j);
		}
	}
}

function canPlaceTowerHere(x, y){
	return (towerArray[x][y] == null && solidBlockArray[x][y] == null); 
}

function spawn(_enemyID, _pathID){
	let startPathX = Path.getX(_pathID,0);
	let startPathY = Path.getY(_pathID,0);


	let enemyClass = getClassFromEnemyID(_enemyID);
	return new enemyClass(startPathX,startPathY,_pathID)
}

function getClassFromEnemyID(_enemyID){
	let enemyClass;
	switch(_enemyID) {
		case 0:
		    enemyClass = RegularEnemy;
		    break;
		case 1:
		    enemyClass = ArmoredEnemy;
			break;
		case 2:
		    enemyClass = FastEnemy;
			break;
		case 3:
		    enemyClass = UntargetableEnemy;
			break;
		default:
		    // code block
	} 
	return enemyClass;
}

function spawnInPath(_enemyID, _pathID, pathprogress){
	let enemy = spawn(_enemyID, _pathID);
	enemy.move(pathprogress);	
}

function placeTower(x, y, towerClass){
	let cost = towerClass.price;

	if(player.gold >= cost && canPlaceTowerHere(x, y)){
		player.setGold(player.gold - cost);
		new towerClass(x, y);
	}

	controlMode = 0;
}

function beginTowerPlacement(towerClass){
	controlMode = 1; //How we are currently controlling the game. 0 - normal, 1 - placing tower
	placeTowerClass = towerClass; // Which tower we are currently trying to place.
	towerDetailsPanel.setTowerClass(towerClass);
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

