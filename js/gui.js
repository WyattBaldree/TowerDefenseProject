////////////////////////////// MAIN MENU

let mainMenuGuiGroup;
let mainMenuBackground;
let mainMenuPlate;
let mainMenuLogo;
let mainMenuLevelSelectButton;
let mainMenuOptionsButton;
function makeMainMenu(){
	mainMenuGuiGroup = new GuiGroup(0, 0);

	let bgScale = 1.8;
	mainMenuBackground = new GuiComponent(0, 0, Art.castleBackground.width * bgScale, Art.castleBackground.height * bgScale, 0, Art.castleBackground);
	mainMenuGuiGroup.addGui(mainMenuBackground);

	mainMenuPlate = new NineSlice(screenWidth/2 - 120, screenHeight/2 - 70, 240, 260, 8, 8, 8, 8, 1, Art.grayBackground);
	mainMenuGuiGroup.addGui(mainMenuPlate);

	let logoScale = 1;
	mainMenuLogo = new GuiComponent(screenWidth/2 - Art.logo.width * logoScale/2, screenHeight/2 - Art.logo.height * logoScale/2 - 100, Art.logo.width * logoScale, Art.logo.height * logoScale, 2, Art.logo);
	mainMenuGuiGroup.addGui(mainMenuLogo);

	mainMenuLevelSelectButton = new Button(screenWidth/2 - 90, screenHeight/2 + 30, 180, 60, 5, 5, 5, 5, 2);
	mainMenuLevelSelectButton.setInTexture(Art.blueButtonIn);
	mainMenuLevelSelectButton.setOutTexture(Art.blueButtonOut);
	mainMenuLevelSelectButton.textComponent.text = "Level Select"
	mainMenuLevelSelectButton.onClickFunction = function(){ setGameState(1); }
	mainMenuGuiGroup.addGui(mainMenuLevelSelectButton);

	mainMenuOptionsButton = new Button(screenWidth/2 - 90, screenHeight/2 + 100, 180, 60, 5, 5, 5, 5, 2);
	mainMenuOptionsButton.setInTexture(Art.blueButtonIn);
	mainMenuOptionsButton.setOutTexture(Art.blueButtonOut);
	mainMenuOptionsButton.textComponent.text = "Clear Data"
	mainMenuOptionsButton.onClickFunction = function(){ 
		initializeData();
		loadData();
	}

	mainMenuGuiGroup.addGui(mainMenuOptionsButton);
}

function openMainMenu(){
	mainMenuGuiGroup.setActive(true);
}

function closeMainMenu(){
	mainMenuGuiGroup.setActive(false);
}

////////////////////////////LEVEL SELECT SCREEN

let levelSelectGuiGroup;
let levelSelectBackground;
let levelSelectionButtonBar;
let levelSelectionPrompt;
let levelSelectionButtonBarInlay;

let currentlySelectedLevel = null;
let flagArray = [];
function makeLevelSelectMenu(){
	levelSelectGuiGroup = new GuiGroup(0, 0);

	levelSelectBackground = new GuiComponent(0, 0, Art.map.width*2, Art.map.height*2, 0, Art.map);
	levelSelectGuiGroup.addGui(levelSelectBackground);

	//levelSelectionButtonBar = new NineSlice(0, playAreaHeight, screenWidth-64, 28, 8, 8, 8, 8, 1, Art.grayBackground);
	//levelSelectGuiGroup.addGui(levelSelectionButtonBar);

	let inlayMargin = 2;

	levelSelectionButtonBarInlay = new NineSlice(0 + inlayMargin, playAreaHeight + inlayMargin, screenWidth-64 - inlayMargin*2, 28 - inlayMargin*2, 8, 8, 8, 8, 2, Art.tanInlay);
	levelSelectGuiGroup.addGui(levelSelectionButtonBarInlay);

	levelSelectionTitleText = new TextComponent(screenWidth/2, playAreaHeight + 14 , 3, "Select a level.");
	levelSelectionTitleText.fontSize = 18;
	levelSelectionTitleText.fontColor = color("white");
	levelSelectionTitleText.horizontalAlign = CENTER;
	levelSelectionTitleText.verticalAlign = CENTER;
	levelSelectGuiGroup.addGui(levelSelectionTitleText);

	levelSelectMainMenuButton = new Button(screenWidth - 64, playAreaHeight, 64, 28, 5, 5, 5, 5, 2);
	levelSelectMainMenuButton.setInTexture(Art.blueButtonIn);
	levelSelectMainMenuButton.setOutTexture(Art.blueButtonOut);
	levelSelectMainMenuButton.textComponent.text = "Back"
	levelSelectMainMenuButton.textComponent.fontSize = 18;
	levelSelectMainMenuButton.onClickFunction = function(){ setGameState(0); }
	levelSelectGuiGroup.addGui(levelSelectMainMenuButton);

	levelSelectionPrompt = new LevelPrompt(0, 0, 2);
	levelSelectionPrompt.setActive(false);
	levelSelectGuiGroup.addGui(levelSelectionPrompt);

	loadMap();
}

function openLevelSelectMenu(){
	levelSelectGuiGroup.setActive(true);
	levelSelectionPrompt.setActive(false);
	updateFlags();
}

function closeLevelSelectMenu(){
	levelSelectGuiGroup.setActive(false);
}

////////////////////////////Level Win GUI

let levelWinGuiGroup;
let levelWinBackground;
let levelWinPlate;
let levelWinNextLevelButton;
let levelWinMainMenuButton;
let levelWinTextPlate;
let levelWinText;
function makeWinLevelGui(){
	levelWinGuiGroup = new GuiGroup(0, 0);

	levelWinBackground = new GuiComponent(0, 0, screenWidth, screenHeight, 4);
	levelWinBackground.drawColor = color("rgba(0, 0, 0, .5)");
	levelWinBackground.stopClicks = true;
	levelWinGuiGroup.addGui(levelWinBackground);

	levelWinPlate = new NineSlice(screenWidth/2 - 120, screenHeight/2 - 70, 240, 160, 8, 8, 8, 8, 5, Art.grayBackground);
	levelWinGuiGroup.addGui(levelWinPlate);

	levelWinNextLevelButton = new Button(screenWidth/2 - 90, screenHeight/2 - 55, 180, 60, 5, 5, 5, 5, 6);
	levelWinNextLevelButton.setInTexture(Art.blueButton2In);
	levelWinNextLevelButton.setOutTexture(Art.blueButton2Out);
	levelWinNextLevelButton.textComponent.text = "Next Level";
	levelWinNextLevelButton.onClickFunction = function(){ 
		setLevel(currentLevelIndex+1);
		setGameState(2);
	}
	levelWinGuiGroup.addGui(levelWinNextLevelButton);

	levelWinMainMenuButton = new Button(screenWidth/2 - 90, screenHeight/2 + 15, 180, 60, 5, 5, 5, 5, 6);
	levelWinMainMenuButton.setInTexture(Art.blueButton2In);
	levelWinMainMenuButton.setOutTexture(Art.blueButton2Out);
	levelWinMainMenuButton.textComponent.text = "Main Menu";
	levelWinMainMenuButton.onClickFunction = function(){ 
		setGameState(0);
	}
	levelWinGuiGroup.addGui(levelWinMainMenuButton);

	levelWinTextPlate = new NineSlice(screenWidth/2 - 140, screenHeight/2 - 160, 280, 80, 8, 8, 8, 8, 6, Art.greenButtonOut);
	levelWinGuiGroup.addGui(levelWinTextPlate);

	levelWinText = new TextComponent(screenWidth/2, screenHeight/2 - 120, 7, "You Win!");
	levelWinText.fontColor = color("white");
	levelWinText.fontSize = 45;
	levelWinText.horizontalAlign = CENTER;
	levelWinText.verticalAlign = CENTER;
	levelWinGuiGroup.addGui(levelWinText);
}

function openWinLevelGui(){
	levelWinGuiGroup.setActive(true);
}

function closeWinLevelGui(){
	levelWinGuiGroup.setActive(false);
}

////////////////////////////Level Lose GUI

