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
	mainMenuLevelSelectButton.text = "Level Select"
	mainMenuLevelSelectButton.onClickFunction = function(){ setGameState(1); }
	mainMenuGuiGroup.addGui(mainMenuLevelSelectButton);

	mainMenuOptionsButton = new Button(screenWidth/2 - 90, screenHeight/2 + 100, 180, 60, 5, 5, 5, 5, 2);
	mainMenuOptionsButton.setInTexture(Art.blueButtonIn);
	mainMenuOptionsButton.setOutTexture(Art.blueButtonOut);
	mainMenuOptionsButton.text = "Options"
	mainMenuOptionsButton.onClickFunction = function(){  }
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
let level1Button;
let level2Button;
function makeLevelSelectMenu(){
	levelSelectGuiGroup = new GuiGroup(0, 0);

	levelSelectBackground = new NineSlice(0, 0, screenWidth, screenHeight, 8, 8, 8, 8, 0, Art.grayBackground);
	levelSelectGuiGroup.addGui(levelSelectBackground);

	level1Button = new Button(90, 90, 60, 60, 5, 5, 5, 5, 1);
	level1Button.setInTexture(Art.blueButton2In);
	level1Button.setOutTexture(Art.blueButton2Out);
	level1Button.text = "1";
	level1Button.onClickFunction = function(){
		setLevel(0);
		setGameState(2);
	}
	levelSelectGuiGroup.addGui(level1Button);

	level2Button = new Button(180, 90, 60, 60, 5, 5, 5, 5, 1);
	level2Button.setInTexture(Art.blueButton2In);
	level2Button.setOutTexture(Art.blueButton2Out);
	level2Button.text = "2";
	level2Button.onClickFunction = function(){
		setLevel(1);
		setGameState(2);
	}
	levelSelectGuiGroup.addGui(level2Button);
}

function openLevelSelectMenu(){
	levelSelectGuiGroup.setActive(true);
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
	levelWinNextLevelButton.text = "Next Level";
	levelWinNextLevelButton.onClickFunction = function(){ 
		setLevel(currentLevelIndex+1);
		setGameState(2);
	}
	levelWinGuiGroup.addGui(levelWinNextLevelButton);

	levelWinMainMenuButton = new Button(screenWidth/2 - 90, screenHeight/2 + 15, 180, 60, 5, 5, 5, 5, 6);
	levelWinMainMenuButton.setInTexture(Art.blueButton2In);
	levelWinMainMenuButton.setOutTexture(Art.blueButton2Out);
	levelWinMainMenuButton.text = "Main Menu";
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
	levelLoseNextLevelButton.text = "Retry Level";
	levelLoseNextLevelButton.onClickFunction = function(){ 
		setGameState(2);
	}
	levelLoseGuiGroup.addGui(levelLoseNextLevelButton);

	levelLoseMainMenuButton = new Button(screenWidth/2 - 90, screenHeight/2 + 15, 180, 60, 5, 5, 5, 5, 6);
	levelLoseMainMenuButton.setInTexture(Art.blueButton2In);
	levelLoseMainMenuButton.setOutTexture(Art.blueButton2Out);
	levelLoseMainMenuButton.text = "Main Menu";
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

let sampleTextBox;

function makeLevelGUI(){
	let panelAreaWidth = screenWidth - playAreaWidth;
	let panelAreaHeight = screenHeight - playAreaHeight;

	/////////////MENU BUTTONS
	menuButtonsGuiGroup = new GuiGroup(playAreaWidth, 0);

	restartLevelButton = new Button(menuButtonsGuiGroup.x, menuButtonsGuiGroup.y, panelAreaWidth/2, 32, 5, 5, 5, 5, 1);
	restartLevelButton.setInTexture(Art.blueButtonIn);
	restartLevelButton.setOutTexture(Art.blueButtonOut);
	restartLevelButton.text = "Restart";
	restartLevelButton.fontSize = 15;
	restartLevelButton.onClickFunction = function(){ startLevel() }
	menuButtonsGuiGroup.addGui(restartLevelButton);

	returnToMainMenuButton = new Button(menuButtonsGuiGroup.x + panelAreaWidth/2, menuButtonsGuiGroup.y, panelAreaWidth/2, 32, 5, 5, 5, 5, 1);
	returnToMainMenuButton.setInTexture(Art.blueButtonIn);
	returnToMainMenuButton.setOutTexture(Art.blueButtonOut);
	returnToMainMenuButton.text = "Main";
	returnToMainMenuButton.fontSize = 15;
	returnToMainMenuButton.onClickFunction = function(){ setGameState(0) }
	menuButtonsGuiGroup.addGui(returnToMainMenuButton);

	////////////Timeline Group

	timelineGuiGroup = new GuiGroup(0, playAreaHeight);

	timelineDisplay = new TimelineDisplay(timelineGuiGroup.x, timelineGuiGroup.y, 1);
	timelineGuiGroup.addGui(timelineDisplay);

	speedButtonGroup = new RadioButtonGroup(timelineGuiGroup.x + playAreaWidth, timelineGuiGroup.y, panelAreaWidth, panelAreaHeight, 5, 5, 5, 5, 1, 4, true);
	speedButtonGroup.buttonList[0].text = "ll";
	speedButtonGroup.buttonList[0].fontSize = 15;
	speedButtonGroup.buttonList[0].onClickFunction = function(){gameSpeed = 0;}
	speedButtonGroup.buttonList[1].text = ">";
	speedButtonGroup.buttonList[1].fontSize = 15;
	speedButtonGroup.buttonList[1].onClickFunction = function(){gameSpeed = .5;}
	speedButtonGroup.buttonList[2].text = ">>";
	speedButtonGroup.buttonList[2].fontSize = 15;
	speedButtonGroup.buttonList[2].onClickFunction = function(){gameSpeed = 1;}
	speedButtonGroup.buttonList[3].text = ">>>";
	speedButtonGroup.buttonList[3].fontSize = 15;
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
}

function closeLevelGUI(){
	menuButtonsGuiGroup.setActive(false);
	detailsPanelGuiGroup.setActive(false);
	towerSelectPanel.setActive(false);
	towerUpgradePanel.setActive(false);
	playerInfoGuiGroup.setActive(false);
	timelineGuiGroup.setActive(false);
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
		guiList.push(this);
		guiList.sort((a, b) => (a.z > b.z) ? 1 : -1);
	}

	update(dTime){

	}

	setX(x){
		this.x = x;
	}

	setY(y){
		this.y = y;
	}

	setActive(active){
		this.active = active;
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
	}

	endHover(){
		this.hovered = false;
	}

	drawSelf(){
		if(!this.active) return;
		if(this.texture){
			image(this.texture, this.x, this.y, this.w, this.h);
		}
		else{
			noStroke();
			fill(this.drawColor);
			rect(this.x, this.y, this.w, this.h);
		}
	}
}

