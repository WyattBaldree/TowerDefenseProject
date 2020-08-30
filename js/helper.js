var _cls_ = {}; // serves as a cache, speed up later lookups
function getClass(name){
  if (!_cls_[name]) {
    // cache is not ready, fill it up
    if (name.match(/^[a-zA-Z0-9_]+$/)) {
      // proceed only if the name is a single word string
      _cls_[name] = eval(name);
    } else {
      // arbitrary code is detected 
      throw new Error("Who let the dogs out?");
    }
  }
  return _cls_[name];
}

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

function getXGrid(x){
	return x/gridScale;
}

function getYGrid(y){
	return y/gridScale;
}

function clamp(min, val, max){
	return Math.min(Math.max(min, val), max)
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
		if(distanceFormula(x, y, u.x + (gridScale/2), u.y + (gridScale/2)) <= (range*gridScale) + unitRangeBuffer){
			inRangeList.push(u);
		}
	}
	return inRangeList;
}

function getListOfUnitsInArc(x, y, direction, angle, range, filter = "all"){

	let unitsInRange = getListOfUnitsInRange(x, y, range, filter);

	let unitsInArc = [];
	for(let u of unitsInRange){

		let directionToUnit = pointsToDegrees(x, y, u.x + (gridScale/2), u.y + (gridScale/2));

		let directionDifference = Math.abs(direction - directionToUnit);

		//here we ensure we take the smaller of the 2 angles between the vectors.
		if(directionDifference > 180) directionDifference = 360 - directionDifference;
		if(directionDifference < angle/2){
			unitsInArc.push(u);
		}
	}
	return unitsInArc;
}

function dealDamageInArea(x, y, range, damage){
	let enemyList = getListOfUnitsInRange(x, y, range, "enemy");
	for(let enemy of enemyList){
		enemy.takeDamage(damage);
	}
}

function addEffectInArea(x, y, range, effect, unitType = "enemy"){
	let unitList = getListOfUnitsInRange(x, y, range, unitType);
	for(let unit of unitList){
		unit.addEffect(new Effect(effect));
	}
}

function dealDamageInArc(x, y, direction, angle, range, damage){
	let enemyList = getListOfUnitsInArc(x, y, direction, angle, range, "enemy");
	for(let enemy of enemyList){
		enemy.takeDamage(damage);
	}
}

function addEffectInArc(x, y, direction, angle, range, effect, unitType = "enemy"){
	let unitList = getListOfUnitsInArc(x, y, direction, angle, range, unitType);
	for(let unit of unitList){
		unit.addEffect(new Effect(effect));
	}
}

function degrees_to_radians(degrees)
{
	//https://www.w3resource.com/javascript-exercises/javascript-math-exercise-33.php
 	return degrees * (Math.PI/180);
}

function radians_to_degrees(radians)
{
	return radians * (180/Math.PI);
}

function getUnitVector(x, y){
	let mag = distanceFormula(0, 0, x, y);
	return {"x":x/mag,"y":y/mag};
}

function pointsToDegrees(x1, y1, x2, y2){
	let xdif = x2 - x1;
	let rads = Math.atan((y2 - y1)/xdif);

	//Here we account for the fact that we want to measure from
	//the positive x axis not just the x axis.
	if(xdif < 0) rads+=PI;

	return directionToTarget = radians_to_degrees(rads);
}