const SpellTargetType = {
	radius: 0,
	line: 1,
}

class Spell{
	constructor(sourceUnit){
		this.sourceUnit = sourceUnit
		this.range = 1;
		this.targetType = SpellTargetType.radius;
	}

	activate(x, y){
		
	}
}