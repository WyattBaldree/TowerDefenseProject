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

////////////////////////////// LEVEL GUI (main game gui)

//Groups
let menuButtonsGuiGroup;
let detailsPanelGuiGroup;
let towerSelectPanelGuigroup;

let restartLevelButton;
let returnToMainMenuButton;
let towerSelectionBackground;
let towerDetailsPanel;
let arrowTowerButton;
let beamTowerButton;
let earthquakeTowerButton;
let bombTowerButton;
let playerGoldDisplay;

function makeLevelGUI(){

	/////////////MENU BUTTONS
	menuButtonsGuiGroup = new GuiGroup(0, 0);

	restartLevelButton = new Button(menuButtonsGuiGroup.x + 10, menuButtonsGuiGroup.y + 10, 60, 30, 5, 5, 5, 5, 1);
	restartLevelButton.setInTexture(Art.blueButtonIn);
	restartLevelButton.setOutTexture(Art.blueButtonOut);
	restartLevelButton.text = "Restart";
	restartLevelButton.fontSize = 15;
	restartLevelButton.onClickFunction = function(){ startLevel() }
	menuButtonsGuiGroup.addGui(restartLevelButton);

	returnToMainMenuButton = new Button(menuButtonsGuiGroup.x + 100, menuButtonsGuiGroup.y + 10, 60, 30, 5, 5, 5, 5, 1);
	returnToMainMenuButton.setInTexture(Art.blueButtonIn);
	returnToMainMenuButton.setOutTexture(Art.blueButtonOut);
	returnToMainMenuButton.text = "Main";
	returnToMainMenuButton.fontSize = 15;
	returnToMainMenuButton.onClickFunction = function(){ setGameState(0) }
	menuButtonsGuiGroup.addGui(returnToMainMenuButton);

	/////////////Details Panel
	detailsPanelGuiGroup = new GuiGroup(playAreaWidth, 98);

	towerDetailsPanel = new TowerDisplayPanel(detailsPanelGuiGroup.x, detailsPanelGuiGroup.y);
	towerDetailsPanel.setTowerClass(ArrowTowerLevel1);

	detailsPanelGuiGroup.addGui(towerDetailsPanel);

	/////////////TOWER SELECT PANEL
	towerSelectPanelGuigroup = new GuiGroup(playAreaWidth, 280);

	towerSelectionBackground = new NineSlice(towerSelectPanelGuigroup.x, towerSelectPanelGuigroup.y, screenWidth - towerSelectPanelGuigroup.x, playAreaHeight - 280, 8, 8, 8, 8, 0, Art.grayBackground);
	towerSelectPanelGuigroup.addGui(towerSelectionBackground);

	arrowTowerButton = new TowerSelectButton(towerSelectPanelGuigroup.x + 20, towerSelectPanelGuigroup.y + 20, 1);
	arrowTowerButton.setInTexture(Art.greenButton2In);
	arrowTowerButton.setOutTexture(Art.greenButton2Out);
	arrowTowerButton.setTowerClass(ArrowTowerLevel1);
	towerSelectPanelGuigroup.addGui(arrowTowerButton);

	beamTowerButton = new TowerSelectButton(towerSelectPanelGuigroup.x + 20, towerSelectPanelGuigroup.y + 124, 1);
	beamTowerButton.setInTexture(Art.blueButton2In);
	beamTowerButton.setOutTexture(Art.blueButton2Out);
	beamTowerButton.setTowerClass(BeamTowerLevel1);
	towerSelectPanelGuigroup.addGui(beamTowerButton);

	earthquakeTowerButton = new TowerSelectButton(towerSelectPanelGuigroup.x + 110, towerSelectPanelGuigroup.y + 20, 1);
	earthquakeTowerButton.setInTexture(Art.redButton2In);
	earthquakeTowerButton.setOutTexture(Art.redButton2Out);
	earthquakeTowerButton.setTowerClass(EarthquakeTowerLevel1);
	towerSelectPanelGuigroup.addGui(earthquakeTowerButton);

	bombTowerButton = new TowerSelectButton(towerSelectPanelGuigroup.x + 110, towerSelectPanelGuigroup.y + 124, 1);
	bombTowerButton.setInTexture(Art.yellowButton2In);
	bombTowerButton.setOutTexture(Art.yellowButton2Out);
	bombTowerButton.setTowerClass(BombTowerLevel1);
	towerSelectPanelGuigroup.addGui(bombTowerButton);

	playerGoldDisplay = new SpriteAndText(playAreaWidth, 20, 50, 50, 1, Art.goldCoin, "???");
	playerGoldDisplay.fontSize = 17;
	playerGoldDisplay.textSeparation = -15;
	playerGoldDisplay.fontColor = color("yellow");
	towerSelectPanelGuigroup.addGui(playerGoldDisplay);
}

