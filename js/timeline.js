class Timeline{
	static levelTimer = 0;
	static currentSpawn = 0;

	static advanceTimeline(){
		Timeline.levelTimer++;
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
		return currentLevel.levelData.timeline[index][0];
	}
	static enemyID(index){ //getTimelineEnemyID
		return currentLevel.levelData.timeline[index][1];
	}
	static pathID(index){ //getTimelinePathID
		return currentLevel.levelData.timeline[index][2];
	}
	static totalSpawns(){ //getTimelineTotalSpawns
		return currentLevel.levelData.timeline.length;
	}
	static spawns(){ //getTimelineTotalSpawns
		return currentLevel.levelData.timeline;
	} 
}