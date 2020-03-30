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
		return selectedLevel.paths[pathID][index].x;
	}
	static getY(pathID,index){ //getPathY
		return selectedLevel.paths[pathID][index].y;
	}
	static length(pathID){ //getPathLength
		return selectedLevel.paths[pathID].length;
	}
	static total(){ //numPaths
		return selectedLevel.paths.length;
	}
}