let levelLoseGuiGroup;
let levelLoseBackground;
let levelLosePlate;
let levelLoseNextLevelButton;
let levelLoseMainMenuButton;
let levelLoseTextPlate;
let levelLoseText;
function makeLoseLevelGui(){
	levelLoseGuiGroup = new GuiGroup(0, 0);

	levelLoseBackground = new GuiComponent(0, 0, screenWidth, screenHeight, 4);
	levelLoseBackground.drawColor = color("rgba(0, 0, 0, .5)");
	levelLoseBackground.stopClicks = true;
	levelLoseGuiGroup.addGui(levelLoseBackground);

	levelLosePlate = new NineSlice(screenWidth/2 - 120, screenHeight/2 - 70, 240, 160, 8, 8, 8, 8, 5, Art.grayBackground);
	levelLoseGuiGroup.addGui(levelLosePlate);

	levelLoseNextLevelButton = new Button(screenWidth/2 - 90, screenHeight/2 - 55, 180, 60, 5, 5, 5, 5, 6);
	levelLoseNextLevelButton.setInTexture(Art.blueButton2In);
	levelLoseNextLevelButton.setOutTexture(Art.blueButton2Out);
	levelLoseNextLevelButton.textComponent.text = "Retry Level";
	levelLoseNextLevelButton.onClickFunction = function(){ 
		setGameState(2);
	}
	levelLoseGuiGroup.addGui(levelLoseNextLevelButton);

	levelLoseMainMenuButton = new Button(screenWidth/2 - 90, screenHeight/2 + 15, 180, 60, 5, 5, 5, 5, 6);
	levelLoseMainMenuButton.setInTexture(Art.blueButton2In);
	levelLoseMainMenuButton.setOutTexture(Art.blueButton2Out);
	levelLoseMainMenuButton.textComponent.text = "Main Menu";
	levelLoseMainMenuButton.onClickFunction = function(){ 
		setGameState(0);
	}
	levelLoseGuiGroup.addGui(levelLoseMainMenuButton);

	levelLoseTextPlate = new NineSlice(screenWidth/2 - 140, screenHeight/2 - 160, 280, 80, 8, 8, 8, 8, 6, Art.redButtonOut);
	levelLoseGuiGroup.addGui(levelLoseTextPlate);

	levelLoseText = new TextComponent(screenWidth/2, screenHeight/2 - 120, 7, "You Lose!");
	levelLoseText.fontColor = color("white");
	levelLoseText.fontSize = 45;
	levelLoseText.horizontalAlign = CENTER;
	levelLoseText.verticalAlign = CENTER;
	levelLoseGuiGroup.addGui(levelLoseText);
}

function openLoseLevelGui(){
	levelLoseGuiGroup.setActive(true);
}

function closeLoseLevelGui(){
	levelLoseGuiGroup.setActive(false);
}

////////////////////////////// LEVEL GUI (main game gui)

//Groups
let menuButtonsGuiGroup;
let detailsPanelGuiGroup;
let towerSelectPanel;
let towerUpgradePanel;
let playerInfoGuiGroup;
let timelineGuiGroup;

let restartLevelButton;
let returnToMainMenuButton;
let towerSelectionBackground;
let towerDetailsPanel;
let playerGoldDisplay;
let playerDisplayPanel;
let timelineDisplay;
let speedButtonGroup;
let towerUpgradeRadial;

let sampleTextBox;

function makeLevelGUI(){
	let panelAreaWidth = screenWidth - playAreaWidth;
	let panelAreaHeight = screenHeight - playAreaHeight;

	/////////////MENU BUTTONS
	menuButtonsGuiGroup = new GuiGroup(playAreaWidth, 0);

	restartLevelButton = new Button(menuButtonsGuiGroup.x, menuButtonsGuiGroup.y, panelAreaWidth/2, 32, 5, 5, 5, 5, 1);
	restartLevelButton.setInTexture(Art.blueButtonIn);
	restartLevelButton.setOutTexture(Art.blueButtonOut);
	restartLevelButton.textComponent.text = "Restart";
	restartLevelButton.textComponent.fontSize = 15;
	restartLevelButton.onClickFunction = function(){ startLevel() }
	menuButtonsGuiGroup.addGui(restartLevelButton);

	returnToMainMenuButton = new Button(menuButtonsGuiGroup.x + panelAreaWidth/2, menuButtonsGuiGroup.y, panelAreaWidth/2, 32, 5, 5, 5, 5, 1);
	returnToMainMenuButton.setInTexture(Art.blueButtonIn);
	returnToMainMenuButton.setOutTexture(Art.blueButtonOut);
	returnToMainMenuButton.textComponent.text = "Main";
	returnToMainMenuButton.textComponent.fontSize = 15;
	returnToMainMenuButton.onClickFunction = function(){ setGameState(0) }
	menuButtonsGuiGroup.addGui(returnToMainMenuButton);

	////////////Timeline Group

	timelineGuiGroup = new GuiGroup(0, playAreaHeight);

	timelineDisplay = new TimelineDisplay(timelineGuiGroup.x, timelineGuiGroup.y, 1);
	timelineGuiGroup.addGui(timelineDisplay);

	speedButtonGroup = new RadioButtonGroup(timelineGuiGroup.x + playAreaWidth, timelineGuiGroup.y, panelAreaWidth, panelAreaHeight, 5, 5, 5, 5, 1, 4, true);
	speedButtonGroup.buttonList[0].textComponent.text = "ll";
	speedButtonGroup.buttonList[0].textComponent.fontSize = 15;
	speedButtonGroup.buttonList[0].onClickFunction = function(){gameSpeed = 0;}
	speedButtonGroup.buttonList[1].textComponent.text = ">";
	speedButtonGroup.buttonList[1].textComponent.fontSize = 15;
	speedButtonGroup.buttonList[1].onClickFunction = function(){gameSpeed = .5;}
	speedButtonGroup.buttonList[2].textComponent.text = ">>";
	speedButtonGroup.buttonList[2].textComponent.fontSize = 15;
	speedButtonGroup.buttonList[2].onClickFunction = function(){gameSpeed = 1;}
	speedButtonGroup.buttonList[3].textComponent.text = ">>>";
	speedButtonGroup.buttonList[3].textComponent.fontSize = 15;
	speedButtonGroup.buttonList[3].onClickFunction = function(){gameSpeed = 3;}

	speedButtonGroup.buttonList[2].press();

	timelineGuiGroup.addGui(speedButtonGroup);

	//speedButton.onClickFunction = function(){ setGameState(0) }

	/////////////Player Display Panel
	playerInfoGuiGroup = new GuiGroup(playAreaWidth, 32)
	playerDisplayPanel = new PlayerDisplayPanel(playerInfoGuiGroup.x, playerInfoGuiGroup.y);

	playerInfoGuiGroup.addGui(playerDisplayPanel);
	/////////////Details Panel
	detailsPanelGuiGroup = new GuiGroup(playAreaWidth, 108);

	towerDetailsPanel = new TowerDisplayPanel(detailsPanelGuiGroup.x, detailsPanelGuiGroup.y);
	towerDetailsPanel.setTowerClass(ArrowTowerLevel1);

	detailsPanelGuiGroup.addGui(towerDetailsPanel);

	/////////////radial upgrade panel
	towerUpgradeRadial = new TowerRadialSelector(0, 0, 6);

	/////////////TOWER SELECT PANEL
	towerSelectPanel = new TowerSelectPanel(playAreaWidth, 280);
	towerUpgradePanel = new TowerUpgradePanel(playAreaWidth, 280);
}

function openLeveLGUI(){
	menuButtonsGuiGroup.setActive(true);
	detailsPanelGuiGroup.setActive(true);
	towerSelectPanel.setActive(true);
	towerUpgradePanel.setActive(false);
	playerInfoGuiGroup.setActive(true);
	timelineGuiGroup.setActive(true);
	towerUpgradeRadial.setActive(false);
}

function closeLevelGUI(){
	menuButtonsGuiGroup.setActive(false);
	detailsPanelGuiGroup.setActive(false);
	towerSelectPanel.setActive(false);
	towerUpgradePanel.setActive(false);
	playerInfoGuiGroup.setActive(false);
	timelineGuiGroup.setActive(false);
	towerUpgradeRadial.setActive(false);
}

//Classes

var guiList = new Array(); //holds all guis

class GuiComponent{
	constructor(x, y, w, h, z = 0, tex = null){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.z = z;
		this.texture = tex;
		this.hovered = false;
		this.active = true;
		this.drawColor = color("black");
		this.parent = null;
		this.stopClicks = false;
		this.draw = true;
		this.onHoverBeginFunction = function(){};
		this.onHoverEndFunction = function(){};
		guiList.push(this);
		guiList.sort((a, b) => (a.z > b.z) ? 1 : -1);


		this.guiList = [];
	}

	update(dTime){

	}



	addGui(gui){
		this.guiList.push(gui);
		gui.parent = this;
	}

	setX(x){
		let deltaX = x - this.x;
		this.x = x;

		for(let gui of this.guiList){
			gui.setX(gui.x + deltaX);
		}
	}

