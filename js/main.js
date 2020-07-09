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

let levelProgress = 1;

var player;

var selectedUnit = null;

var mouseGridX = 0;
var mouseGridY = 0;

var mouseGridXPrev = mouseGridX;
var mouseGridYPrev = mouseGridY;

let hoveredThisFrame = false;

let levelArray = new Array();

let powerTileList = [];

let towerBeingPlaced = null;

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
	loadLevel("level3");

	fontKenny = loadFont('font/kenvector_future.ttf');
	fontKennyThin = loadFont('font/kenvector_future_thin.ttf');
	fontVCR = loadFont('font/VCR_OSD_MONO_1.001.ttf');
	fontMinecraft = loadFont('font/Minecraft.ttf');

	Art.loadArt();
}

// setup the games
function setup() {
	towerArray = createArray(playAreaGridWidth, playAreaGridHeight);


	frameRate = FPS;
	createCanvas(screenWidth, screenHeight);
	noFill();
	noSmooth();

	buildAllLevels();

	//Initialize all unit classes
	AdvancedDraw.initializeClass();
	Unit.initializeClass();
	Enemy.initializeClass();
	FastEnemy.initializeClass();
	RegularEnemy.initializeClass();
	ArmoredEnemy.initializeClass();
	UntargetableEnemy.initializeClass();
	SmallEgg.initializeClass();
	Snail.initializeClass();
	Slug.initializeClass();

	Tower.initializeClass();
	CooldownTower.initializeClass();

	//elves
	Elf.initializeClass();
	ArrowTowerLevel1.initializeClass();
	FrostArcher.initializeClass();
	NinjaTower.initializeClass();
	FireElementalist.initializeClass();
	FireElemental.initializeClass();
	BeamTowerLevel1.initializeClass();
	BeamTowerLevel2.initializeClass();

	//dwarves
	BombTowerLevel1.initializeClass();

	//humans
	Human.initializeClass();
	EarthquakeTowerLevel1.initializeClass();
	Acolyte.initializeClass();

	makeMainMenu();
	makeLevelSelectMenu();
	makeLevelGUI();
	makeWinLevelGui();
	makeLoseLevelGui();
	setGameState(0);

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
	mouseGridXPrev = mouseGridX;
	mouseGridYPrev = mouseGridY;

	mouseGridX = getSelectionSquareX();
	mouseGridY = getSelectionSquareY();


	if(gameState == 2){
		//in level
		switch(controlMode){
			case 0:
				//normal mode
				break;
			case 1:
				//placing tower
				if( mouseGridX != mouseGridXPrev || mouseGridY != mouseGridYPrev){
					if(towerBeingPlaced) towerBeingPlaced.move(mouseGridX, mouseGridY);
				}
				break;
		}
	}

	if(levelPlay){
		Timeline.advanceTimeline(dTime*gameSpeed);

		for(var u of unitList){
			if(u.deleted || !u.active) continue;
	  		u.update(dTime*gameSpeed);
		}

		for(var d of decalList){
			if(d.deleted) continue;
	  		d.update(dTime*gameSpeed);
		}
	}

	// The purpose of this list is to ensure that all hover/over ends happen before the hover/over begins every frame.
	let delayedHoverOverList = [];
	hoveredThisFrame = false;
	for(let i = guiList.length - 1 ; i >= 0 ; i--){
  		let gui = guiList[i];
  		if(!gui.active) continue;
  		gui.update(dTime);
  		if(mouseX >= gui.x && mouseX < gui.x + gui.w && mouseY >= gui.y && mouseY < gui.y + gui.h){
  			delayedHoverOverList.push(gui);
  		}
  		else{
  			if(gui.hovered) gui.endHover();
  			if(gui.over) gui.endOver();
  		}
  	}

  	for(let gui of delayedHoverOverList){
  		if(gui.stopClicks && !hoveredThisFrame){
  			if(!gui.hovered) gui.beginHover();
  			hoveredThisFrame = true;
  		}
  		if(!gui.over) gui.beginOver();
  	}
}

