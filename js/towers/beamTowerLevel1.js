class BeamTowerLevel1 extends CooldownTower{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.mage0, Art.mage1];
		classRef.unitName = "Mage LV.1";
		classRef.description = "Beam Tower";
		classRef.range = 4;
		classRef.damage = 1;
		classRef.speed = 30;
		classRef.price = 100;
		classRef.upgrades = [BeamTowerLevel2, ArrowTowerLevel1, BombTowerLevel1];
	}

	shoot(){
		super.shoot();
		this.target.takeDamage(this.damage);
	}

	drawSelf(){
		super.drawSelf();
		if(this.target){
			strokeWeight(4);
			stroke(color('rgba(255,0,0, .7)'));
			line(this.getXGridCenter(), this.getYGridCenter(), this.target.x + gridScale/2, this.target.y + gridScale/2);
		}
	}
}