	setY(y){
		let deltaY = y - this.y;
		this.y = y;

		for(let gui of this.guiList){
			gui.setY(gui.y + deltaY);
		}
	}

	setActive(active){
		this.active = active;
		for(let gui of this.guiList){
			gui.setActive(active);
		}
	}

	removeFromGame(){
		let removeIndex = guiList.indexOf(this);
		if(removeIndex >= 0) guiList.splice(removeIndex, 1);
	}

	press(){
		let handled;
		if(this.stopClicks && this.active){
			handled = true;
			console.log(this);
		}
		else{
			handled = false;
		}

		return handled;
	}

	pressAnywhere(){

	}

	release(){
		
	}

	beginHover(){
		this.hovered = true;
		this.onHoverBeginFunction();
	}

	endHover(){
		this.hovered = false;
		this.onHoverEndFunction();
	}

	drawSelf(){
		if(this.active && this.draw){
			if(this.texture){
				noSmooth();
				image(this.texture, this.x, this.y, this.w, this.h);
			}
			else{
				noStroke();
				fill(this.drawColor);
				rect(this.x, this.y, this.w, this.h);
			}
		}
	}
}

class GuiGroup extends GuiComponent{
	constructor(x, y, z = 0){
		super(x, y, 0, 0, z)
		this.draw = false;
	}
}

class NineSlice extends GuiComponent{
	constructor(x, y, w, h, leftMargin = 0, rightMargin = 0, topMargin = 0, bottomMargin = 0, z = 0, tex = null){
		super(x, y, w, h, z, tex);
		this.leftMargin = leftMargin;
		this.rightMargin = rightMargin;
		this.topMargin = topMargin;
		this.bottomMargin = bottomMargin;
	}

	drawSelf(){
		if(!this.active) return;

		if(this.texture){
			let textureCenterWidth = this.texture.width - this.leftMargin - this.rightMargin
			let textureCenterHeight = this.texture.height - this.topMargin - this.bottomMargin;

			//percent sizes compared to full texture size.
			let leftMarginPercent = this.leftMargin/this.texture.width;
			let rightMarginPercent = this.rightMargin/this.texture.width;
			let topMarginPercent = this.topMargin/this.texture.height;
			let bottomMarginPercent = this.bottomMargin/this.texture.height;
			let centerWidthPercent = textureCenterWidth/this.texture.width;
			let centerHeightPercent = textureCenterHeight/this.texture.height;

			let leftWidth = this.leftMargin;
			let rightWidth = this.rightMargin;
			let topHeight = this.topMargin;
			let bottomHeight = this.bottomMargin;
			let centerWidth = this.w - leftWidth - rightWidth;
			let centerHeight = this.h - topHeight - bottomHeight;

			//topLeft
			image(this.texture, this.x, this.y, leftWidth, topHeight, 0, 0, this.leftMargin, this.topMargin);
			//left
			image(this.texture, this.x, this.y + topHeight, leftWidth, centerHeight, 0, this.topMargin, this.leftMargin, textureCenterHeight);
			//bottomLeft
			image(this.texture, this.x, this.y + topHeight + centerHeight, leftWidth, bottomHeight, 0, this.topMargin + textureCenterHeight, this.leftMargin, this.bottomMargin);

			//top
			image(this.texture, this.x + leftWidth, this.y, centerWidth, topHeight, this.leftMargin, 0, textureCenterWidth, this.topMargin);
			//center
			image(this.texture, this.x + leftWidth, this.y + topHeight, centerWidth, centerHeight, this.leftMargin, this.topMargin, textureCenterWidth, textureCenterHeight);
			//bottom
			image(this.texture, this.x + leftWidth, this.y + topHeight + centerHeight, centerWidth, bottomHeight, this.leftMargin, this.topMargin + textureCenterHeight, textureCenterWidth, this.bottomMargin);

			//topRight
			image(this.texture, this.x + leftWidth + centerWidth, this.y, rightWidth, topHeight, this.leftMargin + textureCenterWidth, 0, this.rightMargin, this.topMargin);
			//right
			image(this.texture, this.x + leftWidth + centerWidth, this.y + topHeight, rightWidth, centerHeight, this.leftMargin + textureCenterWidth, this.topMargin, this.rightMargin, textureCenterHeight);
			//bottomRight
			image(this.texture, this.x + leftWidth + centerWidth, this.y + topHeight + centerHeight, rightWidth, bottomHeight, this.leftMargin + textureCenterWidth, this.topMargin + textureCenterHeight, this.rightMargin, this.bottomMargin);

		}
		else{
			noFill();
			strokeWeight(1);
			stroke(color("black"));
			rect(this.x, this.y, this.w, this.h);
		}
	}
}

class Button extends NineSlice{
	constructor(x, y, w, h, leftMargin = 0, rightMargin = 0, topMargin = 0, bottomMargin = 0, z = 0, onClickFunction = null){
		super(x, y, w, h, leftMargin, rightMargin, topMargin, bottomMargin, z);
		this.onClickFunction = onClickFunction;
		this.onClickOffFunction = null;
		this.pressed = false;
		this.outTexture = null;
		this.inTexture = null;
		this.stopClicks = true;

		this.travelDistance = 4;
		this.lockIn = false;
		this.disabled = false;

		this.textComponent = new TextComponent(x + w/2, y + h/2, z + 2, "");
		this.textComponent.fontSize = 25;
		this.textComponent.horizontalAlign = CENTER;
		this.textComponent.verticalAlign = CENTER;
		this.textComponent.font = fontMinecraft;
		this.textComponent.fontColor = color("white");
		this.addGui(this.textComponent);

		this.buttonDownCallback = null;
		this.buttonUpCallback = null;
	}

	setOutTexture(tex){
		this.outTexture = tex;
		this.updateTexture();
	}

	setInTexture(tex){
		this.inTexture = tex;
		this.updateTexture();
	}

	updateTexture(){
		if (this.pressed) {
			this.texture = this.inTexture;
		}
		else{
			this.texture = this.outTexture;
		}
	}

	endHover(){
		super.endHover();
		if(this.pressed && !this.lockIn) this.release();
	}

	press(){
		if(this.buttonDownCallback) this.buttonDownCallback();

		this.pressed = true;
		for(let child of this.guiList){
			child.setY(child.y + this.travelDistance);
		}
		this.texture = this.inTexture;
		if(this.onClickFunction && !this.disabled) this.onClickFunction();


		let handled = true;
		return handled;
	}

	pressAnywhere(){
		if(this.onClickOffFunction) this.onClickOffFunction();
	}

	release(){
		if(this.buttonUpCallback) this.buttonUpCallback();
		this.pressed = false;
		for(let child of this.guiList){
			child.setY(child.y - this.travelDistance);
		}
		this.texture = this.outTexture;

	}

	drawSelf(){
		super.drawSelf();
		if(this.active){
			if(this.disabled){
				fill(color("rgba(0,0,0,.40)"));
				noStroke();
				rect(this.x, this.y, this.w, this.h);
			}
			else if(this.hovered){
				fill(color("rgba(255,255,255,.15)"));
				noStroke();
				rect(this.x, this.y, this.w, this.h);
			}
		}
	}
}

class RadioButtonGroup extends GuiComponent{
	constructor(x, y, w, h, leftMargin = 0, rightMargin = 0, topMargin = 0, bottomMargin = 0, z = 0, numButtons = 1, horizontal = true){
		super(x, y, z);
		this.buttonList = [];
		this.draw = false;

		if(horizontal){
			let individualWidth = w/numButtons;
			for(let i = 0 ; i < numButtons ; i++){
				this.buttonComponent = new Button(x + individualWidth*i, y, individualWidth, h, leftMargin, rightMargin, topMargin, bottomMargin, z);
				this.addGui(this.buttonComponent);
				this.buttonComponent.lockIn = true;
				this.buttonList.push(this.buttonComponent);
			}
		}
		else{
			let individualHeight = h/numButtons;
			for(let i = 0 ; i < numButtons ; i++){
				this.buttonComponent = new Button(x, y + individualHeight*i, w, individualHeight, leftMargin, rightMargin, topMargin, bottomMargin, z);
				this.addGui(this.buttonComponent);
				this.buttonList.push(this.buttonComponent);
			}
		}

		for(let button of this.buttonList){
			button.setOutTexture(Art.blueButton2Out);
			button.setInTexture(Art.blueButton2In);

			button.buttonDownCallback = this.popOutAll.bind(this);
		}
	}

	popOutAll(){
		for(let button of this.buttonList){
			if( button.pressed ) button.release();
		}
	}
}

