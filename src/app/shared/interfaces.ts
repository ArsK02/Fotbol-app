export interface Team {
  position: number;
  team: {
      id: number
      name: string
      crestUrl: string
  };
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

export interface ApiStandingsRespone {
  standings: Standing[];
  [unusedProperties: string]: any;
}

export interface Standing {
  stage: string;
  type: string;
  group: string;
  table: Team[];
}

export interface ApiMatchesRespone {
  matches: Match[];
  [unusedProperties: string]: any;
}

export interface Match {
  status: string;
  matchday: number;
  awayTeam: {
    id: number
    name: string
  };
  homeTeam: {
    id: number
    name: string
  };
  utcDate: any;
  score: {
    extraTime: {
      awayTeam: number
      homeTeam: number
    };
    fullTime: {
      awayTeam: number
      homeTeam: number
    };
    halfTime: {
      awayTeam: number
      homeTeam: number
    };
    penalties: {
      awayTeam: number
      homeTeam: number
    };
  };
  season: {
    currentMatchday: number
  };
}

export interface Leagues {
  value: string;
  viewValue: string;
}
