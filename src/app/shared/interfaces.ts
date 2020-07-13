export interface Team {
  position: number
  team: {
      id: number
      name: string
      crestUrl: string
  };
  playedGames: number
  won: number
  draw: number
  lost: number
  points: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
}

export interface ApiStandingsRespone {
  standings: Standing[]
  [unusedProperties: string]: any
}

export interface Standing {
  stage: string
  type: string
  group: string
  table: Team[]
}

export interface ApiMatchesRespone {
  matches: Match[]
  [unusedProperties: string]: any
}

export interface Match {
  awayTeam: {
    id: number
    name: string
  };
  homeTeam: {
    id: number
    name: string
  };
  utcDate: any
}