class imageButton extends GuiComponent{
	constructor(x, y, w, h, leftMargin = 0, rightMargin = 0, topMargin = 0, bottomMargin = 0, z = 0, onClickFunction = null, image = null){
		super(x, y, z);
		this.draw = false;

		this.buttonComponent = new Button(x, y, w, h, leftMargin, rightMargin, topMargin, bottomMargin, z, onClickFunction);
		this.addGui(this.buttonComponent);

		this.spriteWidth = 32;
		this.spriteHeight = 32;

		this.spriteComponent = new GuiComponent(this.buttonComponent.x + this.buttonComponent.w/2 - this.spriteWidth/2, this.buttonComponent.y + this.buttonComponent.h/2 - this.spriteHeight/2, spriteWidth, spriteHeight, z + 1);
		this.spriteComponent.texture = image;
		this.addGui(this.spriteComponent);
	}
}

class TowerButton extends GuiComponent{
	constructor(x, y, z = 0){
		super(x, y, 0, 0, z);
		this.draw = false;

		this.towerClass = null;

		this.buttonComponent = new Button(x, y, 64, 90, 7, 7, 7, 7, z);
		this.addGui(this.buttonComponent);

		let centerWidth = this.buttonComponent.w - this.buttonComponent.leftMargin - this.buttonComponent.rightMargin;

		this.spriteComponent = new GuiComponent(this.buttonComponent.x + this.buttonComponent.leftMargin, this.buttonComponent.y + this.buttonComponent.topMargin, centerWidth, centerWidth, z + 2);
		this.addGui(this.spriteComponent);

		this.costComponent = new SpriteAndText(x + this.buttonComponent.leftMargin - 15, y +45, 50, 50, z + 2, Art.goldCoin, "???");
		this.costComponent.fontSize = 17;
		this.costComponent.textSeparation = -15;
		this.costComponent.fontColor = color("yellow");
		this.addGui(this.costComponent);

		this.spriteTextBackgroundComponent = new GuiComponent(this.buttonComponent.x + this.buttonComponent.leftMargin, this.costComponent.y + (this.buttonComponent.textComponent.fontSize+2)/2, centerWidth, this.buttonComponent.textComponent.fontSize-4, z + 1);
		this.spriteTextBackgroundComponent.drawColor = color("rgba(0,0,0,.3)");
		this.addGui(this.spriteTextBackgroundComponent);

		this.buttonComponent.buttonDownCallback = this.press.bind(this);
		this.buttonComponent.buttonUpCallback = this.release.bind(this);
	}

	press(){
		this.costComponent.setY(this.costComponent.y + this.buttonComponent.travelDistance);
		this.spriteTextBackgroundComponent.setY(this.spriteTextBackgroundComponent.y + this.buttonComponent.travelDistance);
		this.spriteComponent.setY(this.spriteComponent.y + this.buttonComponent.travelDistance);
		super.press();
	}

	release(){
		this.costComponent.setY(this.costComponent.y - this.buttonComponent.travelDistance);
		this.spriteTextBackgroundComponent.setY(this.spriteTextBackgroundComponent.y - this.buttonComponent.travelDistance);
		this.spriteComponent.setY(this.spriteComponent.y - this.buttonComponent.travelDistance);
	}

	setOutTexture(tex){
		this.buttonComponent.outTexture = tex;
		this.buttonComponent.updateTexture();
	}

	setInTexture(tex){
		this.buttonComponent.inTexture = tex;
		this.buttonComponent.updateTexture();
	}

	setTowerClass(_towerClass){	}
}

class TowerSelectButton extends TowerButton{
	setTowerClass(_towerClass){
		this.towerClass = _towerClass;
		if(this.towerClass){
			this.buttonComponent.onClickFunction = function(){
				beginTowerPlacement(this.parent.towerClass);
			}
			this.costComponent.text = this.towerClass.price;
			this.spriteComponent.texture = this.towerClass.animationFrames[0];
		}
	}
}

class TowerUpgradeButton extends TowerButton{
	constructor(x, y, z = 0){
		super(x, y, z);
		this.confirm = false;
			
		this.buttonComponent.onClickOffFunction = function(){
			this.parent.reset();
		}
	}

	setTowerClass(_towerClass){
		this.towerClass = _towerClass;
		if(this.towerClass){
			this.buttonComponent.onClickFunction = function(){
				if(this.parent.confirm){
					upgradeSelectedTower(this.parent.towerClass);
					this.parent.confirm = false;
				}
				else{
					this.parent.confirm = true;
					this.parent.spriteComponent.texture = Art.checkMark;
					towerDetailsPanel.setTowerClass(this.parent.towerClass);
				}
			}
			this.costComponent.text = this.towerClass.price;
			this.spriteComponent.texture = this.towerClass.animationFrames[0];
		}
	}

	reset(){
		this.spriteComponent.texture = this.towerClass.animationFrames[0];
		this.confirm = false;
	}
}

class TowerSellButton extends TowerButton{
	constructor(x, y, z = 0){
		super(x, y, z)
		this.confirm = false;

		this.buttonComponent.onClickOffFunction = function(){
			this.parent.reset();
		}
	}

	setTowerClass(_towerClass){
		this.towerClass = _towerClass;
		if(this.towerClass){
			this.buttonComponent.onClickFunction = function(){
				if(this.parent.confirm){
					sellSelectedTower();
					this.parent.confirm = false;
				}
				else{
					this.parent.confirm = true;
					this.parent.spriteComponent.texture = Art.checkMark;
					towerDetailsPanel.setTowerClass(this.parent.towerClass);
				}
			}
			this.costComponent.text = this.towerClass.price;
			this.spriteComponent.texture = Art.goldCoinStack;
		}
	}

	reset(){
		this.spriteComponent.texture = Art.goldCoinStack;
		this.confirm = false;
	}
}

class TextComponent extends GuiComponent{
	constructor(x, y, z = 0, text = ""){
		super(x, y, 0, 0, z);
		this.text = text;
		this.font = fontMinecraft;
		this.fontSize = 25;
		this.fontColor = color("white");
		this.horizontalAlign = LEFT;
		this.verticalAlign = TOP;
 
		this.shadow = true;
		this.shadowOffset = this.fontSize/10;
		this.shadowColor = color("rgba(0,0,0,.5)");

	}

	drawSelf(){
		if(this.active){

			textFont(this.font);
			textSize(this.fontSize);
			noStroke();
	  		textAlign(this.horizontalAlign, this.verticalAlign);

			if(this.shadow == true){
				fill(this.shadowColor);
				text(this.text, this.x + this.shadowOffset, this.y + this.shadowOffset);
			}

			
			fill(this.fontColor);
			text(this.text, this.x, this.y);
		}
	}
}

class SpriteAndText extends GuiComponent{
	constructor(x, y, w, h, z = 0, tex = null, text = ""){
		super(x, y, w, h, z, tex);
		this.text = text;

		this.fontSize = 25;
		this.fontColor = color("white");
		this.textSeparation = 0;
	}

	drawSelf(){
		super.drawSelf();
		if(this.active){
			noStroke();
	 		textSize(this.fontSize);
	  		textAlign(LEFT, CENTER);
	  		fill(this.fontColor);
			text(this.text, this.x + this.w + this.textSeparation, this.y + this.h / 2);
		}
	}
}

class StatBlock extends GuiGroup{
	constructor(x, y, sprite, z = 0, textBoxWidth = 48){
		super(x, y, z);

		//settings
		let spriteSize = 32;
		let textBoxHeight = 24;
		let padding = 4;
		let font = fontMinecraft;

		//derived from settings

		let textBoxverticalOffset = (spriteSize - textBoxHeight)/2; 
		let fontSize = textBoxHeight - padding*2;
		let textHeight = font.textBounds("ABCDEF", 0, 0, fontSize).h;

		//create graphic component
		this.spriteComponent = new GuiComponent(this.x, this.y, spriteSize, spriteSize, z);
		this.spriteComponent.texture = sprite;
		this.addGui(this.spriteComponent);

		//create text background
		this.backgroundComponent = new GuiComponent(this.x + spriteSize, this.y + textBoxverticalOffset, textBoxWidth, textBoxHeight, z);
		this.backgroundComponent.drawColor = color("rgba(0,0,0,.4)");
		this.addGui(this.backgroundComponent);

		//create textBox component
		this.textBoxComponent = new TextBox(this.x + spriteSize + padding, this.y + (textBoxHeight - textHeight)/2 + textBoxverticalOffset, textBoxWidth - 2 * padding, textBoxHeight - 2 * padding, "", z+1, "horizontal");
		this.textBoxComponent.setFontSize(fontSize);
		this.addGui(this.textBoxComponent);
	}

