var gridScale = 30;
var screenWidth = 960;
var screenHeight = 540;
var playAreaWidth = 660;
var playAreaHeight = 540;
var playAreaGridWidth = playAreaWidth/gridScale;
var playAreaGridHeight = playAreaHeight/gridScale;

var FPS = 60;


var currentLevel;

var player = new Player(100);

var selectedUnit = null;

var mouseGridX;
var mouseGridY;

let levelArray = new Array();

let gameState = 0; //0 - main menu, 1 - level select, 2 - inGame;
let levelPlay = false; //Is the level currently playing or paused.

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

	makeMainMenu();
	makeLevelSelectMenu();
	makeLevelGUI();
	setGameState(0);
}

// This is our main loop.
function draw() {
	
	updateStep();
	cleanUp();
	drawStep();
	debugCoordinates();
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

	stroke(color('black'));
	fill(color('lightBlue'));
	
	background(200);
	strokeWeight(2);

	drawGrid(0, 0, playAreaWidth, playAreaHeight);


	fill(color('red'));
	drawSelectionSquare();

	for(var u of unitList){
  		u.drawSelf();
	}

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

	//new BeamTowerLevel1(9, 7);

	//new BeamTowerLevel1(9, 13);

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
			break;
		case 1:
			endLevel();
			openLevelSelectMenu();
			break;
		case 2:
			startLevel();
			openLeveLGUI();
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

	//Do stuff based off of the position of the mouse in the grid only if the mouse is in the grid.
	if(mouseGridX != -1 && mouseGridY != -1){
		let hoveredTower = towerArray[mouseGridX][mouseGridY];
		// When we click a grid space with a tower, selectedUnit is set to that tower. Else selectedUnit becomes null;
		if(hoveredTower != null){
			//selectedUnit = hoveredTower;
			hoveredTower.die();
		}
		else{
			selectedUnit = null;
		}
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

function spawn(_enemyID, _pathID){
	let startPathX = Path.getX(_pathID,0);
	let startPathY = Path.getY(_pathID,0);
	switch(_enemyID) {
		case 0:
		    new Enemy(startPathX,startPathY,_pathID)
		    break;
		case 1:
		    new ArmoredEnemy(startPathX,startPathY,_pathID)
			break;
		default:
		    // code block
	} 
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
			text( coordinate , i*gridScale + gridScale/4 , j*gridScale + gridScale/2);
		}
	}	

	
}
}