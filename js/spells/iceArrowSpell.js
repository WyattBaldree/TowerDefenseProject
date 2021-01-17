class IceArrowSpell extends Spell{
	constructor(sourceUnit){
		super(sourceUnit);
		this.range = 100;
		this.targetType = SpellTargetType.line;
	}

	activate(x, y){
		super.activate(x, y);
		new IceArrow(this.sourceUnit.x/gridScale, this.sourceUnit.y/gridScale, pointsToDegrees(this.sourceUnit.x + gridScale/2, this.sourceUnit.y + gridScale/2, mouseX, mouseY), 5, 2.5);
	}
}