class GuiGroup extends GuiComponent{
	constructor(x, y, z = 0){
		super(x, y, 0, 0, z)
		this.x = x;
		this.y = y;
		this.guiList = [];
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
			//image(this.texture, this.x, this.y, this.w, this.h);

			let textureCenterWidth = this.texture.width - this.leftMargin - this.rightMargin
			let textureCenterHeight = this.texture.height - this.topMargin - this.bottomMargin;

			//percent sizes compared to full texture size.
			let leftMarginPercent = this.leftMargin/this.texture.width;
			let rightMarginPercent = this.rightMargin/this.texture.width;
			let topMarginPercent = this.topMargin/this.texture.height;
			let bottomMarginPercent = this.bottomMargin/this.texture.height;
			let centerWidthPercent = textureCenterWidth/this.texture.width;
			let centerHeightPercent = textureCenterHeight/this.texture.height;

			let leftWidth = this.leftMargin;//this.w * leftMarginPercent;
			let rightWidth = this.rightMargin;//this.w * rightMarginPercent;
			let topHeight = this.topMargin;//this.w * leftMarginPercent;
			let bottomHeight = this.bottomMargin;//this.w * rightMarginPercent;
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
		this.text = "";
		this.fontSize = 25;
		this.travelDistance = 4;
		this.lockIn = false;

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
		this.texture = this.inTexture;
		if(this.onClickFunction) this.onClickFunction();


		let handled = true;
		return handled;
	}

	pressAnywhere(){
		if(this.onClickOffFunction) this.onClickOffFunction();
	}

	release(){
		if(this.buttonUpCallback) this.buttonUpCallback();
		this.pressed = false;
		this.texture = this.outTexture;

	}

	drawSelf(){
		//if(this.hovered) tint(color("yellow"));
		super.drawSelf();
		if(this.active){
			fill(255);
			textFont(fontMinecraft);
	 		textSize(this.fontSize);
	  		textAlign(CENTER, CENTER);
	  		let verticalOffset = this.pressed ? this.travelDistance : 0;
			text(this.text, this.x + this.w/2, this.y + this.h/2 + verticalOffset);

			if(this.hovered){
				fill(color("rgba(255,255,255,.15)"));
				noStroke();
				rect(this.x, this.y, this.w, this.h);
			}
		}
	}
}

