export interface CountryResponse {
  get?: string;
  parameters?: {
    league?: string;
    season?: string;
  };
  errors?: string[];
  results?: number;
  paging?: {
    current?: number;
    total?: number;
  };
  response: LeagueResponse[];
}

export interface LeagueResponse {
  league: {
    id?: number;
    name?: string;
    country?: string;
    logo?: string;
    flag: string;
    season: number;
    standings: Standing[][];
  };
}

export interface Standing {
  rank?: number;
  team?: {
    id?: number;
    name?: string;
    logo?: string;
  };
  points?: number;
  goalsDiff?: number;
  all?: {
    played?: number;
    win?: number;
    draw?: number;
    lose?: number;
  };
}