function openLeveLGUI(){
	menuButtonsGuiGroup.setActive(true);
	detailsPanelGuiGroup.setActive(true);
	towerSelectPanelGuigroup.setActive(true);
}

function closeLevelGUI(){
	menuButtonsGuiGroup.setActive(false);
	detailsPanelGuiGroup.setActive(false);
	towerSelectPanelGuigroup.setActive(false);
}

//Classes

var guiList = new Array(); //holds all guis



class GuiGroup{
	constructor(x, y){
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
		for(let gui of this.guiList){
			gui.setActive(active);
		}
	}
}

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
		guiList.push(this);
		guiList.sort((a, b) => (a.z > b.z) ? 1 : -1);
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
		let handled = false;
		return handled;
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
		this.pressed = false;
		this.outTexture = null;
		this.inTexture = null;
		this.text = "";
		this.fontSize = 25;
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
		if(this.pressed) this.release();
	}

	press(){
		this.pressed = true;
		this.texture = this.inTexture;
		if(this.onClickFunction) this.onClickFunction();

		let handled = true;
		return handled;
	}

	release(){
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
			text(this.text, this.x + this.w/2, this.y + this.h/2);

			if(this.hovered){
				fill(color("rgba(255,255,255,.15)"));
				noStroke();
				rect(this.x, this.y, this.w, this.h);
			}
		}
		//tint(color("white"));
	}
}

class TowerSelectButton extends GuiGroup{
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
			this.buttonComponent.onClickFunction = function(){
				beginTowerPlacement(this.parent.towerClass);
			}
			this.costComponent.text = this.towerClass.price;
			this.spriteComponent.texture = this.towerClass.animationFrames[0];
		}
	}
}

class TextComponent extends GuiComponent{
	constructor(x, y, z = 0, text = ""){
		super(x, y, 0, 0, z);
		this.text = text;
		this.font = fontMinecraft;
		this.fontSize = 25;
		this.fontColor = color("white");
	}

