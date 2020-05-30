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