	setText(text){
		this.textBoxComponent.setText(text);
	}

	setFontColor(newColor){
		this.textBoxComponent.fontColor = newColor;
	}
}

class TowerDisplayPanel extends GuiComponent{
	constructor(x, y, z = 0){
		super(x, y);
		this.draw = false;

		this.towerClass = null;
		this.towerInstance = null;

		let panelWidth = screenWidth - playAreaWidth;
		let panelHeight = 172;

		let spriteSize = gridScale;
		let textSpriteSize = gridScale;

		let sideMargin = 10;
		let topMargin = 10;
		let fontColor = color("white");
		let textBackgroundColor = color("rgba(0,0,0,.4)");
		let textBoxHeight = 60;
		let textBoxFontSize = 15;
		let innerMargin = 4;

		let statBoxesYStart = topMargin + spriteSize + 2*innerMargin + textBoxHeight + 2*innerMargin;
		let statBoxOffset = -6;
		let fontSize = 16;
		let textBackgroundSize = 20;

		//background

		this.backgroundComponent = new NineSlice(this.x, this.y, panelWidth, panelHeight, 5, 5, 5, 5, z);
		this.backgroundComponent.texture = Art.grayBackground;
		this.addGui(this.backgroundComponent);

		//sprite

		this.spriteComponent = new GuiComponent(this.x + sideMargin, this.y + topMargin, spriteSize, spriteSize, z + 2);
		this.spriteComponent.active = false;
		this.addGui(this.spriteComponent);

		this.cameraComponent = new Camera(0, 0, gridScale, gridScale, this.x + sideMargin, this.y + topMargin, spriteSize, spriteSize, z + 2);
		this.cameraComponent.active = false;
		this.addGui(this.cameraComponent);

		this.spriteComponentBackground = new GuiComponent(this.x + sideMargin, this.y + topMargin, spriteSize, spriteSize, z + 1);
		this.spriteComponentBackground.drawColor = textBackgroundColor;
		this.addGui(this.spriteComponentBackground);

		//title

		this.titleComponent = new TextBox(this.x + sideMargin + spriteSize + innerMargin*2, this.y + topMargin + innerMargin, panelWidth - sideMargin*2 - innerMargin*3 - spriteSize, fontSize, "title", z + 2);
		this.titleComponent.setFontSize(fontSize);
		this.titleComponent.fontColor = fontColor;
		this.addGui(this.titleComponent);

		this.titleComponentBackground = new GuiComponent(this.x + sideMargin + spriteSize + innerMargin, this.y + topMargin, panelWidth - sideMargin*2 - innerMargin - spriteSize, fontSize + innerMargin, z + 1);
		this.titleComponentBackground.drawColor = textBackgroundColor;
		this.addGui(this.titleComponentBackground);

		//description

		this.descriptionTextBox = new TextBox(this.x + sideMargin + innerMargin, this.y + topMargin + spriteSize + 2*innerMargin, panelWidth - 2*sideMargin - innerMargin, textBoxHeight, "", z+2);
		this.descriptionTextBox.setFontSize(textBoxFontSize);
		this.descriptionTextBox.fontColor = fontColor;
		this.addGui(this.descriptionTextBox);

		this.descriptionTextBoxBackground = new GuiComponent(this.x + sideMargin, this.y + topMargin + spriteSize + innerMargin, panelWidth - 2*sideMargin, textBoxHeight + 2*innerMargin, z + 1);
		this.descriptionTextBoxBackground.drawColor = textBackgroundColor;
		this.addGui(this.descriptionTextBoxBackground);

		//stat boxes

		this.costComponent = new StatBlock(this.x + sideMargin, this.y + statBoxesYStart + statBoxOffset, Art.goldCoinStack, z + 2);
		this.costComponent.setText("???");
		this.addGui(this.costComponent);

		this.damageComponent = new StatBlock(this.x + sideMargin, this.y + statBoxesYStart + textBackgroundSize + innerMargin + statBoxOffset, Art.sword,z + 2);
		this.damageComponent.setText("???");
		this.addGui(this.damageComponent);

		this.rangeComponent = new StatBlock(this.x + panelWidth/2 + innerMargin, this.y + statBoxesYStart + statBoxOffset, Art.eyeball, z + 2);
		this.rangeComponent.setText("???");
		this.addGui(this.rangeComponent);

		this.speedComponent = new StatBlock(this.x + panelWidth/2 + innerMargin, this.y + statBoxesYStart + textBackgroundSize + innerMargin + statBoxOffset, Art.ninjaStar0, z + 2);
		this.speedComponent.setText("???");
		this.addGui(this.speedComponent);
	}

	setOutTexture(tex){
		this.buttonComponent.outTexture = tex;
		this.buttonComponent.updateTexture();
	}

	setInTexture(tex){
		this.buttonComponent.inTexture = tex;
		this.buttonComponent.updateTexture();
	}

	setTowerClass(_towerClass){
		this.cameraComponent.setActive(false);
		this.spriteComponent.setActive(true);
		if(this.towerInstance){
			this.towerInstance.onStatUpdated = function(){};
		}
		this.towerClass = _towerClass;
		this.towerInstance = null;;
		if(this.towerClass){
			this.spriteComponent.texture = this.towerClass.animationFrames[0];
			this.costComponent.setText(this.towerClass.price);

			this.damageComponent.setFontColor(color("white"));
			this.damageComponent.setText(this.towerClass.damage);

			this.rangeComponent.setFontColor(color("white"));
			this.rangeComponent.setText(this.towerClass.range);

			this.speedComponent.setFontColor(color("white"));
			this.speedComponent.setText(this.towerClass.speed);

			this.titleComponent.setText(this.towerClass.unitName);
			this.descriptionTextBox.setText(this.towerClass.description);
		}else{
			this.setEmpty();
		}
	}

	setEmpty(){
		this.cameraComponent.setActive(false);
		this.spriteComponent.setActive(false);

		this.spriteComponent.texture = null;
		this.costComponent.setText("---");

		this.damageComponent.setFontColor(color("white"));
		this.damageComponent.setText("---");

		this.rangeComponent.setFontColor(color("white"));
		this.rangeComponent.setText("---");

		this.speedComponent.setFontColor(color("white"));
		this.speedComponent.setText("---");

		this.titleComponent.setText("---");
		this.descriptionTextBox.setText("");
	}

	setTowerInstance(_towerInstance){
		this.cameraComponent.setActive(true);
		this.spriteComponent.setActive(false);
		if(this.towerInstance){
			this.towerInstance.onStatUpdated = function(){};
		}
		if(_towerInstance){
			_towerInstance.onStatUpdated = this.updateInstanceValues.bind(this);

			this.cameraComponent.srcX = _towerInstance.x;
			this.cameraComponent.srcY = _towerInstance.y;

			this.towerInstance = _towerInstance;
			this.towerClass = null;
			this.updateInstanceValues();
		}
		else{
			this.setEmpty();
		}
	}

	updateInstanceValues(){
		if(this.towerInstance){
			this.spriteComponent.texture = this.towerInstance.animationFrames[0];

			this.cameraComponent.srcX = this.towerInstance.x;
			this.cameraComponent.srcY = this.towerInstance.y;

			this.costComponent.setText(this.towerInstance.getClass().price);

			let finalDamage = this.towerInstance.getDamage();
			let baseDamage = this.towerInstance.getBaseDamage()

			if(finalDamage > baseDamage){
				this.damageComponent.setFontColor(color("rgb(219,215,93)"));
			}
			else if(finalDamage < baseDamage){
				this.damageComponent.setFontColor(color("red"));
			}
			else{
				this.damageComponent.setFontColor(color("white"));
			}
			this.damageComponent.setText(this.towerInstance.getDamage());

			let finalRange = this.towerInstance.getRange();
			let baseRange = this.towerInstance.getBaseRange()

			if(finalRange > baseRange){
				this.rangeComponent.setFontColor(color("rgb(219,215,93)"));
			}
			else if(finalRange < baseRange){
				this.rangeComponent.setFontColor(color("red"));
			}
			else{
				this.rangeComponent.setFontColor(color("white"));
			}
			this.rangeComponent.setText(this.towerInstance.getRange());

			let finalSpeed = this.towerInstance.getSpeed();
			let baseSpeed = this.towerInstance.getBaseSpeed()

			if(finalSpeed > baseSpeed){
				this.speedComponent.setFontColor(color("rgb(219,215,93)"));
			}
			else if(finalSpeed < baseSpeed){
				this.speedComponent.setFontColor(color("red"));
			}
			else{
				this.speedComponent.setFontColor(color("white"));
			}
			this.speedComponent.setText(this.towerInstance.getSpeed());
			this.titleComponent.setText(this.towerInstance.unitName);
			this.descriptionTextBox.setText(this.towerInstance.description);
		}
	}
}

