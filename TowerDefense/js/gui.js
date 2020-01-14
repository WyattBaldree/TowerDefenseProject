////////////////////////////// MAIN MENU

let mainMenuBackground;
let mainMenuPlate;
let mainMenuLogo;
let mainMenuLevelSelectButton;
let mainMenuOptionsButton;
function makeMainMenu(){
	let bgScale = 1.8;
	mainMenuBackground = new GuiComponent(0, 0, Art.castleBackground.width * bgScale, Art.castleBackground.height * bgScale, 0, Art.castleBackground);

	mainMenuPlate = new NineSlice(screenWidth/2 - 120, screenHeight/2 - 70, 240, 260, 8, 8, 8, 8, 1, Art.grayBackground);

	let logoScale = 1;
	mainMenuLogo = new GuiComponent(screenWidth/2 - Art.logo.width * logoScale/2, screenHeight/2 - Art.logo.height * logoScale/2 - 100, Art.logo.width * logoScale, Art.logo.height * logoScale, 2, Art.logo);

	mainMenuLevelSelectButton = new Button(screenWidth/2 - 90, screenHeight/2 + 30, 180, 60, 5, 5, 5, 5, 2);
	mainMenuLevelSelectButton.setInTexture(Art.blueButtonIn);
	mainMenuLevelSelectButton.setOutTexture(Art.blueButtonOut);
	mainMenuLevelSelectButton.text = "Level Select"
	mainMenuLevelSelectButton.onClickFunction = function(){ setGameState(1); }

	mainMenuOptionsButton = new Button(screenWidth/2 - 90, screenHeight/2 + 100, 180, 60, 5, 5, 5, 5, 2);
	mainMenuOptionsButton.setInTexture(Art.blueButtonIn);
	mainMenuOptionsButton.setOutTexture(Art.blueButtonOut);
	mainMenuOptionsButton.text = "Options"
	mainMenuOptionsButton.onClickFunction = function(){  }
}

function openMainMenu(){
	mainMenuBackground.active = true;
	mainMenuPlate.active = true;
	mainMenuLogo.active = true;
	mainMenuLevelSelectButton.active = true;
	mainMenuOptionsButton.active = true;
}

function closeMainMenu(){
	mainMenuBackground.active = false;
	mainMenuPlate.active = false;
	mainMenuLogo.active = false;
	mainMenuLevelSelectButton.active = false;
	mainMenuOptionsButton.active = false;
}

////////////////////////////LEVEL SELECT SCREEN

let levelSelectBackground;
let level1Button;
let level2Button;
function makeLevelSelectMenu(){
	levelSelectBackground = new NineSlice(0, 0, screenWidth, screenHeight, 8, 8, 8, 8, 0, Art.grayBackground);

	level1Button = new Button(90, 90, 60, 60, 5, 5, 5, 5, 1);
	level1Button.setInTexture(Art.blueButton2In);
	level1Button.setOutTexture(Art.blueButton2Out);
	level1Button.text = "1";
	level1Button.onClickFunction = function(){ 
		setLevel(0);
		setGameState(2);
	}

	level2Button = new Button(180, 90, 60, 60, 5, 5, 5, 5, 1);
	level2Button.setInTexture(Art.blueButton2In);
	level2Button.setOutTexture(Art.blueButton2Out);
	level2Button.text = "2";
	level2Button.onClickFunction = function(){ 
		setLevel(1);
		setGameState(2);
	}
}

function openLevelSelectMenu(){
	levelSelectBackground.active = true;
	level1Button.active = true;
	level2Button.active = true;
}

function closeLevelSelectMenu(){
	levelSelectBackground.active = false;
	level1Button.active = false;
	level2Button.active = false;
}

////////////////////////////// LEVEL GUI (main game gui)

let restartLevelButton;
let returnToMainMenuButton
function makeLevelGUI(){

	restartLevelButton = new Button(0, 0, 60, 30, 5, 5, 5, 5, 1);
	restartLevelButton.setInTexture(Art.blueButtonIn);
	restartLevelButton.setOutTexture(Art.blueButtonOut);
	restartLevelButton.onClickFunction = function(){ startLevel() }

	returnToMainMenuButton = new Button(90, 0, 60, 30, 5, 5, 5, 5, 1);
	returnToMainMenuButton.setInTexture(Art.blueButtonIn);
	returnToMainMenuButton.setOutTexture(Art.blueButtonOut);
	returnToMainMenuButton.onClickFunction = function(){ setGameState(0) }
}

function openLeveLGUI(){
	restartLevelButton.active = true;
	returnToMainMenuButton.active = true;
}

function closeLevelGUI(){
	restartLevelButton.active = false;
	returnToMainMenuButton.active = false;
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
		guiList.push(this);
		guiList.sort((a, b) => (a.z > b.z) ? 1 : -1);
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
			noFill();
			strokeWeight(1);
			stroke(color("black"));
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
		if(this.hovered) tint(color("yellow"));
		super.drawSelf();
		if(this.active){
			fill(255);
			//textFont(fontKennyThin);
	 		textSize(this.fontSize);
	  		textAlign(CENTER, CENTER);
			text(this.text, this.x + this.w/2, this.y + this.h/2);
		}
		tint(color("white"));
	}
}