// Draw everything in the game here.
function drawStep(){
	//rotate(0);
	stroke(color('black'));
	fill(color('lightBlue'));
	
	background(150);
	strokeWeight(2);

	if(gameState == 2){
		drawLevel();
		drawPowerTiles();

		if(selectedUnit != null){
			selectedUnit.drawSelected();
		}

		switch(controlMode){
			case 0:

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
				//image(placeTowerClass.animationFrames[0], mouseX - mouseX%gridScale, mouseY - mouseY%gridScale, gridScale, gridScale);

				// draw the range of the tower.
				stroke(color('rgba(255,255,51, 1)'));
				fill(color('rgba(255,255,51,.2)'));
				ellipse(mouseX - mouseX%gridScale + gridScale/2, mouseY - mouseY%gridScale + gridScale/2, placeTowerClass.range * 2 * gridScale);
				break;
		}

		noStroke();
		fill(color('rgba(255, 127, 0, .5)'));
		drawSelectionSquare();

		for(var u of unitList){
  			u.drawSelf();
		}

		for(var d of decalList){
			d.drawSelf();
		}
	}

	for(var gui of guiList){
  		gui.drawSelf();
	}

	if(towerBeingPlaced){
		if(mouseGridX == -1 || mouseGridY == -1){
			towerBeingPlaced.drawAtPosition(mouseX - gridScale/2, mouseY - gridScale/2);
			towerBeingPlaced.draw = false;
		}
		else{
			towerBeingPlaced.draw = true;
		}
	}
}