class Camera extends GuiComponent{
	constructor(srcX,srcY,srcW,srcH,destX,destY,destW,destH, z = 0){
		super(destX, destY, destW, destH, z, null);
		this.srcX = srcX;
		this.srcY = srcY;
		this.srcW = srcW;
		this.srcH = srcH;
		this.destX = destX;
		this.destY = destY;
		this.destW = destW;
		this.destH = destH;
	}

	drawSelf(){
		super.drawSelf();
		if(this.active){
			let c = get(this.srcX, this.srcY, this.srcW, this.srcH);
			image(c, this.destX, this.destY, this.destW, this.destH);
		}
	}
}

class TextBox extends GuiComponent{
	constructor(x, y, w, h, text = "", z = 0, scrollAxis = "vertical"){
		super(x, y, w, h, z, null);
		this.textLines = [];
		this.font = fontMinecraft;
		this.fontSize = 25;
		this.fontColor = color("white");
		this.textHeight = 0;
		this.scrollAxis = scrollAxis;
		this.textHeight = 0;
		this.textWidth = 0;
 
		this.shadow = true;
		this.shadowOffset = this.fontSize/10;
		this.shadowColor = color("rgba(0,0,0,.5)");

		this.setText(text);

		this.autoScroll = true;
		this.scrollSpeed = .75;
		this.scrollPause = 20;
		this.scrollPauseCurrent = this.scrollPause;
		this.scrollAmount = 0;
		this.autoScrollDirection = 1;


		this.textCanvas = createGraphics(this.w, this.h);
	}

	setText(text){
		this.text = text;
		this.scrollAmount = 0;
		this.autoScrollDirection = 1;
		this.scrollPauseCurrent = this.scrollPause;
		this.textLines = [];
		if(this.scrollAxis == "vertical"){
			this.setTextVertical(text);
		}
		else{
			this.setTextHorizontal(text);
		}
	}

	setFontSize(fontSize){
		this.fontSize = fontSize;
		this.setText(this.text);
	}

	setTextVertical(text){
		let currentLineIndex = 0;
		let currentLine = "";
		let thisLineHasSpace = false;
		for(let i = 0 ; i < text.length ; i++){
			thisLineHasSpace = (thisLineHasSpace || text[i] == " ");
			let potentialNewString = currentLine + text[i];
			let potentialNewStringBB = this.font.textBounds(potentialNewString, 0, 0, this.fontSize);
			if(potentialNewStringBB.w > this.w){
				//save what we've got and go to the next line
				this.textLines[currentLineIndex] = currentLine;
				if(text[i] != " " && thisLineHasSpace){
					while(i > 0 && text[i] != " "){
						i--;
						this.textLines[currentLineIndex] = this.textLines[currentLineIndex].slice(0, this.textLines[currentLineIndex].length - 1);
					}
				}
				currentLine = "";
				currentLineIndex++;
				thisLineHasSpace = false;
			}
			else{
				//add to our current line
				currentLine += text[i];
			}
		}
		this.textLines[currentLineIndex] = currentLine;
		this.textHeight = this.textLines.length * this.fontSize;
		this.textWidth = this.w;
	}

	setTextHorizontal(text){
		this.textLines.push(text);
		this.textHeight = this.fontSize;
		this.textWidth = this.font.textBounds(this.textLines[0], 0, 0, this.fontSize).w;
	}

	update(dTime){
		if(this.scrollAxis == "vertical"){
			this.updateVertical(dTime);
		}
		else{
			this.updateHorizontal(dTime);
		}
		this.scrollPauseCurrent -= dTime;
	}

	updateVertical(dTime){
		if(this.scrollPauseCurrent <= 0){
			//scroll
			if(this.autoScrollDirection){
				this.scrollAmount += this.scrollSpeed*dTime;
				if(this.scrollAmount >= this.textHeight - this.h){
					this.scrollPauseCurrent = this.scrollPause
					this.autoScrollDirection = 0;
				}
			}
			else{
				this.scrollAmount -= this.scrollSpeed*dTime;
				if(this.scrollAmount <= 0){
					this.scrollPauseCurrent = this.scrollPause
					this.autoScrollDirection = 1;
				}
			}
		}
	}

	updateHorizontal(dTime){
		if(this.scrollPauseCurrent <= 0){
			//scroll
			if(this.autoScrollDirection){
				this.scrollAmount += this.scrollSpeed*dTime;
				if(this.scrollAmount >= this.textWidth - this.w){
					this.scrollPauseCurrent = this.scrollPause
					this.autoScrollDirection = 0;
				}
			}
			else{
				this.scrollAmount -= this.scrollSpeed*dTime;
				if(this.scrollAmount <= 0){
					this.scrollPauseCurrent = this.scrollPause
					this.autoScrollDirection = 1;
				}
			}
		}
	}

	drawSelf(){
		if(this.active){
			this.textCanvas.clear();
			this.textCanvas.textFont(this.font);
			this.textCanvas.textSize(this.fontSize);
			this.textCanvas.noStroke();
			this.textCanvas.fill(this.fontColor);
	  		this.textCanvas.textAlign(LEFT, TOP);

	  		if(this.scrollAxis == "vertical"){
				for(let i = 0 ; i < this.textLines.length ; i++){
					if(this.shadow == true){
						this.textCanvas.fill(this.shadowColor);
						this.textCanvas.text(this.textLines[i], this.shadowOffset, i*this.fontSize - this.scrollAmount + this.shadowOffset);
					}
					this.textCanvas.fill(this.fontColor);
					this.textCanvas.text(this.textLines[i], 0, i*this.fontSize - this.scrollAmount);
				}
			}
			else{
				if(this.shadow == true){
					this.textCanvas.fill(this.shadowColor);
					this.textCanvas.text(this.textLines[0], this.shadowOffset - this.scrollAmount, this.shadowOffset);
				}
				this.textCanvas.fill(this.fontColor);
				this.textCanvas.text(this.textLines[0], -this.scrollAmount, 0);
			}
			

			image(this.textCanvas, this.x, this.y);
		}
	}
}

class PlayerDisplayPanel extends GuiComponent{
	constructor(x, y, z = 0){
		super(x, y);
		this.draw = false;

		let panelWidth = screenWidth - playAreaWidth;
		let panelHeight = 77;

		let sideMargin = 10;
		let topMargin = 10;
		let innerMargin = 4;

		this.fontColor = color("white");
		let fontSize = 16;
		let textBackgroundColor = color("rgba(0,0,0,.4)");
		let textBackgroundSize = 20;

		let statBoxOffset = 6;
		let verticalSeparation = 8;

		this.animationPercent = 1;

		//background

		this.backgroundComponent = new NineSlice(this.x, this.y, panelWidth, panelHeight, 5, 5, 5, 5, z);
		this.backgroundComponent.texture = Art.grayBackground;
		this.addGui(this.backgroundComponent);

		this.goldComponent = new StatBlock(this.x + sideMargin, this.y + topMargin, Art.goldCoinStack, z + 2, panelWidth - sideMargin*2 - 32);
		this.goldComponent.setText("???");
		this.addGui(this.goldComponent);

		this.healthComponent = new StatBlock(this.x + sideMargin, this.y + topMargin + verticalSeparation + textBackgroundSize, Art.heart, z + 2, panelWidth - sideMargin*2 - 32);
		this.healthComponent.setText("???");
		this.addGui(this.healthComponent);
	}

	update(deltaTime){
		if(this.animationPercent < 1){
			this.animationPercent += deltaTime*.07;
			//this.goldComponent.setFontColor(color("rgba(" + Math.sin(this.animationPercent)*255 + ",0,0)"));
			let lerp = (Math.sin(this.animationPercent*17)+1)/2;
			console.log("AP: " + this.animationPercent);
			console.log("Lerp: " + lerp);
			this.goldComponent.setFontColor(lerpColor(this.fontColor, color("red"), lerp));
		}else{
			this.goldComponent.setFontColor(this.fontColor);
		}
	}

	moneyAlert(){
		this.animationPercent = 0;
	}
}

