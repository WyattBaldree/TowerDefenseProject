class Flag extends AdvancedDraw{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.noSprite0, Art.noSprite1];
	}

	constructor(x, y, level){
		this.x = x;
		this.y = y;
		this.level = level;
	}
}