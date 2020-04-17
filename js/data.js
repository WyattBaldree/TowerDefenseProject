function loadData(){
	let data = localStorage.saveData;
	console.log(data);
}

function saveData(){
	let data = {progress:{},player:{perks:"sdfasd"}};
	localStorage.saveData = data.player.perks;
}