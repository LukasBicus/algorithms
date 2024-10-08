const reindeerRegex =
  /(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./;

export function parseReindeerLine(line: string): {
  name: string;
  speed: number;
  restLimit: number;
  flyLimit: number;
} | null {
  const match = line.match(reindeerRegex);
  if (!match) {
    return null;
  }
  return {
    name: match[1],
    speed: parseInt(match[2], 10),
    flyLimit: parseInt(match[3], 10),
    restLimit: parseInt(match[4], 10),
  };
}

export enum ReindeerActivity {
  Flying,
  Resting,
}

export class Reindeer {
  private name: string;
  // fly speed (km/s)
  private speed: number;
  // fly limit (s)
  private flyLimit: number;
  // rest limit (s)
  private restLimit: number;
  // currentActivity: Flying/Resting
  currentActivity: ReindeerActivity;
  // timeSpentOnActivity (s)
  timeSpentOnActivity: number;
  // distanceTraveled: (km)
  distanceTraveled: number;
  points: number;
  constructor({ name, speed, restLimit, flyLimit }: {
    name: string;
    speed: number;
    restLimit: number;
    flyLimit: number;
  }) {
    this.name = name;
    this.speed = speed;
    this.flyLimit = flyLimit;
    this.restLimit = restLimit;
    this.currentActivity = ReindeerActivity.Flying;
    this.timeSpentOnActivity = 0;
    this.distanceTraveled = 0;
    this.points = 0;
  }

  tick(): void {
    //   increment time spent on Activity ++1
    this.timeSpentOnActivity++;
    //   -if currentActivity is FLying
    if (this.currentActivity === ReindeerActivity.Flying) {
      //   update distance traveled
      this.distanceTraveled = this.distanceTraveled + this.speed;
      //   if time spent on activity is equal to fly limit,
      if (this.timeSpentOnActivity >= this.flyLimit) {
        //     switch to resting activity
        this.currentActivity = ReindeerActivity.Resting;
        //     set time spent on Activity to 0
        this.timeSpentOnActivity = 0;
      }
      // else currentActivity is Resting
    } else {
      //   if time spent on activity is equal to rest limit,
      if (this.timeSpentOnActivity >= this.restLimit) {
        //     switch to flying activity
        this.currentActivity = ReindeerActivity.Flying;
        //     set time spent on Activity to 0
        this.timeSpentOnActivity = 0;
      }
    }
  }

  addPoint(): void {
    this.points++;
  }
}