class RadioButtonGroup extends GuiGroup{
	constructor(x, y, w, h, leftMargin = 0, rightMargin = 0, topMargin = 0, bottomMargin = 0, z = 0, numButtons = 1, horizontal = true){
		super(x, y, z);
		this.buttonList = [];

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
			button.release();
		}
	}
}

class imageButton extends GuiGroup{
	constructor(x, y, w, h, leftMargin = 0, rightMargin = 0, topMargin = 0, bottomMargin = 0, z = 0, onClickFunction = null, image = null){
		super(x, y, z);

		this.buttonComponent = new Button(x, y, w, h, leftMargin, rightMargin, topMargin, bottomMargin, z, onClickFunction);
		this.addGui(this.buttonComponent);

		this.spriteWidth = 32;
		this.spriteHeight = 32;

		this.spriteComponent = new GuiComponent(this.buttonComponent.x + this.buttonComponent.w/2 - this.spriteWidth/2, this.buttonComponent.y + this.buttonComponent.h/2 - this.spriteHeight/2, spriteWidth, spriteHeight, z + 1);
		this.spriteComponent.texture = image;
		this.addGui(this.spriteComponent);
	}
}

class TowerButton extends GuiGroup{
	constructor(x, y, z = 0){
		super(x, y);

		this.towerClass = null;

		this.buttonComponent = new Button(x, y, 64, 90, 7, 7, 7, 7, z);
		this.addGui(this.buttonComponent);

		let centerWidth = this.buttonComponent.w - this.buttonComponent.leftMargin - this.buttonComponent.rightMargin;

		this.spriteComponent = new GuiComponent(this.buttonComponent.x + this.buttonComponent.leftMargin, this.buttonComponent.y + this.buttonComponent.topMargin, centerWidth, centerWidth, z + 1);
		this.addGui(this.spriteComponent);

		this.costComponent = new SpriteAndText(x + this.buttonComponent.leftMargin - 15, y +45, 50, 50, z + 2, Art.goldCoin, "???");
		this.costComponent.fontSize = 17;
		this.costComponent.textSeparation = -15;
		this.costComponent.fontColor = color("yellow");
		this.addGui(this.costComponent);

		this.spriteTextBackgroundComponent = new GuiComponent(this.buttonComponent.x + this.buttonComponent.leftMargin, this.costComponent.y + (this.buttonComponent.fontSize+2)/2, centerWidth, this.buttonComponent.fontSize-4, z + 1);
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
			let sellPrice = this.towerClass.price;
			this.buttonComponent.onClickFunction = function(){
				if(this.parent.confirm){
					sellSelectedTower(sellPrice);
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
	}

	drawSelf(){
		if(this.active){
			textFont(this.font);
			textSize(this.fontSize);
			noStroke();
			fill(this.fontColor);
	  		textAlign(this.horizontalAlign, this.verticalAlign);
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
			text(this.text, this.x + this.w + this.textSeparation, this.y + (this.h)/2);
		}
	}
}  

class TowerDisplayPanel extends GuiGroup{
	constructor(x, y, z = 0){
		super(x, y);

		this.towerClass = null;

		let panelWidth = screenWidth - playAreaWidth;
		let panelHeight = 172;

		let spriteSize = gridScale;
		let textSpriteSize = gridScale;

		let sideMargin = 10;
		let topMargin = 10;
		let fontColor = color("white");
		let textBackgroundColor = color("rgba(0,0,0,.3)");
		let textBoxHeight = 60;
		let textBoxFontSize = 13;
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
		this.addGui(this.spriteComponent);

		this.spriteComponentBackground = new GuiComponent(this.x + sideMargin, this.y + topMargin, spriteSize, spriteSize, z + 1);
		this.spriteComponentBackground.drawColor = textBackgroundColor;
		this.addGui(this.spriteComponentBackground);

		//title

		this.titleComponent = new TextComponent(this.x + sideMargin + spriteSize + innerMargin*2, this.y + topMargin + innerMargin, z + 2, "title");
		this.titleComponent.fontSize = fontSize;
		this.titleComponent.fontColor = fontColor;
		this.addGui(this.titleComponent);

		this.titleComponentBackground = new GuiComponent(this.x + sideMargin + spriteSize + innerMargin, this.y + topMargin, panelWidth - sideMargin*2 - innerMargin - spriteSize, fontSize + innerMargin, z + 1);
		this.titleComponentBackground.drawColor = textBackgroundColor;
		this.addGui(this.titleComponentBackground);

		//description

		this.descriptionTextBox = new TextBox(this.x + sideMargin + innerMargin, this.y + topMargin + spriteSize + 2*innerMargin, panelWidth - 2*sideMargin - innerMargin, textBoxHeight, "", z+2);
		this.descriptionTextBox.fontSize = textBoxFontSize;
		this.descriptionTextBox.fontColor = fontColor;
		this.addGui(this.descriptionTextBox);

		this.descriptionTextBoxBackground = new GuiComponent(this.x + sideMargin, this.y + topMargin + spriteSize + innerMargin, panelWidth - 2*sideMargin, textBoxHeight + 2*innerMargin, z + 1);
		this.descriptionTextBoxBackground.drawColor = textBackgroundColor;
		this.addGui(this.descriptionTextBoxBackground);

		//stat boxes

		this.costComponent = new SpriteAndText(this.x + sideMargin, this.y + statBoxesYStart + statBoxOffset, textSpriteSize, textSpriteSize, z + 2, Art.goldCoinStack, "???");
		this.costComponent.fontSize = fontSize;
		this.costComponent.textSeparation = innerMargin;
		this.costComponent.fontColor = fontColor;
		this.addGui(this.costComponent);

		this.costComponentBackground = new GuiComponent(this.x + sideMargin + textSpriteSize, this.y + statBoxesYStart, panelWidth/2 - sideMargin*2 - textSpriteSize, textBackgroundSize, z + 1);
		this.costComponentBackground.drawColor = textBackgroundColor;
		this.addGui(this.costComponentBackground);

		this.damageComponent = new SpriteAndText(this.x + sideMargin, this.y + statBoxesYStart + textBackgroundSize + innerMargin + statBoxOffset, textSpriteSize, textSpriteSize, z + 2, Art.sword, "???");
		this.damageComponent.fontSize = fontSize;
		this.damageComponent.textSeparation = innerMargin;
		this.damageComponent.fontColor = fontColor;
		this.addGui(this.damageComponent);

		this.damageComponentBackground = new GuiComponent(this.x + sideMargin + textSpriteSize, this.y + statBoxesYStart + textBackgroundSize + innerMargin, panelWidth/2 - sideMargin*2 - textSpriteSize, textBackgroundSize, z + 1);
		this.damageComponentBackground.drawColor = textBackgroundColor;
		this.addGui(this.damageComponentBackground);

		this.rangeComponent = new SpriteAndText(this.x + panelWidth/2 + innerMargin, this.y + statBoxesYStart + statBoxOffset, textSpriteSize, textSpriteSize, z + 2, Art.eyeball, "???");
		this.rangeComponent.fontSize = fontSize;
		this.rangeComponent.textSeparation = innerMargin;
		this.rangeComponent.fontColor = fontColor;
		this.addGui(this.rangeComponent);

		this.rangeComponentBackground = new GuiComponent(this.x + panelWidth/2 + innerMargin + textSpriteSize, this.y + statBoxesYStart, panelWidth/2 - sideMargin - innerMargin - textSpriteSize, textBackgroundSize, z + 1);
		this.rangeComponentBackground.drawColor = textBackgroundColor;
		this.addGui(this.rangeComponentBackground);

		this.speedComponent = new SpriteAndText(this.x + panelWidth/2 + innerMargin, this.y + statBoxesYStart + textBackgroundSize + innerMargin + statBoxOffset, textSpriteSize, textSpriteSize, z + 2, Art.ninjaStar, "???");
		this.speedComponent.fontSize = fontSize;
		this.speedComponent.textSeparation = innerMargin;
		this.speedComponent.fontColor = fontColor;
		this.addGui(this.speedComponent);

		this.speedComponentBackground = new GuiComponent(this.x + panelWidth/2 + innerMargin + textSpriteSize, this.y + statBoxesYStart + textBackgroundSize + innerMargin, panelWidth/2 - sideMargin - innerMargin - textSpriteSize, textBackgroundSize, z + 1);
		this.speedComponentBackground.drawColor = textBackgroundColor;
		this.addGui(this.speedComponentBackground);
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
		this.towerClass = _towerClass;
		if(this.towerClass){
			this.spriteComponent.texture = this.towerClass.animationFrames[0];
			this.costComponent.text = this.towerClass.price;
			this.damageComponent.text = this.towerClass.damage;
			this.rangeComponent.text = this.towerClass.range;
			this.speedComponent.text = this.towerClass.speed;
			this.titleComponent.text = this.towerClass.unitName;
			this.descriptionTextBox.setText(this.towerClass.description);
		}
	}
}

class TextBox extends GuiComponent{
	constructor(x, y, w, h, text = "", z = 0){
		super(x, y, w, h, z, null);
		this.textLines = [];
		this.font = fontMinecraft;
		this.fontSize = 25;
		this.fontColor = color("white");
		this.textHeight = 0;
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
		this.scrollAmount = 0;
		this.autoScrollDirection = 1;
		this.scrollPauseCurrent = this.scrollPause;
		this.textLines = [];
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
	}

	update(dTime){
		if(this.scrollPauseCurrent <= 0){
			//scroll
			if(this.autoScrollDirection){
				this.scrollAmount += this.scrollSpeed*dTime;
				if(this.scrollAmount >= (this.textLines.length * this.fontSize) - this.h){
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
		this.scrollPauseCurrent -= dTime;
	}

	drawSelf(){
		if(this.active){
			this.textCanvas.clear();
			this.textCanvas.textFont(this.font);
			this.textCanvas.textSize(this.fontSize);
			this.textCanvas.noStroke();
			this.textCanvas.fill(this.fontColor);
	  		this.textCanvas.textAlign(LEFT, TOP);


			for(let i = 0 ; i < this.textLines.length ; i++){
				this.textCanvas.text(this.textLines[i], 0, 0 + i*this.fontSize - this.scrollAmount);
			}

			image(this.textCanvas, this.x, this.y);
		}
	}
}

class PlayerDisplayPanel extends GuiGroup{
	constructor(x, y, z = 0){
		super(x, y);

		let panelWidth = screenWidth - playAreaWidth;
		let panelHeight = 77;

		let sideMargin = 10;
		let topMargin = 10;
		let innerMargin = 4;

		let fontColor = color("white");
		let fontSize = 16;
		let textBackgroundColor = color("rgba(0,0,0,.3)");
		let textBackgroundSize = 20;

		let statBoxOffset = 6;
		let verticalSeparation = 8;

		//background

		this.backgroundComponent = new NineSlice(this.x, this.y, panelWidth, panelHeight, 5, 5, 5, 5, z);
		this.backgroundComponent.texture = Art.grayBackground;
		this.addGui(this.backgroundComponent);

		this.goldComponent = new SpriteAndText(this.x + sideMargin, this.y + topMargin, gridScale, gridScale, z + 2, Art.goldCoinStack, "???");
		this.goldComponent.fontSize = fontSize;
		this.goldComponent.textSeparation = innerMargin;
		this.goldComponent.fontColor = fontColor;
		this.addGui(this.goldComponent);

		this.goldComponentBackground = new GuiComponent(this.x + sideMargin + gridScale, this.y + topMargin + statBoxOffset, panelWidth - sideMargin*2 - gridScale, textBackgroundSize, z + 1);
		this.goldComponentBackground.drawColor = textBackgroundColor;
		this.addGui(this.goldComponentBackground);

		this.healthComponent = new SpriteAndText(this.x + sideMargin, this.y + topMargin + verticalSeparation + textBackgroundSize, gridScale, gridScale, z + 2, Art.heart, "???");
		this.healthComponent.fontSize = fontSize;
		this.healthComponent.textSeparation = innerMargin;
		this.healthComponent.fontColor = fontColor;
		this.addGui(this.healthComponent);

		this.healthComponentBackground = new GuiComponent(this.x + sideMargin + gridScale, this.y + topMargin + statBoxOffset + verticalSeparation + textBackgroundSize, panelWidth - sideMargin*2 - gridScale, textBackgroundSize, z + 1);
		this.healthComponentBackground.drawColor = textBackgroundColor;
		this.addGui(this.healthComponentBackground);
	}
}

class TimelineDisplay extends GuiGroup{
	constructor(x, y, z = 0){
		super(x, y, z);

		let panelWidth = playAreaWidth;
		let panelHeight = screenHeight - playAreaHeight;

		this.timelineTimeLength = 500;
		this.spriteSize = 16;
		this.sideMargin = 10;

		this.backgroundComponent = new NineSlice(this.x, this.y, panelWidth, panelHeight, 5, 5, 5, 5, z-1);
		this.backgroundComponent.texture = Art.grayBackground;
		this.addGui(this.backgroundComponent);
	}

	drawSelf(){
		super.drawSelf();
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
	}
}

class TowerSelectPanel extends GuiGroup{
	constructor(x, y, z = 0){
		super(x, y, z);
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

class TowerUpgradePanel extends GuiGroup{
	constructor(x, y, z = 0){
		super(x, y, z);
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
		this.sellButton.setActive(true)
		this.sellButton.setTowerClass(towerInstance.getClass());
	}
} 