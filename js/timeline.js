class Timeline{
	static levelTimer = 0;
	static currentSpawn = 0;
	static currentWave = 0;

	static advanceTimeline(dTime){
		Timeline.levelTimer+=dTime;
		if (Timeline.currentSpawn < Timeline.totalSpawns()){
			
			while (Timeline.levelTimer > Timeline.time(Timeline.currentSpawn)){
				spawn(Timeline.enemyID(Timeline.currentSpawn), Timeline.pathID(Timeline.currentSpawn));
				Timeline.currentSpawn++
				if(Timeline.currentSpawn >= Timeline.totalSpawns()){
					break;
				}
			}
		}
	}

	static time(index){ //getTimelineTime
		return selectedLevel.waves[Timeline.currentWave][index].time;

	}
	static enemyID(index){ //getTimelineEnemyID
		return selectedLevel.waves[Timeline.currentWave][index].enemyId;
	}
	static pathID(index){ //getTimelinePathID
		return selectedLevel.waves[Timeline.currentWave][index].pathId;
	}
	static totalSpawns(){ //getTimelineTotalSpawns
		return selectedLevel.waves[Timeline.currentWave].length
	}
	static spawns(){ //getTimelineTotalSpawns
		return selectedLevel.waves[Timeline.currentWave];
	} 
}