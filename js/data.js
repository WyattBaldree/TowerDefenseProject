function loadData(){
	try{
		let data = JSON.parse(localStorage.saveData || null);
		console.log(data);
		if(data == null){
			initializeData();
			data = JSON.parse(localStorage.saveData);
		}
		console.log(data);
		levelProgress = data.levelProgressData;
		perkPoints = data.perks.perkPointsData;

		//updateFlags();
	}
	catch(err){
		initializeData();
	}
}

function saveData(){
	let data = JSON.stringify(
		{
			levelProgressData:levelProgress,
			perks:
			{
				perksPointsData:perkPoints
			}
		});
	localStorage.saveData = data;

	//get progress on map
	//get level
	//get perks
}

function initializeData(){
	localStorage.clear();

	let data = JSON.stringify(
		{
			levelProgressData:4,
			perks:
			{
				perksPointsData:1
			}
		});
	localStorage.saveData = data;

	console.log(data);
}