class TimelineDisplay extends GuiComponent{
	constructor(x, y, z = 0){
		super(x, y, z);
		this.draw = false;

		let panelWidth = playAreaWidth;
		let panelHeight = screenHeight - playAreaHeight;

		this.timelineTimeLength = 500;
		this.spriteSize = 16;
		this.sideMargin = 10;

		this.backgroundComponent = new NineSlice(this.x, this.y, panelWidth, panelHeight, 5, 5, 5, 5, z-2);
		this.backgroundComponent.texture = Art.grayBackground;
		this.addGui(this.backgroundComponent);
	}

	drawSelf(){
		if(this.active){
			let width = this.backgroundComponent.w;
			let height = this.backgroundComponent.h;
			let lineWidth = width - (this.sideMargin * 2);

			strokeWeight(1);
			stroke(color("black"));
			line(this.x + this.sideMargin, this.y + height/2, this.x + width - this.sideMargin, this.y + height/2);

			let spawns = Timeline.spawns();

			for(let i = 0 ; i < Timeline.totalSpawns() ; i++){
				let time = Timeline.time(i);
				if(time > Timeline.levelTimer && time < Timeline.levelTimer + this.timelineTimeLength){
					let ratio = (time - Timeline.levelTimer)/this.timelineTimeLength;
					let enemyClass = getClassFromEnemyID(Timeline.enemyID(i));
					push()
					translate(this.x + width - this.sideMargin - (lineWidth * ratio), this.y + height/2);
					scale(-1,1);
					image(enemyClass.animationFrames[0], -this.spriteSize/2, -this.spriteSize/2, this.spriteSize, this.spriteSize);
					pop()
				}
			}
		}
		super.drawSelf();
	}
}

class TowerSelectPanel extends GuiComponent{
	constructor(x, y, z = 0){
		super(x, y, z);
		this.draw = false;
		let panelWidth = screenWidth - playAreaWidth;

		this.panelBackground = new NineSlice(this.x, this.y, panelWidth, playAreaHeight - 280, 8, 8, 8, 8, 0, Art.grayBackground);
		this.addGui(this.panelBackground);

		this.arrowTowerButton = new TowerSelectButton(this.x + 20, this.y + 20, 1);
		this.arrowTowerButton.setInTexture(Art.greenButton2In);
		this.arrowTowerButton.setOutTexture(Art.greenButton2Out);
		this.arrowTowerButton.setTowerClass(ArrowTowerLevel1);
		this.addGui(this.arrowTowerButton);

		this.beamTowerButton = new TowerSelectButton(this.x + 20, this.y + 124, 1);
		this.beamTowerButton.setInTexture(Art.blueButton2In);
		this.beamTowerButton.setOutTexture(Art.blueButton2Out);
		this.beamTowerButton.setTowerClass(BeamTowerLevel1);
		this.addGui(this.beamTowerButton);

		this.earthquakeTowerButton = new TowerSelectButton(this.x + 110, this.y + 20, 1);
		this.earthquakeTowerButton.setInTexture(Art.redButton2In);
		this.earthquakeTowerButton.setOutTexture(Art.redButton2Out);
		this.earthquakeTowerButton.setTowerClass(EarthquakeTowerLevel1);
		this.addGui(this.earthquakeTowerButton);

		this.bombTowerButton = new TowerSelectButton(this.x + 110, this.y + 124, 1);
		this.bombTowerButton.setInTexture(Art.yellowButton2In);
		this.bombTowerButton.setOutTexture(Art.yellowButton2Out);
		this.bombTowerButton.setTowerClass(BombTowerLevel1);
		this.addGui(this.bombTowerButton);
	}
}

class TowerRadialSelector extends GuiComponent{
	constructor(x, y, z = 0){
		super(x, y, z);
		this.draw = false;
		this.margin = 8;

		this.buttonMargin = 2;

		this.upgradeButton1 = new RadialTowerButton(this.x - 36 - this.margin, this.y, 1);
		this.upgradeButton1.setInTexture(Art.greenButton2In);
		this.upgradeButton1.setOutTexture(Art.greenButton2Out);
		this.addGui(this.upgradeButton1);

		this.upgradeButton2 = new RadialTowerButton(this.x - this.buttonMargin, this.y - 36 - this.margin, 1);
		this.upgradeButton2.setInTexture(Art.blueButton2In);
		this.upgradeButton2.setOutTexture(Art.blueButton2Out);
		this.addGui(this.upgradeButton2);

		this.upgradeButton3 = new RadialTowerButton(this.x + gridScale + this.margin, this.y, 1);
		this.upgradeButton3.setInTexture(Art.redButton2In);
		this.upgradeButton3.setOutTexture(Art.redButton2Out);
		this.addGui(this.upgradeButton3);

		this.sellButton = new RadialSellButton(this.x - this.buttonMargin, this.y + gridScale + this.margin, 1);
		this.sellButton.setInTexture(Art.yellowButton2In);
		this.sellButton.setOutTexture(Art.yellowButton2Out);
		this.addGui(this.sellButton);

		this.animationPercent = 0;
	}

	update(deltaTime){
		if(this.animationPercent < 1.05){
			this.animationPercent += deltaTime*.3;
			this.updateAnimation(this.animationPercent);
		}
		else{
			this.updateAnimation(1);
		}
	}

	updateAnimation(progress){
		let upgradeButton1TargetRot = 90;
		let upgradeButton2TargetRot = 180;
		let upgradeButton3TargetRot = 270;
		let sellButtonTargetRot = 0;

		let offset = 90;

		let upgradeButton1CurrentRot = upgradeButton1TargetRot * progress;
		let upgradeButton2CurrentRot = upgradeButton2TargetRot * progress;
		let upgradeButton3CurrentRot = upgradeButton3TargetRot * progress;
		let sellButtonCurrentRot = sellButtonTargetRot * progress;

		let circleX = this.x - this.buttonMargin;
		let circleY = this.y - this.buttonMargin;

		let circleRadius = gridScale + this.margin + this.buttonMargin;

		this.upgradeButton1.setX(circleX + Math.cos(degrees_to_radians(upgradeButton1CurrentRot + offset)) * circleRadius);
		this.upgradeButton1.setY(circleY + Math.sin(degrees_to_radians(upgradeButton1CurrentRot + offset)) * circleRadius);
		this.upgradeButton2.setX(circleX + Math.cos(degrees_to_radians(upgradeButton2CurrentRot + offset)) * circleRadius);
		this.upgradeButton2.setY(circleY + Math.sin(degrees_to_radians(upgradeButton2CurrentRot + offset)) * circleRadius);
		this.upgradeButton3.setX(circleX + Math.cos(degrees_to_radians(upgradeButton3CurrentRot + offset)) * circleRadius);
		this.upgradeButton3.setY(circleY + Math.sin(degrees_to_radians(upgradeButton3CurrentRot + offset)) * circleRadius);
		this.sellButton.setX(circleX + Math.cos(degrees_to_radians(sellButtonCurrentRot + offset)) * circleRadius);
		this.sellButton.setY(circleY + Math.sin(degrees_to_radians(sellButtonCurrentRot + offset)) * circleRadius);
	}

	setUnit(unit){
		this.setX(unit.x);
		this.setY(unit.y);
		this.animationPercent = 0;

		let upgrades = unit.getUpgrades();
		if(upgrades[0]){
			this.upgradeButton1.setClass(upgrades[0]);
			this.upgradeButton1.setActive(true);
		}else{
			this.upgradeButton1.setActive(false);
		}

		if(upgrades[1]){
			this.upgradeButton2.setClass(upgrades[1]);
			this.upgradeButton2.setActive(true);
		}else{
			this.upgradeButton2.setActive(false);
		}

		if(upgrades[2]){
			this.upgradeButton3.setClass(upgrades[1]);
			this.upgradeButton3.setActive(true);
		}else{
			this.upgradeButton3.setActive(false);
		}

		if(!unit.permanent){
			this.sellButton.setUnit(unit);
			this.sellButton.setActive(true);
		}
		else{
			this.sellButton.setActive(false);
		}
	}
}

class RadialButton extends Button{
	constructor(x, y, z){
		super(x, y, 36, 36, 4, 4, 4, 4, z);
		this.margin = 2
		let textBackgroundColor = color("rgba(0,0,0,.6)");

		let textBoxHeight = 12

		//sprite
		this.spriteComponent = new GuiComponent(this.x + this.margin, this.y + this.margin, gridScale, gridScale, z + 1);
		this.spriteComponent.texture = Art.fireElementalist0;
		this.spriteComponent.stopClicks = false;
		this.addGui(this.spriteComponent);

		//textBox
		this.textComponent = new TextComponent(this.x + this.margin + gridScale/2, this.y + this.margin + gridScale - (textBoxHeight/2), z+3, "100");
		this.textComponent.fontSize = 14;
		this.textComponent.horizontalAlign = CENTER;
		this.textComponent.verticalAlign = CENTER;
		this.textComponent.fontColor = color("yellow");
		this.textComponent.stopClicks = false;
		this.addGui(this.textComponent);

		this.textComponentBackground = new GuiComponent(this.x + this.margin, this.y + this.margin + gridScale - textBoxHeight, gridScale, textBoxHeight, z + 2);
		this.textComponentBackground.drawColor = textBackgroundColor;
		this.textComponentBackground.stopClicks = false;
		this.addGui(this.textComponentBackground);
	}
}

