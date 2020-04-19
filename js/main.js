var gridScale = 32;
var screenWidth = 960;
var screenHeight = 540;
var playAreaWidth = 768;
var playAreaHeight = 512;
var playAreaGridWidth = playAreaWidth/gridScale;
var playAreaGridHeight = playAreaHeight/gridScale;

var FPS = 30;
var gameSpeed = 2;

let currentLevelIndex = 0;
let currentLevelName = "level1";

let bottomCanvas = null;
let middleCanvas = null;
let topCanvas = null;

let levelProgress = 2;

var player;

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
let fontVCR;
let fontMinecraft;

let DEBUG = false;

// load all artwork and json data before the game begins.
function preload(){
	loadLevel("level1");
	loadLevel("level2");

	fontKenny = loadFont('font/kenvector_future.ttf');
	fontKennyThin = loadFont('font/kenvector_future_thin.ttf');
	fontVCR = loadFont('font/VCR_OSD_MONO_1.001.ttf');
	fontMinecraft = loadFont('font/Minecraft.ttf');

	Art.loadArt();
}

// setup the games
function setup() {

	bottomCanvas = createGraphics(playAreaWidth, playAreaHeight);
	middleCanvas = createGraphics(playAreaWidth, playAreaHeight);
	topCanvas = createGraphics(playAreaWidth, playAreaHeight);

	towerArray = createArray(playAreaGridWidth, playAreaGridHeight);


	frameRate = FPS;
	createCanvas(screenWidth, screenHeight);
	noFill();
	noSmooth();

	//Initialize all unit classes
	AdvancedDraw.initializeClass();
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
	BeamTowerLevel2.initializeClass();
	BombTowerLevel1.initializeClass();
	EarthquakeTowerLevel1.initializeClass();
	NinjaTower.initializeClass();

	makeMainMenu();
	makeLevelSelectMenu();
	makeLevelGUI();
	makeWinLevelGui();
	makeLoseLevelGui();
	setGameState(0);

	saveData();
	loadData();
}

// This is our main loop.
function draw() {
	
	updateStep(deltaTime/100);
	cleanUp();
	drawStep();
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

		for(var d of decalList){
			if(d.deleted) continue;
	  		d.update(dTime*gameSpeed);
		}
	}
	let hoveredThisFrame = false;
	for(let i = guiList.length - 1 ; i >= 0 ; i--){
  		let gui = guiList[i];
  		if(!gui.active) continue;
  		gui.update(dTime);
  		if(!hoveredThisFrame && mouseX >= gui.x && mouseX < gui.x + gui.w && mouseY >= gui.y && mouseY < gui.y + gui.h){
  			if(!gui.hovered){
  				gui.beginHover();
  			}
  			hoveredThisFrame = true;
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

	drawLevel();

	for(var u of unitList){
  		u.drawSelf();
	}

	for(var d of decalList){
  		d.drawSelf();
	}

	if(gameState == 2){
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
				//Path.draw();
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
	}

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

	for(var d of decalList){
  		if(d.deleted) continue;
  		d.markForRemoval();
	}

	speedButtonGroup.buttonList[2].press();
}

// End the level we are currently on.
function endLevel(){
	levelPlay = false;

	for(var u of unitList){
		if(u.deleted) continue;
  		u.markForRemoval();
	}

	for(var d of decalList){
  		if(d.deleted) continue;
  		d.markForRemoval();
	}
}

// Set the game state. The options are currently 0: main menu; 1: level select; 2: in game.
function setGameState(state){
	closeMainMenu();
	closeLevelSelectMenu();
	closeLevelGUI();
	closeWinLevelGui();
	closeLoseLevelGui();
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
		case 3:
			//Lose Level
			gameState = 3;
			break;
		case 4:
			//Win Level
			gameState = 4;
			break;
	}
}

function mousePressed(event) {
  	console.log(event);

  	let handled = false;
  	for(let i = guiList.length - 1 ; i >= 0 ; i--){
  		let gui = guiList[i];
  		if(!gui.active) continue;
  		if(!handled && mouseX >= gui.x && mouseX < gui.x + gui.w && mouseY >= gui.y && mouseY < gui.y + gui.h){
  			handled = gui.press();
  		}
  		else{
  			gui.pressAnywhere();
  		}
  	}

  	if(gameState == 2){
	  	switch(controlMode){
	  		case 0:
	  			//Do stuff based off of the position of the mouse in the grid only if the mouse is in the grid.
				if(mouseGridX != -1 && mouseGridY != -1){
					let hoveredTower = towerArray[mouseGridX][mouseGridY];
					// When we click a grid space with a tower, selectedUnit is set to that tower. Else selectedUnit becomes null;
					if(hoveredTower != null){
						setSelectedUnit(hoveredTower);
					}
					else{
						setSelectedUnit(null);
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
}

function mouseReleased(event) {
  	console.log(event);

  	for(let gui of guiList){
  		if(!gui.active) continue;
  		if(mouseX >= gui.x && mouseX < gui.x + gui.w && mouseY >= gui.y && mouseY < gui.y + gui.h){
  			if(gui instanceof Button){
  				if(!gui.lockIn && gui.pressed) gui.release();
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

function drawLevel(){
	image(bottomCanvas, 0, 0);
	image(middleCanvas, 0, 0);
	image(topCanvas, 0, 0);
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
	return (towerArray[x][y] == null && selectedLevel.solidArray[x][y] == null); 
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

function placeTower(x, y, towerClass, force = false){
	let cost = towerClass.price;

	let newTower = null;
	if(player.gold >= cost && (canPlaceTowerHere(x, y) || force)){
		player.setGold(player.gold - cost);
		newTower = new towerClass(x, y);
	}
	controlMode = 0;
	if(newTower) setSelectedUnit(null);
	return newTower;
}

function replaceTower(towerToReplace, newTowerClass){
	towerToReplace.markForRemoval();
	return placeTower(towerToReplace.getXGrid(), towerToReplace.getYGrid(), newTowerClass, true);
}

function beginTowerPlacement(towerClass){
	controlMode = 1; //How we are currently controlling the game. 0 - normal, 1 - placing tower
	placeTowerClass = towerClass; // Which tower we are currently trying to place.
	towerDetailsPanel.setTowerClass(towerClass);
}

function upgradeSelectedTower(towerClass){
	let cost = towerClass.price;
	if(player.gold >= cost){
		replaceTower(selectedUnit, towerClass);
	}
}

function sellSelectedTower(sellAmount){
	selectedUnit.markForRemoval();
	player.setGold(player.gold + sellAmount);
	setSelectedUnit(null);
}

function setSelectedUnit(unit){
	selectedUnit = unit;

	if(selectedUnit == null){
		towerSelectPanel.setActive(true);
		towerUpgradePanel.setActive(false);
	}
	else if(selectedUnit instanceof Tower){
		towerSelectPanel.setActive(false);
		towerUpgradePanel.setActive(true);
		towerUpgradePanel.setTowerClass(selectedUnit);
		towerDetailsPanel.setTowerClass(selectedUnit.getClass());
	}
}

function setLevel(i){
	currentLevelIndex = i;
	currentLevelName = levelNames[i];
	buildLevel(currentLevelName);
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

function loseLevel(){
	openLoseLevelGui();
	setGameSpeed(0);
}

function winLevel(){
	openWinLevelGui();
	setGameSpeed(0);
}

function keyPressed() {
	if (keyCode === 32)
	{
		console.log("space pressed");
    	winLevel();
 	}

 	if (keyCode === 77)
	{
		console.log("M pressed");
    	loseLevel();
 	}
}