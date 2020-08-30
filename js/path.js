class Path{
	static draw(){
		let pathColorArray = [color("rgb(255,0,0)"), color("rgb(0,255,0)"), color("rgb(0,0,255)"), color("rgb(255,255,0)")]

		for(let i = 0; i < Path.total(); i++){ //iterate from node to node
			//draw line from node a to node b
			stroke(pathColorArray[i]);
			strokeWeight(4);
			for(let j = 0; j < Path.length(i) - 1; j++ ){
				let x1 = clamp(0, Path.getX(i, j) * gridScale + gridScale * 0.5, playAreaWidth);
				let y1 = clamp(0, Path.getY(i, j) * gridScale + gridScale * 0.5, playAreaHeight);
				let x2 = clamp(0, Path.getX(i, j+1) * gridScale + gridScale * 0.5, playAreaWidth);
				let y2 = clamp(0, Path.getY(i, j+1) * gridScale + gridScale * 0.5, playAreaHeight);

				line(x1, y1, x2, y2);
			}
		}
	}
	static getX(pathID,index){ //getPathX
		return levelData[currentLevelIndex].paths[pathID][index].x;
	}
	static getY(pathID,index){ //getPathY
		return levelData[currentLevelIndex].paths[pathID][index].y;
	}
	static length(pathID){ //getPathLength
		return levelData[currentLevelIndex].paths[pathID].length;
	}
	static total(){ //numPaths
		return levelData[currentLevelIndex].paths.length;
	}
	static totalDistanceOfPath(pathID){
		let totalDistanceOfPath = 0;
		for(let i = 0; i < Path.length(pathID) - 1; i++){
			let deltaX = Path.getX(pathID, i + 1) * gridScale - Path.getX(pathID, i) * gridScale;
			let deltaY = Path.getY(pathID, i + 1) * gridScale - Path.getY(pathID, i) * gridScale;
			totalDistanceOfPath += Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));
		}
		return totalDistanceOfPath;
	}
}