class RadialTowerButton extends RadialButton{
	setClass(_class){
		this.spriteComponent.texture = _class.animationFrames[0];
		this.textComponent.text = _class.price;

		this.onClickFunction = function(){
			upgradeSelectedTower(_class);
		}
	}
}

class RadialSellButton extends RadialButton{
	setUnit(unit){
		this.spriteComponent.texture = Art.goldCoinStack;
		this.textComponent.text = unit.getBasePrice();

		this.onClickFunction = function(){
			sellSelectedTower();
		}
	}
}

class TowerUpgradePanel extends GuiComponent{
	constructor(x, y, z = 0){
		super(x, y, z);
		this.draw = false;
		let panelWidth = screenWidth - playAreaWidth;
		this.towerButtonList = [];

		this.panelBackground = new NineSlice(this.x, this.y, panelWidth, playAreaHeight - 280, 8, 8, 8, 8, 0, Art.grayBackground);
		this.addGui(this.panelBackground);

		this.towerButton1 = new TowerUpgradeButton(this.x + 20, this.y + 20, 1);
		this.towerButton1.setInTexture(Art.greenButton2In);
		this.towerButton1.setOutTexture(Art.greenButton2Out);
		this.addGui(this.towerButton1);
		this.towerButtonList.push(this.towerButton1);

		this.towerButton2 = new TowerUpgradeButton(this.x + 20, this.y + 124, 1);
		this.towerButton2.setInTexture(Art.blueButton2In);
		this.towerButton2.setOutTexture(Art.blueButton2Out);
		this.addGui(this.towerButton2);
		this.towerButtonList.push(this.towerButton2);

		this.towerButton3 = new TowerUpgradeButton(this.x + 110, this.y + 20, 1);
		this.towerButton3.setInTexture(Art.redButton2In);
		this.towerButton3.setOutTexture(Art.redButton2Out);
		this.addGui(this.towerButton3);
		this.towerButtonList.push(this.towerButton3);

		this.sellButton = new TowerSellButton(this.x + 110, this.y + 124, 1);
		this.sellButton.setInTexture(Art.yellowButton2In);
		this.sellButton.setOutTexture(Art.yellowButton2Out);
		this.addGui(this.sellButton);
	}

	setTowerClass(towerInstance){
		let upgradeList = towerInstance.getUpgrades();
		for(let i = 0 ; i < this.towerButtonList.length ; i++){
			if(i < upgradeList.length){
				this.towerButtonList[i].setActive(true);
				this.towerButtonList[i].setTowerClass(upgradeList[i]);
			}
			else{
				this.towerButtonList[i].setActive(false);
			}
		}

		if(!towerInstance.permanent){
			this.sellButton.setActive(true)
			this.sellButton.setTowerClass(towerInstance.getClass());
		}
		else{
			this.sellButton.setActive(false)
		}
	}
}

class FlagButton extends Button{
	constructor(x, y, w, h, z){
		super(x, y, w, h, 0, 0, 0, 0, z);
		this.setInTexture(null);
		this.setOutTexture(null);
	}

	drawSelf(){
		if(DEBUG) super.drawSelf();
	}
}

class Flag extends GuiComponent{
	constructor(x, y, z, levelName){
		super(x, y, 2);
		this.draw = false;

		this.levelName = levelName;

		this.buttonSize = gridScale * 1.2;

		this.floatRangeOfMotion = 4;
		this.floatSpeed = .15;
		this.floatOffset = 25;

		this.buttonExtraHeight = 32;

		this.flagSprite = Art.crossedSwords;
		this.flagSpriteHighlighted = Art.crossedSwordsHighlighted; 

		this.timePassed = Math.random()/this.floatSpeed;

		this.flagShadow = new GuiComponent(this.x - this.buttonSize/2 + gridScale/2, this.y - this.buttonSize/2 + gridScale/2, this.buttonSize, this.buttonSize, z + 1);
		this.flagShadow.texture = Art.shadow;
		this.addGui(this.flagShadow);

		this.flagButton = new FlagButton(this.x - this.buttonSize/2 + gridScale/2, this.y - this.buttonSize/2 + gridScale/2 - this.buttonExtraHeight, this.buttonSize, this.buttonSize + this.buttonExtraHeight,  z + 4);
		this.addGui(this.flagButton);

		this.flagSpriteObject = new GuiComponent(this.x - this.buttonSize/2 + gridScale/2, this.y - this.buttonSize/2 - this.floatOffset + gridScale/2, this.buttonSize, this.buttonSize, z + 2);
		//this.flagSprite.texture = Art.crossedSwords;
		this.flagSpriteObject.texture = this.flagSprite;
		this.addGui(this.flagSpriteObject);

		this.flagButton.onHoverBeginFunction = this.flagHoverBegin.bind(this);
		this.flagButton.onHoverEndFunction = this.flagHoverEnd.bind(this);

		this.flagButton.onClickFunction = function(){
			console.log(this.levelName);
		}.bind(this);
	}

	update(deltaTime){
		this.timePassed+=deltaTime;
		this.flagSpriteObject.y = this.y - this.buttonSize/2  + gridScale/2 - this.floatOffset + Math.round(Math.sin(this.timePassed * this.floatSpeed) * this.floatRangeOfMotion); 
	}

	flagHoverBegin(){
		this.flagSpriteObject.texture = this.flagSpriteHighlighted;
	}

	flagHoverEnd(){
		this.flagSpriteObject.texture = this.flagSprite;
	}
}

class LevelPrompt extends GuiComponent{
	constructor(x, y, z){
		super(x, y, z);
		this.draw = false;

		let backgroundWidth = 250;
		let backgroundHeight = 64;
		this.promptBackground = new NineSlice(screenWidth/2 - backgroundWidth/2, playAreaHeight/2 - backgroundHeight/2, backgroundWidth, backgroundHeight, 8, 8, 8, 8, z, Art.grayBackground);
		this.addGui(this.promptBackground);

		let titleHeight = 40;
		let titleMargin = 12;  

		this.titleBackground = new NineSlice(screenWidth/2 - backgroundWidth/2 + titleMargin, playAreaHeight/2 - backgroundHeight/2 + titleMargin, backgroundWidth - titleMargin*2, titleHeight, 8, 8, 8, 8, z + 1, Art.tanInlay);
		this.addGui(this.titleBackground);

		let titleTextHeight = 20;

		this.titleText = new TextComponent(this.promptBackground.x + backgroundWidth/2, this.promptBackground.y + titleHeight/2 + titleMargin, z+2, currentlySelectedLevel);
		this.titleText.fontSize = 20;
		this.titleText.horizontalAlign = CENTER;
		this.titleText.verticalAlign = CENTER;
		this.titleText.fontColor = color("white");
		this.addGui(this.titleText);

		let buttonHeight = 40;
		let buttonWidth = backgroundWidth/2;

		this.acceptButton = new Button(this.promptBackground.x, this.promptBackground.y + backgroundHeight, buttonWidth, buttonHeight, 5, 5, 5, 5, z+1);
		this.acceptButton.setInTexture(Art.greenButtonIn);
		this.acceptButton.setOutTexture(Art.greenButtonOut);
		this.acceptButton.textComponent.text = "Begin"
		this.acceptButton.textComponent.fontSize = 20;
		this.acceptButton.onClickFunction = function(){
			setLevel(currentlySelectedLevel);
			setGameState(2); 
		}
		this.addGui(this.acceptButton);

		this.cancelButton = new Button(this.promptBackground.x + backgroundWidth - buttonWidth, this.promptBackground.y + backgroundHeight, buttonWidth, buttonHeight, 5, 5, 5, 5, z+1);
		this.cancelButton.setInTexture(Art.redButtonIn);
		this.cancelButton.setOutTexture(Art.redButtonOut);
		this.cancelButton.textComponent.text = "Back"
		this.cancelButton.textComponent.fontSize = 20;
		this.cancelButton.onClickFunction = function(){ 
				levelSelectionPrompt.setActive(false);
		}
		this.addGui(this.cancelButton);
	}
}