function drawPowerTiles(){
	for(let tile of powerTileList){
		noFill();
		strokeWeight(2);
		let tileSprite = null;
		if(tile.name == "Damage"){
			tileSprite = Art.tileDamage;
		}
		else if(tile.name == "Range"){
			tileSprite = Art.tileRange;
		}
		else{
			tileSprite = Art.tileSpeed;
		}

		image(tileSprite, tile.x * gridScale, tile.y * gridScale, gridScale, gridScale);
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

	setSelectedUnit(null);

	player = new Player(levelData[currentLevelIndex].startingGold);

	for(var u of unitList){
		if(u.deleted) continue;
  		u.markForRemoval();
	}

	for(var d of decalList){
  		if(d.deleted) continue;
  		d.markForRemoval();
	}

	powerTileList = [];
	for(let i = 0 ; i < levelData[currentLevelIndex].powerTiles.length ; i++){
		powerTileList.push(levelData[currentLevelIndex].powerTiles[i]);
	}

	for(let startingTower of levelData[currentLevelIndex].startingTowers){
		let towerClass = getClass(startingTower.name)
		let towerInstance = new towerClass(startingTower.x, startingTower.y);
		towerInstance.permanent = true;
	}

	towerDetailsPanel.setEmpty();

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

function touchStarted(event) {
	userPress(event);
}

function mousePressed(event) {
  	userPress(event);
}

function userPress(event){
	console.log(event);

  	if(gameState == 2){
	  	switch(controlMode){
	  		case 0:
	  		//regular mode
	  			//Do stuff based off of the position of the mouse in the grid only if the mouse is in the grid.
				if(mouseGridX != -1 && mouseGridY != -1 && !hoveredThisFrame){
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
	  			//tower placement mode
	  			break;
	  	}
  	}

  	let handled = false;
  	for(let i = guiList.length - 1 ; i >= 0 ; i--){
  		let gui = guiList[i];
  		if(!gui.active) continue;
  		if(!handled && mouseX >= gui.x && mouseX < gui.x + gui.w && mouseY >= gui.y && mouseY < gui.y + gui.h){
  			if (gui.stopClicks) handled = gui.press();
  		}
  		else{
  			gui.pressAnywhere();
  		}
  	}
}

function touchEnded(event){
	userRelease(event);
}

function mouseReleased(event) {
  	userRelease(event);
}

function userRelease(event){
	console.log(event);

  	for(let gui of guiList){
  		if(!gui.active) continue;
  		if(mouseX >= gui.x && mouseX < gui.x + gui.w && mouseY >= gui.y && mouseY < gui.y + gui.h){
  			if(gui instanceof Button){
  				if(!gui.lockIn && gui.pressed) gui.release(true);
  			}
  			else{
  				gui.release();
  			}
  		}
  		gui.mouseUpGlobal();
  	}

  	if(gameState == 2){
	  	switch(controlMode){
	  		case 0:
	  			//regular mode
	  			break;
	  		case 1:
	  			//tower placement mode
	  			if(mouseGridX != -1 && mouseGridY != -1){
					if(canPlaceTowerHere(mouseGridX, mouseGridY)){
						player.setGold(player.gold - towerBeingPlaced.getBasePrice());
						towerArray[towerBeingPlaced.getXGrid()][towerBeingPlaced.getYGrid()] = towerBeingPlaced;
						towerBeingPlaced.active = true;
						towerBeingPlaced = null
						controlMode = 0;
						towerDetailsPanel.setEmpty();
					}
					else{
						exitTowerPlacementMode();
					}
				}
				else{
					exitTowerPlacementMode();
				}
	  			break;
	  	}
	}
}

function exitTowerPlacementMode(){
	towerBeingPlaced.markForRemoval();
	towerBeingPlaced = null
	controlMode = 0;
	towerDetailsPanel.setEmpty();
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
	image(levelData[currentLevelIndex].bottomCanvas, 0, 0);
	image(levelData[currentLevelIndex].middleCanvas, 0, 0);
	image(levelData[currentLevelIndex].topCanvas, 0, 0);
}

function drawFilledGridSpace(x, y){
	strokeWeight(1);
	stroke(color("black"));
	rect(x * gridScale, y * gridScale, gridScale, gridScale);
}

function drawSelectionSquare(){
	let x = getSelectionSquareX();
	let y = getSelectionSquareY();

	strokeWeight(1);
	stroke(color("red"));
	noFill();
	rect(x * gridScale, y * gridScale, gridScale, gridScale);
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
	let a = (x >= 0 && x < towerArray.length && y >= 0 && y < towerArray[0].length);
	return a && ((towerArray[x][y] == towerBeingPlaced || towerArray[x][y] == null) && levelData[currentLevelIndex].solidArray[x][y] == null); 
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
		case 4:
		    enemyClass = SmallEgg;
			break;
		case 5:
		    enemyClass = Snail;
			break;
		case 6:
		    enemyClass = Slug;
			break;
		default:
		    // code block
	} 
	return enemyClass;
}

function spawnInPath(_enemyID, _pathID, pathprogress){
	let enemy = spawn(_enemyID, _pathID);
	enemy.move(pathprogress, true);	
}

function placeTower(x, y, towerClass, force = false){
	let cost = towerClass.price;
	let newTower = null;
	if(player.gold >= cost && (canPlaceTowerHere(x, y) || force)){
		player.setGold(player.gold - cost);
		newTower = new towerClass(x, y);
	}else{
		playerDisplayPanel.moneyAlert();
	}
	controlMode = 0;
	if(newTower) setSelectedUnit(null);
	return newTower;
}

function replaceTower(towerToReplace, newTowerClass){
	towerToReplace.markForRemoval();
	let newTower = placeTower(towerToReplace.getXGrid(), towerToReplace.getYGrid(), newTowerClass, true);
	newTower.permanent = towerToReplace.permanent; 
	return newTower;
}

function beginTowerPlacement(towerClass){
	controlMode = 1; //How we are currently controlling the game. 0 - normal, 1 - placing tower
	placeTowerClass = towerClass; // Which tower we are currently trying to place.

	if (towerBeingPlaced) towerBeingPlaced.markForRemoval();
	towerBeingPlaced = new towerClass(0, 0);
	towerBeingPlaced.active = false;
	towerDetailsPanel.setTowerInstance(towerBeingPlaced);
}

function upgradeSelectedTower(towerClass){
	let cost = towerClass.price;
	if(player.gold >= cost){
		replaceTower(selectedUnit, towerClass);
	}
	else{
		playerDisplayPanel.moneyAlert();
	}
}

function sellSelectedTower(){
	selectedUnit.markForRemoval();
	player.setGold(player.gold + selectedUnit.getBasePrice());
	setSelectedUnit(null);
}

function setSelectedUnit(unit){
	selectedUnit = unit;

	if(selectedUnit == null){
		towerDetailsPanel.setEmpty();
		towerUpgradeRadial.setActive(false);
	}
	else if(selectedUnit instanceof Tower){
		towerDetailsPanel.setTowerInstance(selectedUnit);
		towerUpgradeRadial.setActive(true);
		towerUpgradeRadial.setUnit(selectedUnit);
	}
}

function setLevel(i){
	currentLevelIndex = i;
	currentLevelName = levelNames[i];
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
	if(currentLevelIndex + 1 >= levelProgress){
		levelProgress = currentLevelIndex + 2;
		saveData();
	}
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