class Timeline{
	static levelTimer = 0;
	static currentSpawn = 0;
	static currentWave = 0;

	static advanceTimeline(dTime){
		Timeline.levelTimer+=dTime;
		if (Timeline.currentSpawn < Timeline.totalSpawns()){
			
			while (Timeline.levelTimer > Timeline.time(Timeline.currentSpawn)){
				spawn(Timeline.enemyClass(Timeline.currentSpawn), Timeline.pathID(Timeline.currentSpawn));
				Timeline.currentSpawn++
				if(Timeline.currentSpawn >= Timeline.totalSpawns()){
					break;
				}
			}
		}
	}

	static time(index){ //getTimelineTime
		return levelData[currentLevelIndex].waves[Timeline.currentWave][index].time;
	}
	static enemyClass(index){ //getTimelineEnemyClass
		return levelData[currentLevelIndex].waves[Timeline.currentWave][index].enemyClass;
	}
	static pathID(index){ //getTimelinePathID
		return levelData[currentLevelIndex].waves[Timeline.currentWave][index].pathId;
	}
	static totalSpawns(){ //getTimelineTotalSpawns
		return levelData[currentLevelIndex].waves[Timeline.currentWave].length
	}
	static spawns(){ //getTimelineTotalSpawns
		return levelData[currentLevelIndex].waves[Timeline.currentWave];
	} 
}