class BeamTowerLevel1 extends CooldownTower{
	static initializeClass(){
		let classRef = this;
		classRef.animationFrames = [Art.mage0, Art.mage1];
		classRef.unitName = "Mage LV.1";
		classRef.description = "Beam Tower";
		classRef.range = 4;
		classRef.damage = 1;
		classRef.speed = 30;
		classRef.magic = 0;
		classRef.price = 100;
		classRef.maxTargets = 1;
		classRef.upgrades = [BeamTowerLevel2, FireElementalist];
	}

	shoot(shootTarget){
		super.shoot(shootTarget);
		shootTarget.takeDamage(this.getDamage());
	}

	drawSelf(){
		super.drawSelf();
		for(let i = 0; i < this.getBaseMaxTargets() ; i++){
			if(this.targets[i]){
				push()
				strokeWeight(4);
				stroke(color('rgba(255,0,0, .7)'));
				let xDif = this.targets[i].x + gridScale/2 - this.getXGridCenter();
				let yDif = this.targets[i].y + gridScale/2 - this.getYGridCenter();
				let mag = distanceFormula(0, 0, xDif, yDif);
				let xUnit = xDif/mag;
				let yUnit = yDif/mag;

				line(this.getXGridCenter() + xUnit*gridScale/2, this.getYGridCenter() + yUnit*gridScale/2, this.targets[i].x + gridScale/2, this.targets[i].y + gridScale/2);
				pop();
			}
		}
	}
}