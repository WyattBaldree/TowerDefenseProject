
var decalList = new Array(); // holds all projectile objects.

class DecalText extends Decal{
	constructor(x, y, lifetime){
		super(x, y, lifetime);

		this.text = "text";
		this.font = fontMinecraft;
		this.fontSize = 25;
		this.fontColor = color("white");
		this.fontOutlineWeight = 0;
		this.fontOutlineColor = color("black");
		this.horizontalAlign = CENTER;
		this.verticalAlign = CENTER;
		this.fontOpacity = 255;
	}

	drawSelf(){
		push();
		textFont(this.font);
		textSize(this.fontSize);
		strokeWeight(this.fontOutlineWeight);
		this.fontOutlineColor.setAlpha(this.fontOpacity);
		stroke(this.fontOutlineColor);
		this.fontColor.setAlpha(this.fontOpacity);
		fill(this.fontColor);
  		textAlign(this.horizontalAlign, this.verticalAlign);
		text(this.text, this.x + this.drawOffsetX, this.y + this.drawOffsetY);
		pop();	
	}
}