class Path{
	static draw(){
		stroke('rgba(255,255,255,1)')
		for(let i = 0; i < Path.total(); i++){ //iterate from node to node
			//draw line from node a to node b
			for(let j = 0; j < Path.length(i) - 1; j++ ){
				line(Path.getX(i, j) * gridScale + gridScale * 0.5, Path.getY(i, j) * gridScale + gridScale * 0.5, Path.getX(i, j + 1) * gridScale + gridScale * 0.5 , Path.getY(i, j + 1) * gridScale + gridScale * 0.5);
			}
		}
	}
	static getX(pathID,index){ //getPathX
		return currentLevel.levelData.paths[pathID][index][0];
	}
	static getY(pathID,index){ //getPathY
		return currentLevel.levelData.paths[pathID][index][1];
	}
	static length(pathID){ //getPathLength
		return currentLevel.levelData.paths[pathID].length;
	}
	static total(){ //numPaths
		return currentLevel.levelData.paths.length;
	}
}
