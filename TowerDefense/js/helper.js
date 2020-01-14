function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function getIndexOfObject(array, object){
	for(let i = 0 ; i < array.length ; i++){
		if(array[i] == object) return i;
	}
	return -1;
}

function getXGridCenter(x){
	return x + gridScale/2;
}

function getYGridCenter(y){
	return y + gridScale/2;
}

function getDistanceBetweenUnits(u1, u2){
	return distanceFormula(u1.x, u1.y, u2.x, u2.y);
}

function distanceFormula(x1, y1, x2, y2){
	let deltaX = x2 - x1;
	let deltaY = y2 - y1;

	return Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));
}

function getListOfUnitsInRange(x, y, range, filter = "all"){
	let listToSearch;
	switch(filter){
		case "all":
			listToSearch = unitList;
			break;
		case "enemy":
			listToSearch = enemyList;
			break;
		case "tower":
			listToSearch = towerList;
			break;
		default:
			console.log("ERROR: " + filter + " is not a valid filter for getListOfUnitsInRange.");
			break;
	}

	let inRangeList = new Array();
	for(let u of listToSearch){
		if(distanceFormula(x, y, u.x, u.y) <= range*gridScale){
			inRangeList.push(u);
		}
	}
	return inRangeList;
}

function dealDamageInArea(x, y, range, damage){
	let enemyList = getListOfUnitsInRange(x, y, range, "enemy");
	for(let enemy of enemyList){
		enemy.takeDamage(damage);
	}
}