	drawSelf(){
		if(this.active){
			textFont(this.font);
			textSize(this.fontSize);
			noStroke();
			fill(this.fontColor);
	  		textAlign(LEFT, TOP);
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
		let panelHeight = 160;

		let spriteSize = gridScale;
		let textSpriteSize = gridScale;

		let sideMargin = 10;
		let topMargin = 10;
		let listYStart = topMargin + spriteSize + 46;
		let verticalSeparation = 32;
		let fontColor = color("white");
		let fontSize = 16;
		let textBackgroundColor = color("rgba(0,0,0,.3)");
		let textBackgroundSize = textSpriteSize - 4;

		this.backgroundComponent = new NineSlice(this.x, this.y, panelWidth, panelHeight, 5, 5, 5, 5, z);
		this.backgroundComponent.texture = Art.yellowBackground;
		this.addGui(this.backgroundComponent);

		this.spriteComponent = new GuiComponent(this.x + sideMargin, this.y + topMargin, spriteSize, spriteSize, z + 1);
		this.addGui(this.spriteComponent);

		this.titleComponent = new TextComponent(this.x + sideMargin*2 + spriteSize+5, this.y + topMargin + 7, z + 2, "title");
		this.titleComponent.fontSize = fontSize;
		this.titleComponent.fontColor = fontColor;
		this.addGui(this.titleComponent);

		this.titleComponentBackground = new GuiComponent(this.x + sideMargin*2 + spriteSize, this.y + topMargin, panelWidth - sideMargin*3 - spriteSize, textBackgroundSize, z + 1);
		this.titleComponentBackground.drawColor = textBackgroundColor;
		this.addGui(this.titleComponentBackground);

		this.spriteComponentBackground = new GuiComponent(this.x + sideMargin, this.y + topMargin, spriteSize, spriteSize, z + 1);
		this.spriteComponentBackground.drawColor = textBackgroundColor;
		this.addGui(this.spriteComponentBackground);

		this.costComponent = new SpriteAndText(this.x + sideMargin, this.y + listYStart, textSpriteSize, textSpriteSize, z + 2, Art.goldCoinStack, "???");
		this.costComponent.fontSize = fontSize;
		this.costComponent.textSeparation = 3;
		this.costComponent.fontColor = fontColor;
		this.addGui(this.costComponent);

		this.costComponentBackground = new GuiComponent(this.x + sideMargin, this.y + listYStart + (textSpriteSize - textBackgroundSize)/2, panelWidth/2 - sideMargin*2, textBackgroundSize, z + 2);
		this.costComponentBackground.drawColor = textBackgroundColor;
		this.addGui(this.costComponentBackground);

		this.damageComponent = new SpriteAndText(this.x + sideMargin, this.y + listYStart + verticalSeparation, textSpriteSize, textSpriteSize, z + 2, Art.sword, "???");
		this.damageComponent.fontSize = fontSize;
		this.damageComponent.textSeparation = 3;
		this.damageComponent.fontColor = fontColor;
		this.addGui(this.damageComponent);

		this.damageComponentBackground = new GuiComponent(this.x + sideMargin, this.y + listYStart + verticalSeparation + (textSpriteSize - textBackgroundSize)/2, panelWidth/2 - sideMargin*2, textBackgroundSize, z + 2);
		this.damageComponentBackground.drawColor = textBackgroundColor;
		this.addGui(this.damageComponentBackground);

		this.rangeComponent = new SpriteAndText(this.x + panelWidth/2 + sideMargin, this.y + listYStart, textSpriteSize, textSpriteSize, z + 2, Art.glasses, "???");
		this.rangeComponent.fontSize = fontSize;
		this.rangeComponent.textSeparation = 3;
		this.rangeComponent.fontColor = fontColor;
		this.addGui(this.rangeComponent);

		this.rangeComponentBackground = new GuiComponent(this.x + panelWidth/2 + sideMargin, this.y + listYStart + (textSpriteSize - textBackgroundSize)/2, panelWidth/2 - sideMargin*2, textBackgroundSize, z + 2);
		this.rangeComponentBackground.drawColor = textBackgroundColor;
		this.addGui(this.rangeComponentBackground);

		this.speedComponent = new SpriteAndText(this.x + panelWidth/2 + sideMargin, this.y + listYStart + verticalSeparation, textSpriteSize, textSpriteSize, z + 2, Art.rabbit, "???");
		this.speedComponent.fontSize = fontSize;
		this.speedComponent.textSeparation = 3;
		this.speedComponent.fontColor = fontColor;
		this.addGui(this.speedComponent);

		this.speedComponentBackground = new GuiComponent(this.x + panelWidth/2 + sideMargin, this.y + listYStart + verticalSeparation + (textSpriteSize - textBackgroundSize)/2, panelWidth/2 - sideMargin*2, textBackgroundSize, z + 2);
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
		}
	}
}