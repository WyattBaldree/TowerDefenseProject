function loadData(){
	let data = JSON.parse(localStorage.saveData || null);
	console.log(data);
	if(data == null){
		initializeData();
		data = JSON.parse(localStorage.saveData);
	}
	console.log(data);
	levelProgress = data.progress;

	//updateFlags();
}

function saveData(){
	let data = JSON.stringify({progress:levelProgress,player:{perks:"sdfasd"}});
	localStorage.saveData = data;

	//get progress on map
	//get level
	//get perks
}

function initializeData(){
	localStorage.clear();

	let data = JSON.stringify({progress:1,player:{perks:"none"}});
	localStorage.saveData = data;

	console.log(data);
}