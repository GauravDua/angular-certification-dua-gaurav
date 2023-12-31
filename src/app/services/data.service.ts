import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiStandingResponse } from '../models/standing.model';
import { ApiFixtureResponse } from '../models/fixture.model';
import { Season } from '../assets/enums/season.enum';
import { TopLeague } from '../assets/enums/topLeague.enum';
import { Country } from '../assets/enums/country.enum';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private standing_cache: Map<string, ApiStandingResponse> = new Map();
  private fixture_cache: Map<string, ApiFixtureResponse> = new Map();

  country_name: string = '';
  team_id: string = '';
  id: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  getLeagueByCountry(country_name: string): Subscription {
    console.log('country_name ', country_name);
    this.country_name = country_name;

    const headers = new HttpHeaders({
      'x-rapidapi-host': environment.header.xRapidapiHost,
      'x-rapidapi-key': environment.header.xRapidapiKey,
    });

    switch (this.country_name) {
      case Country.England: {
        this.id = TopLeague.englangPremierLeague;
        break;
      }
      case Country.Spain: {
        this.id = TopLeague.spainLaLiga;
        break;
      }
      case Country.France: {
        this.id = TopLeague.franceLigue1;
        break;
      }
      case Country.France: {
        this.id = TopLeague.germanyBundesliga;
        break;
      }
      case Country.Italy: {
        this.id = TopLeague.italySerieA;
        break;
      }
    }

    let params = new HttpParams()
      .append('league', this.id)
      .append('season', Season.currentSeason);

    //creating dummy response as daily limit is 10 request for 10 min
    // let response: any = {
    //   get: 'standings',
    //   parameters: {
    //     league: '140',
    //     season: '2023',
    //   },
    //   errors: [],
    //   results: 1,
    //   paging: {
    //     current: 1,
    //     total: 1,
    //   },
    //   response: [
    //     {
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         standings: [
    //           [
    //             {
    //               rank: 1,
    //               team: {
    //                 id: 541,
    //                 name: 'Real Madrid',
    //                 logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //               },
    //               points: 45,
    //               goalsDiff: 28,
    //               group: 'Primera Divisi\u00f3n',
    //               form: 'WWDWW',
    //               status: 'same',
    //               description: 'Promotion - Champions League (Group Stage: )',
    //               all: {
    //                 played: 18,
    //                 win: 14,
    //                 draw: 3,
    //                 lose: 1,
    //                 goals: {
    //                   for: 39,
    //                   against: 11,
    //                 },
    //               },
    //               home: {
    //                 played: 8,
    //                 win: 7,
    //                 draw: 1,
    //                 lose: 0,
    //                 goals: {
    //                   for: 21,
    //                   against: 4,
    //                 },
    //               },
    //               away: {
    //                 played: 10,
    //                 win: 7,
    //                 draw: 2,
    //                 lose: 1,
    //                 goals: {
    //                   for: 18,
    //                   against: 7,
    //                 },
    //               },
    //               update: '2023-12-26T00:00:00+00:00',
    //             },
    //             {
    //               rank: 2,
    //               team: {
    //                 id: 547,
    //                 name: 'Girona',
    //                 logo: 'https://media-4.api-sports.io/football/teams/547.png',
    //               },
    //               points: 45,
    //               goalsDiff: 21,
    //               group: 'Primera Divisi\u00f3n',
    //               form: 'DWWWD',
    //               status: 'same',
    //               description: 'Promotion - Champions League (Group Stage: )',
    //               all: {
    //                 played: 18,
    //                 win: 14,
    //                 draw: 3,
    //                 lose: 1,
    //                 goals: {
    //                   for: 42,
    //                   against: 21,
    //                 },
    //               },
    //               home: {
    //                 played: 9,
    //                 win: 7,
    //                 draw: 1,
    //                 lose: 1,
    //                 goals: {
    //                   for: 21,
    //                   against: 10,
    //                 },
    //               },
    //               away: {
    //                 played: 9,
    //                 win: 7,
    //                 draw: 2,
    //                 lose: 0,
    //                 goals: {
    //                   for: 21,
    //                   against: 11,
    //                 },
    //               },
    //               update: '2023-12-26T00:00:00+00:00',
    //             },
    //             {
    //               rank: 3,
    //               team: {
    //                 id: 530,
    //                 name: 'Atletico Madrid',
    //                 logo: 'https://media-4.api-sports.io/football/teams/530.png',
    //               },
    //               points: 38,
    //               goalsDiff: 17,
    //               group: 'Primera Divisi\u00f3n',
    //               form: 'WDLWL',
    //               status: 'same',
    //               description: 'Promotion - Champions League (Group Stage: )',
    //               all: {
    //                 played: 18,
    //                 win: 12,
    //                 draw: 2,
    //                 lose: 4,
    //                 goals: {
    //                   for: 36,
    //                   against: 19,
    //                 },
    //               },
    //               home: {
    //                 played: 10,
    //                 win: 9,
    //                 draw: 1,
    //                 lose: 0,
    //                 goals: {
    //                   for: 23,
    //                   against: 11,
    //                 },
    //               },
    //               away: {
    //                 played: 8,
    //                 win: 3,
    //                 draw: 1,
    //                 lose: 4,
    //                 goals: {
    //                   for: 13,
    //                   against: 8,
    //                 },
    //               },
    //               update: '2023-12-26T00:00:00+00:00',
    //             },
    //             {
    //               rank: 4,
    //               team: {
    //                 id: 529,
    //                 name: 'Barcelona',
    //                 logo: 'https://media-4.api-sports.io/football/teams/529.png',
    //               },
    //               points: 38,
    //               goalsDiff: 13,
    //               group: 'Primera Divisi\u00f3n',
    //               form: 'WDLWD',
    //               status: 'same',
    //               description: 'Promotion - Champions League (Group Stage: )',
    //               all: {
    //                 played: 18,
    //                 win: 11,
    //                 draw: 5,
    //                 lose: 2,
    //                 goals: {
    //                   for: 34,
    //                   against: 21,
    //                 },
    //               },
    //               home: {
    //                 played: 10,
    //                 win: 8,
    //                 draw: 0,
    //                 lose: 2,
    //                 goals: {
    //                   for: 21,
    //                   against: 11,
    //                 },
    //               },
    //               away: {
    //                 played: 8,
    //                 win: 3,
    //                 draw: 5,
    //                 lose: 0,
    //                 goals: {
    //                   for: 13,
    //                   against: 10,
    //                 },
    //               },
    //               update: '2023-12-26T00:00:00+00:00',
    //             },
    //             {
    //               rank: 5,
    //               team: {
    //                 id: 531,
    //                 name: 'Athletic Club',
    //                 logo: 'https://media-4.api-sports.io/football/teams/531.png',
    //               },
    //               points: 35,
    //               goalsDiff: 15,
    //               group: 'Primera Divisi\u00f3n',
    //               form: 'WWDWD',
    //               status: 'same',
    //               description: 'Promotion - Europa League (Group Stage: )',
    //               all: {
    //                 played: 18,
    //                 win: 10,
    //                 draw: 5,
    //                 lose: 3,
    //                 goals: {
    //                   for: 34,
    //                   against: 19,
    //                 },
    //               },
    //               home: {
    //                 played: 10,
    //                 win: 7,
    //                 draw: 2,
    //                 lose: 1,
    //                 goals: {
    //                   for: 25,
    //                   against: 11,
    //                 },
    //               },
    //               away: {
    //                 played: 8,
    //                 win: 3,
    //                 draw: 3,
    //                 lose: 2,
    //                 goals: {
    //                   for: 9,
    //                   against: 8,
    //                 },
    //               },
    //               update: '2023-12-26T00:00:00+00:00',
    //             },
    //             {
    //               rank: 6,
    //               team: {
    //                 id: 548,
    //                 name: 'Real Sociedad',
    //                 logo: 'https://media-4.api-sports.io/football/teams/548.png',
    //               },
    //               points: 31,
    //               goalsDiff: 11,
    //               group: 'Primera Divisi\u00f3n',
    //               form: 'DDWDW',
    //               status: 'same',
    //               description:
    //                 'Promotion - Europa Conference League (Qualification: )',
    //               all: {
    //                 played: 18,
    //                 win: 8,
    //                 draw: 7,
    //                 lose: 3,
    //                 goals: {
    //                   for: 29,
    //                   against: 18,
    //                 },
    //               },
    //               home: {
    //                 played: 9,
    //                 win: 5,
    //                 draw: 3,
    //                 lose: 1,
    //                 goals: {
    //                   for: 17,
    //                   against: 10,
    //                 },
    //               },
    //               away: {
    //                 played: 9,
    //                 win: 3,
    //                 draw: 4,
    //                 lose: 2,
    //                 goals: {
    //                   for: 12,
    //                   against: 8,
    //                 },
    //               },
    //               update: '2023-12-26T00:00:00+00:00',
    //             },
    //             {
    //               rank: 7,
    //               team: {
    //                 id: 543,
    //                 name: 'Real Betis',
    //                 logo: 'https://media-4.api-sports.io/football/teams/543.png',
    //               },
    //               points: 28,
    //               goalsDiff: 2,
    //               group: 'Primera Divisi\u00f3n',
    //               form: 'DDDDW',
    //               status: 'same',
    //               description: null,
    //               all: {
    //                 played: 18,
    //                 win: 6,
    //                 draw: 10,
    //                 lose: 2,
    //                 goals: {
    //                   for: 20,
    //                   against: 18,
    //                 },
    //               },
    //               home: {
    //                 played: 9,
    //                 win: 5,
    //                 draw: 4,
    //                 lose: 0,
    //                 goals: {
    //                   for: 12,
    //                   against: 4,
    //                 },
    //               },
    //               away: {
    //                 played: 9,
    //                 win: 1,
    //                 draw: 6,
    //                 lose: 2,
    //                 goals: {
    //                   for: 8,
    //                   against: 14,
    //                 },
    //               },
    //               update: '2023-12-26T00:00:00+00:00',
    //             },
    //             {
    //               rank: 8,
    //               team: {
    //                 id: 546,
    //                 name: 'Getafe',
    //                 logo: 'https://media-4.api-sports.io/football/teams/546.png',
    //               },
    //               points: 26,
    //               goalsDiff: 1,
    //               group: 'Primera Divisi\u00f3n',
    //               form: 'DWWLW',
    //               status: 'same',
    //               description: null,
    //               all: {
    //                 played: 18,
    //                 win: 6,
    //                 draw: 8,
    //                 lose: 4,
    //                 goals: {
    //                   for: 24,
    //                   against: 23,
    //                 },
    //               },
    //               home: {
    //                 played: 8,
    //                 win: 5,
    //                 draw: 3,
    //                 lose: 0,
    //                 goals: {
    //                   for: 9,
    //                   against: 4,
    //                 },
    //               },
    //               away: {
    //                 played: 10,
    //                 win: 1,
    //                 draw: 5,
    //                 lose: 4,
    //                 goals: {
    //                   for: 15,
    //                   against: 19,
    //                 },
    //               },
    //               update: '2023-12-26T00:00:00+00:00',
    //             },
    //             {
    //               rank: 9,
    //               team: {
    //                 id: 534,
    //                 name: 'Las Palmas',
    //                 logo: 'https://media-4.api-sports.io/football/teams/534.png',
    //               },
    //               points: 25,
    //               goalsDiff: 0,
    //               group: 'Primera Divisi\u00f3n',
    //               form: 'LDWWL',
    //               status: 'same',
    //               description: null,
    //               all: {
    //                 played: 18,
    //                 win: 7,
    //                 draw: 4,
    //                 lose: 7,
    //                 goals: {
    //                   for: 15,
    //                   against: 15,
    //                 },
    //               },
    //               home: {
    //                 played: 8,
    //                 win: 4,
    //                 draw: 3,
    //                 lose: 1,
    //                 goals: {
    //                   for: 9,
    //                   against: 5,
    //                 },
    //               },
    //               away: {
    //                 played: 10,
    //                 win: 3,
    //                 draw: 1,
    //                 lose: 6,
    //                 goals: {
    //                   for: 6,
    //                   against: 10,
    //                 },
    //               },
    //               update: '2023-12-26T00:00:00+00:00',
    //             },
    //             {
    //               rank: 10,
    //               team: {
    //                 id: 532,
    //                 name: 'Valencia',
    //                 logo: 'https://media-4.api-sports.io/football/teams/532.png',
    //               },
    //               points: 23,
    //               goalsDiff: -3,
    //               group: 'Primera Divisi\u00f3n',
    //               form: 'WDLLD',
    //               status: 'same',
    //               description: null,
    //               all: {
    //                 played: 18,
    //                 win: 6,
    //                 draw: 5,
    //                 lose: 7,
    //                 goals: {
    //                   for: 19,
    //                   against: 22,
    //                 },
    //               },
    //               home: {
    //                 played: 8,
    //                 win: 4,
    //                 draw: 2,
    //                 lose: 2,
    //                 goals: {
    //                   for: 9,
    //                   against: 4,
    //                 },
    //               },
    //               away: {
    //                 played: 10,
    //                 win: 2,
    //                 draw: 3,
    //                 lose: 5,
    //                 goals: {
    //                   for: 10,
    //                   against: 18,
    //                 },
    //               },
    //               update: '2023-12-26T00:00:00+00:00',
    //             },
    //             {
    //               rank: 11,
    //               team: {
    //                 id: 728,
    //                 name: 'Rayo Vallecano',
    //                 logo: 'https://media-4.api-sports.io/football/teams/728.png',
    //               },
    //               points: 20,
    //               goalsDiff: -8,
    //               group: 'Primera Divisi\u00f3n',
    //               form: 'LLDLD',
    //               status: 'same',
    //               description: null,
    //               all: {
    //                 played: 18,
    //                 win: 4,
    //                 draw: 8,
    //                 lose: 6,
    //                 goals: {
    //                   for: 16,
    //                   against: 24,
    //                 },
    //               },
    //               home: {
    //                 played: 9,
    //                 win: 1,
    //                 draw: 5,
    //                 lose: 3,
    //                 goals: {
    //                   for: 9,
    //                   against: 16,
    //                 },
    //               },
    //               away: {
    //                 played: 9,
    //                 win: 3,
    //                 draw: 3,
    //                 lose: 3,
    //                 goals: {
    //                   for: 7,
    //                   against: 8,
    //                 },
    //               },
    //               update: '2023-12-26T00:00:00+00:00',
    //             },
    //             {
    //               rank: 12,
    //               team: {
    //                 id: 727,
    //                 name: 'Osasuna',
    //                 logo: 'https://media-4.api-sports.io/football/teams/727.png',
    //               },
    //               points: 19,
    //               goalsDiff: -8,
    //               group: 'Primera Divisi\u00f3n',
    //               form: 'LWDDL',
    //               status: 'same',
    //               description: null,
    //               all: {
    //                 played: 18,
    //                 win: 5,
    //                 draw: 4,
    //                 lose: 9,
    //                 goals: {
    //                   for: 21,
    //                   against: 29,
    //                 },
    //               },
    //               home: {
    //                 played: 9,
    //                 win: 2,
    //                 draw: 3,
    //                 lose: 4,
    //                 goals: {
    //                   for: 8,
    //                   against: 12,
    //                 },
    //               },
    //               away: {
    //                 played: 9,
    //                 win: 3,
    //                 draw: 1,
    //                 lose: 5,
    //                 goals: {
    //                   for: 13,
    //                   against: 17,
    //                 },
    //               },
    //               update: '2023-12-26T00:00:00+00:00',
    //             },
    //             {
    //               rank: 13,
    //               team: {
    //                 id: 533,
    //                 name: 'Villarreal',
    //                 logo: 'https://media-4.api-sports.io/football/teams/533.png',
    //               },
    //               points: 19,
    //               goalsDiff: -9,
    //               group: 'Primera Divisi\u00f3n',
    //               form: 'WLLDW',
    //               status: 'same',
    //               description: null,
    //               all: {
    //                 played: 18,
    //                 win: 5,
    //                 draw: 4,
    //                 lose: 9,
    //                 goals: {
    //                   for: 26,
    //                   against: 35,
    //                 },
    //               },
    //               home: {
    //                 played: 10,
    //                 win: 3,
    //                 draw: 1,
    //                 lose: 6,
    //                 goals: {
    //                   for: 17,
    //                   against: 21,
    //                 },
    //               },
    //               away: {
    //                 played: 8,
    //                 win: 2,
    //                 draw: 3,
    //                 lose: 3,
    //                 goals: {
    //                   for: 9,
    //                   against: 14,
    //                 },
    //               },
    //               update: '2023-12-26T00:00:00+00:00',
    //             },
    //             {
    //               rank: 14,
    //               team: {
    //                 id: 798,
    //                 name: 'Mallorca',
    //                 logo: 'https://media-4.api-sports.io/football/teams/798.png',
    //               },
    //               points: 18,
    //               goalsDiff: -5,
    //               group: 'Primera Divisi\u00f3n',
    //               form: 'WDWDD',
    //               status: 'same',
    //               description: null,
    //               all: {
    //                 played: 18,
    //                 win: 3,
    //                 draw: 9,
    //                 lose: 6,
    //                 goals: {
    //                   for: 17,
    //                   against: 22,
    //                 },
    //               },
    //               home: {
    //                 played: 9,
    //                 win: 2,
    //                 draw: 6,
    //                 lose: 1,
    //                 goals: {
    //                   for: 8,
    //                   against: 7,
    //                 },
    //               },
    //               away: {
    //                 played: 9,
    //                 win: 1,
    //                 draw: 3,
    //                 lose: 5,
    //                 goals: {
    //                   for: 9,
    //                   against: 15,
    //                 },
    //               },
    //               update: '2023-12-26T00:00:00+00:00',
    //             },
    //             {
    //               rank: 15,
    //               team: {
    //                 id: 536,
    //                 name: 'Sevilla',
    //                 logo: 'https://media-4.api-sports.io/football/teams/536.png',
    //               },
    //               points: 16,
    //               goalsDiff: -2,
    //               group: 'Primera Divisi\u00f3n',
    //               form: 'LWLLD',
    //               status: 'same',
    //               description: null,
    //               all: {
    //                 played: 18,
    //                 win: 3,
    //                 draw: 7,
    //                 lose: 8,
    //                 goals: {
    //                   for: 23,
    //                   against: 25,
    //                 },
    //               },
    //               home: {
    //                 played: 9,
    //                 win: 2,
    //                 draw: 4,
    //                 lose: 3,
    //                 goals: {
    //                   for: 13,
    //                   against: 13,
    //                 },
    //               },
    //               away: {
    //                 played: 9,
    //                 win: 1,
    //                 draw: 3,
    //                 lose: 5,
    //                 goals: {
    //                   for: 10,
    //                   against: 12,
    //                 },
    //               },
    //               update: '2023-12-26T00:00:00+00:00',
    //             },
    //             {
    //               rank: 16,
    //               team: {
    //                 id: 542,
    //                 name: 'Alaves',
    //                 logo: 'https://media-4.api-sports.io/football/teams/542.png',
    //               },
    //               points: 16,
    //               goalsDiff: -10,
    //               group: 'Primera Divisi\u00f3n',
    //               form: 'LLLDW',
    //               status: 'same',
    //               description: null,
    //               all: {
    //                 played: 18,
    //                 win: 4,
    //                 draw: 4,
    //                 lose: 10,
    //                 goals: {
    //                   for: 14,
    //                   against: 24,
    //                 },
    //               },
    //               home: {
    //                 played: 9,
    //                 win: 4,
    //                 draw: 1,
    //                 lose: 4,
    //                 goals: {
    //                   for: 10,
    //                   against: 11,
    //                 },
    //               },
    //               away: {
    //                 played: 9,
    //                 win: 0,
    //                 draw: 3,
    //                 lose: 6,
    //                 goals: {
    //                   for: 4,
    //                   against: 13,
    //                 },
    //               },
    //               update: '2023-12-26T00:00:00+00:00',
    //             },
    //             {
    //               rank: 17,
    //               team: {
    //                 id: 724,
    //                 name: 'Cadiz',
    //                 logo: 'https://media-4.api-sports.io/football/teams/724.png',
    //               },
    //               points: 15,
    //               goalsDiff: -10,
    //               group: 'Primera Divisi\u00f3n',
    //               form: 'DDDDD',
    //               status: 'same',
    //               description: null,
    //               all: {
    //                 played: 18,
    //                 win: 2,
    //                 draw: 9,
    //                 lose: 7,
    //                 goals: {
    //                   for: 14,
    //                   against: 24,
    //                 },
    //               },
    //               home: {
    //                 played: 9,
    //                 win: 2,
    //                 draw: 5,
    //                 lose: 2,
    //                 goals: {
    //                   for: 8,
    //                   against: 9,
    //                 },
    //               },
    //               away: {
    //                 played: 9,
    //                 win: 0,
    //                 draw: 4,
    //                 lose: 5,
    //                 goals: {
    //                   for: 6,
    //                   against: 15,
    //                 },
    //               },
    //               update: '2023-12-26T00:00:00+00:00',
    //             },
    //             {
    //               rank: 18,
    //               team: {
    //                 id: 538,
    //                 name: 'Celta Vigo',
    //                 logo: 'https://media-4.api-sports.io/football/teams/538.png',
    //               },
    //               points: 13,
    //               goalsDiff: -10,
    //               group: 'Primera Divisi\u00f3n',
    //               form: 'LWDDD',
    //               status: 'same',
    //               description: 'Relegation - LaLiga2',
    //               all: {
    //                 played: 18,
    //                 win: 2,
    //                 draw: 7,
    //                 lose: 9,
    //                 goals: {
    //                   for: 18,
    //                   against: 28,
    //                 },
    //               },
    //               home: {
    //                 played: 9,
    //                 win: 1,
    //                 draw: 4,
    //                 lose: 4,
    //                 goals: {
    //                   for: 6,
    //                   against: 12,
    //                 },
    //               },
    //               away: {
    //                 played: 9,
    //                 win: 1,
    //                 draw: 3,
    //                 lose: 5,
    //                 goals: {
    //                   for: 12,
    //                   against: 16,
    //                 },
    //               },
    //               update: '2023-12-26T00:00:00+00:00',
    //             },
    //             {
    //               rank: 19,
    //               team: {
    //                 id: 715,
    //                 name: 'Granada CF',
    //                 logo: 'https://media-4.api-sports.io/football/teams/715.png',
    //               },
    //               points: 8,
    //               goalsDiff: -20,
    //               group: 'Primera Divisi\u00f3n',
    //               form: 'LLDLL',
    //               status: 'same',
    //               description: 'Relegation - LaLiga2',
    //               all: {
    //                 played: 18,
    //                 win: 1,
    //                 draw: 5,
    //                 lose: 12,
    //                 goals: {
    //                   for: 20,
    //                   against: 40,
    //                 },
    //               },
    //               home: {
    //                 played: 9,
    //                 win: 1,
    //                 draw: 4,
    //                 lose: 4,
    //                 goals: {
    //                   for: 12,
    //                   against: 19,
    //                 },
    //               },
    //               away: {
    //                 played: 9,
    //                 win: 0,
    //                 draw: 1,
    //                 lose: 8,
    //                 goals: {
    //                   for: 8,
    //                   against: 21,
    //                 },
    //               },
    //               update: '2023-12-26T00:00:00+00:00',
    //             },
    //             {
    //               rank: 20,
    //               team: {
    //                 id: 723,
    //                 name: 'Almeria',
    //                 logo: 'https://media-4.api-sports.io/football/teams/723.png',
    //               },
    //               points: 5,
    //               goalsDiff: -23,
    //               group: 'Primera Divisi\u00f3n',
    //               form: 'LDLDL',
    //               status: 'same',
    //               description: 'Relegation - LaLiga2',
    //               all: {
    //                 played: 18,
    //                 win: 0,
    //                 draw: 5,
    //                 lose: 13,
    //                 goals: {
    //                   for: 19,
    //                   against: 42,
    //                 },
    //               },
    //               home: {
    //                 played: 9,
    //                 win: 0,
    //                 draw: 4,
    //                 lose: 5,
    //                 goals: {
    //                   for: 10,
    //                   against: 18,
    //                 },
    //               },
    //               away: {
    //                 played: 9,
    //                 win: 0,
    //                 draw: 1,
    //                 lose: 8,
    //                 goals: {
    //                   for: 9,
    //                   against: 24,
    //                 },
    //               },
    //               update: '2023-12-26T00:00:00+00:00',
    //             },
    //           ],
    //         ],
    //       },
    //     },
    //   ],
    // };

    // this.standing_cache.set(this.country_name, response);
    // return response;

    if (!this.standing_cache.has(this.country_name)) {
      return this.http
        .get<ApiStandingResponse>(
          'https://v3.football.api-sports.io/standings',
          { headers, params }
        )
        .subscribe(
          (response) => {
            this.standing_cache.set(this.country_name, response);
          },
          (error) => {
            console.log('error ***', error);
          }
        );
    } else {
      return new Subscription();
    }
  }

  getTopLeague(team_id: string): Subscription {
    this.team_id = team_id;
    const headers = new HttpHeaders({
      'x-rapidapi-host': environment.header.xRapidapiHost,
      'x-rapidapi-key': environment.header.xRapidapiKey,
    });

    let params = new HttpParams()
      .append('team', team_id)
      .append('season', 2023);

    //creating dummy response as daily limit is 10 request for 10 min
    // let response: any = {
    //   get: 'fixtures',
    //   parameters: {
    //     team: '541',
    //     season: '2023',
    //   },
    //   errors: [],
    //   results: 53,
    //   paging: {
    //     current: 1,
    //     total: 1,
    //   },
    //   response: [
    //     {
    //       fixture: {
    //         id: 1030303,
    //         referee: 'T. Ford',
    //         timezone: 'UTC',
    //         date: '2023-07-24T02:00:00+00:00',
    //         timestamp: 1690164000,
    //         periods: {
    //           first: 1690164000,
    //           second: 1690167600,
    //         },
    //         venue: {
    //           id: null,
    //           name: 'Rose Bowl',
    //           city: 'Pasadena, California',
    //         },
    //         status: {
    //           long: 'Match Finished',
    //           short: 'FT',
    //           elapsed: 90,
    //         },
    //       },
    //       league: {
    //         id: 667,
    //         name: 'Friendlies Clubs',
    //         country: 'World',
    //         logo: 'https://media-4.api-sports.io/football/leagues/667.png',
    //         flag: null,
    //         season: 2023,
    //         round: 'Club Friendlies 1',
    //       },
    //       teams: {
    //         home: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: true,
    //         },
    //         away: {
    //           id: 489,
    //           name: 'AC Milan',
    //           logo: 'https://media-4.api-sports.io/football/teams/489.png',
    //           winner: false,
    //         },
    //       },
    //       goals: {
    //         home: 3,
    //         away: 2,
    //       },
    //       score: {
    //         halftime: {
    //           home: 0,
    //           away: 2,
    //         },
    //         fulltime: {
    //           home: 3,
    //           away: 2,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1030312,
    //         referee: 'L. Szpala',
    //         timezone: 'UTC',
    //         date: '2023-07-27T00:30:00+00:00',
    //         timestamp: 1690417800,
    //         periods: {
    //           first: 1690417800,
    //           second: 1690421400,
    //         },
    //         venue: {
    //           id: null,
    //           name: 'NRG Stadium',
    //           city: 'Houston, Texas',
    //         },
    //         status: {
    //           long: 'Match Finished',
    //           short: 'FT',
    //           elapsed: 90,
    //         },
    //       },
    //       league: {
    //         id: 667,
    //         name: 'Friendlies Clubs',
    //         country: 'World',
    //         logo: 'https://media-4.api-sports.io/football/leagues/667.png',
    //         flag: null,
    //         season: 2023,
    //         round: 'Club Friendlies 1',
    //       },
    //       teams: {
    //         home: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: true,
    //         },
    //         away: {
    //           id: 33,
    //           name: 'Manchester United',
    //           logo: 'https://media-4.api-sports.io/football/teams/33.png',
    //           winner: false,
    //         },
    //       },
    //       goals: {
    //         home: 2,
    //         away: 0,
    //       },
    //       score: {
    //         halftime: {
    //           home: 1,
    //           away: 0,
    //         },
    //         fulltime: {
    //           home: 2,
    //           away: 0,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1030323,
    //         referee: 'I. Elfath',
    //         timezone: 'UTC',
    //         date: '2023-08-02T23:30:00+00:00',
    //         timestamp: 1691019000,
    //         periods: {
    //           first: 1691019000,
    //           second: 1691022600,
    //         },
    //         venue: {
    //           id: null,
    //           name: 'Camping World Stadium',
    //           city: 'Orlando, Florida',
    //         },
    //         status: {
    //           long: 'Match Finished',
    //           short: 'FT',
    //           elapsed: 90,
    //         },
    //       },
    //       league: {
    //         id: 667,
    //         name: 'Friendlies Clubs',
    //         country: 'World',
    //         logo: 'https://media-4.api-sports.io/football/leagues/667.png',
    //         flag: null,
    //         season: 2023,
    //         round: 'Club Friendlies 1',
    //       },
    //       teams: {
    //         home: {
    //           id: 496,
    //           name: 'Juventus',
    //           logo: 'https://media-4.api-sports.io/football/teams/496.png',
    //           winner: true,
    //         },
    //         away: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: false,
    //         },
    //       },
    //       goals: {
    //         home: 3,
    //         away: 1,
    //       },
    //       score: {
    //         halftime: {
    //           home: 2,
    //           away: 1,
    //         },
    //         fulltime: {
    //           home: 3,
    //           away: 1,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1037953,
    //         referee: 'Jes\u00fas Gil',
    //         timezone: 'UTC',
    //         date: '2023-08-12T19:30:00+00:00',
    //         timestamp: 1691868600,
    //         periods: {
    //           first: 1691868600,
    //           second: 1691872200,
    //         },
    //         venue: {
    //           id: 1460,
    //           name: 'San Mam\u00e9s Barria',
    //           city: 'Bilbao',
    //         },
    //         status: {
    //           long: 'Match Finished',
    //           short: 'FT',
    //           elapsed: 90,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 1',
    //       },
    //       teams: {
    //         home: {
    //           id: 531,
    //           name: 'Athletic Club',
    //           logo: 'https://media-4.api-sports.io/football/teams/531.png',
    //           winner: false,
    //         },
    //         away: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: true,
    //         },
    //       },
    //       goals: {
    //         home: 0,
    //         away: 2,
    //       },
    //       score: {
    //         halftime: {
    //           home: 0,
    //           away: 2,
    //         },
    //         fulltime: {
    //           home: 0,
    //           away: 2,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1037962,
    //         referee: 'Jos\u00e9 S\u00e1nchez',
    //         timezone: 'UTC',
    //         date: '2023-08-19T17:30:00+00:00',
    //         timestamp: 1692466200,
    //         periods: {
    //           first: 1692466200,
    //           second: 1692469800,
    //         },
    //         venue: {
    //           id: 19216,
    //           name: 'Power Horse Stadium \u2013 Estadio de los Juegos Mediterr\u00e1neos',
    //           city: 'Almer\u00eda',
    //         },
    //         status: {
    //           long: 'Match Finished',
    //           short: 'FT',
    //           elapsed: 90,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 2',
    //       },
    //       teams: {
    //         home: {
    //           id: 723,
    //           name: 'Almeria',
    //           logo: 'https://media-4.api-sports.io/football/teams/723.png',
    //           winner: false,
    //         },
    //         away: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: true,
    //         },
    //       },
    //       goals: {
    //         home: 1,
    //         away: 3,
    //       },
    //       score: {
    //         halftime: {
    //           home: 1,
    //           away: 1,
    //         },
    //         fulltime: {
    //           home: 1,
    //           away: 3,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1037973,
    //         referee: 'Isidro D\u00edaz de Mera',
    //         timezone: 'UTC',
    //         date: '2023-08-25T19:30:00+00:00',
    //         timestamp: 1692991800,
    //         periods: {
    //           first: 1692991800,
    //           second: 1692995400,
    //         },
    //         venue: {
    //           id: 1467,
    //           name: 'Abanca-Bala\u00eddos',
    //           city: 'Vigo',
    //         },
    //         status: {
    //           long: 'Match Finished',
    //           short: 'FT',
    //           elapsed: 90,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 3',
    //       },
    //       teams: {
    //         home: {
    //           id: 538,
    //           name: 'Celta Vigo',
    //           logo: 'https://media-4.api-sports.io/football/teams/538.png',
    //           winner: false,
    //         },
    //         away: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: true,
    //         },
    //       },
    //       goals: {
    //         home: 0,
    //         away: 1,
    //       },
    //       score: {
    //         halftime: {
    //           home: 0,
    //           away: 0,
    //         },
    //         fulltime: {
    //           home: 0,
    //           away: 1,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1037990,
    //         referee: 'Mario Melero',
    //         timezone: 'UTC',
    //         date: '2023-09-02T14:15:00+00:00',
    //         timestamp: 1693664100,
    //         periods: {
    //           first: 1693664100,
    //           second: 1693667700,
    //         },
    //         venue: {
    //           id: 1456,
    //           name: 'Estadio Santiago Bernab\u00e9u',
    //           city: 'Madrid',
    //         },
    //         status: {
    //           long: 'Match Finished',
    //           short: 'FT',
    //           elapsed: 90,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 4',
    //       },
    //       teams: {
    //         home: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: true,
    //         },
    //         away: {
    //           id: 546,
    //           name: 'Getafe',
    //           logo: 'https://media-4.api-sports.io/football/teams/546.png',
    //           winner: false,
    //         },
    //       },
    //       goals: {
    //         home: 2,
    //         away: 1,
    //       },
    //       score: {
    //         halftime: {
    //           home: 0,
    //           away: 1,
    //         },
    //         fulltime: {
    //           home: 2,
    //           away: 1,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1037996,
    //         referee: 'C\u00e9sar Soto',
    //         timezone: 'UTC',
    //         date: '2023-09-17T19:00:00+00:00',
    //         timestamp: 1694977200,
    //         periods: {
    //           first: 1694977200,
    //           second: 1694980800,
    //         },
    //         venue: {
    //           id: 1456,
    //           name: 'Estadio Santiago Bernab\u00e9u',
    //           city: 'Madrid',
    //         },
    //         status: {
    //           long: 'Match Finished',
    //           short: 'FT',
    //           elapsed: 90,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 5',
    //       },
    //       teams: {
    //         home: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: true,
    //         },
    //         away: {
    //           id: 548,
    //           name: 'Real Sociedad',
    //           logo: 'https://media-4.api-sports.io/football/teams/548.png',
    //           winner: false,
    //         },
    //       },
    //       goals: {
    //         home: 2,
    //         away: 1,
    //       },
    //       score: {
    //         halftime: {
    //           home: 0,
    //           away: 1,
    //         },
    //         fulltime: {
    //           home: 2,
    //           away: 1,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038003,
    //         referee: 'Javier Alberola',
    //         timezone: 'UTC',
    //         date: '2023-09-24T19:00:00+00:00',
    //         timestamp: 1695582000,
    //         periods: {
    //           first: 1695582000,
    //           second: 1695585600,
    //         },
    //         venue: {
    //           id: 19217,
    //           name: 'Est\u00e1dio C\u00edvitas Metropolitano',
    //           city: 'Madrid',
    //         },
    //         status: {
    //           long: 'Match Finished',
    //           short: 'FT',
    //           elapsed: 90,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 6',
    //       },
    //       teams: {
    //         home: {
    //           id: 530,
    //           name: 'Atletico Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/530.png',
    //           winner: true,
    //         },
    //         away: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: false,
    //         },
    //       },
    //       goals: {
    //         home: 3,
    //         away: 1,
    //       },
    //       score: {
    //         halftime: {
    //           home: 2,
    //           away: 1,
    //         },
    //         fulltime: {
    //           home: 3,
    //           away: 1,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038020,
    //         referee: 'Jos\u00e9 Munuera',
    //         timezone: 'UTC',
    //         date: '2023-09-27T17:00:00+00:00',
    //         timestamp: 1695834000,
    //         periods: {
    //           first: 1695834000,
    //           second: 1695837600,
    //         },
    //         venue: {
    //           id: 1456,
    //           name: 'Estadio Santiago Bernab\u00e9u',
    //           city: 'Madrid',
    //         },
    //         status: {
    //           long: 'Match Finished',
    //           short: 'FT',
    //           elapsed: 90,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 7',
    //       },
    //       teams: {
    //         home: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: true,
    //         },
    //         away: {
    //           id: 534,
    //           name: 'Las Palmas',
    //           logo: 'https://media-4.api-sports.io/football/teams/534.png',
    //           winner: false,
    //         },
    //       },
    //       goals: {
    //         home: 2,
    //         away: 0,
    //       },
    //       score: {
    //         halftime: {
    //           home: 1,
    //           away: 0,
    //         },
    //         fulltime: {
    //           home: 2,
    //           away: 0,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038027,
    //         referee: 'Juan Pulido',
    //         timezone: 'UTC',
    //         date: '2023-09-30T16:30:00+00:00',
    //         timestamp: 1696091400,
    //         periods: {
    //           first: 1696091400,
    //           second: 1696095000,
    //         },
    //         venue: {
    //           id: 1478,
    //           name: 'Estadi Municipal de Montilivi',
    //           city: 'Girona',
    //         },
    //         status: {
    //           long: 'Match Finished',
    //           short: 'FT',
    //           elapsed: 90,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 8',
    //       },
    //       teams: {
    //         home: {
    //           id: 547,
    //           name: 'Girona',
    //           logo: 'https://media-4.api-sports.io/football/teams/547.png',
    //           winner: false,
    //         },
    //         away: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: true,
    //         },
    //       },
    //       goals: {
    //         home: 0,
    //         away: 3,
    //       },
    //       score: {
    //         halftime: {
    //           home: 0,
    //           away: 2,
    //         },
    //         fulltime: {
    //           home: 0,
    //           away: 3,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038039,
    //         referee: 'Guillermo Cuadra',
    //         timezone: 'UTC',
    //         date: '2023-10-07T14:15:00+00:00',
    //         timestamp: 1696688100,
    //         periods: {
    //           first: 1696688100,
    //           second: 1696691700,
    //         },
    //         venue: {
    //           id: 1456,
    //           name: 'Estadio Santiago Bernab\u00e9u',
    //           city: 'Madrid',
    //         },
    //         status: {
    //           long: 'Match Finished',
    //           short: 'FT',
    //           elapsed: 90,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 9',
    //       },
    //       teams: {
    //         home: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: true,
    //         },
    //         away: {
    //           id: 727,
    //           name: 'Osasuna',
    //           logo: 'https://media-4.api-sports.io/football/teams/727.png',
    //           winner: false,
    //         },
    //       },
    //       goals: {
    //         home: 4,
    //         away: 0,
    //       },
    //       score: {
    //         halftime: {
    //           home: 1,
    //           away: 0,
    //         },
    //         fulltime: {
    //           home: 4,
    //           away: 0,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038049,
    //         referee: 'Ricardo De Burgos',
    //         timezone: 'UTC',
    //         date: '2023-10-21T16:30:00+00:00',
    //         timestamp: 1697905800,
    //         periods: {
    //           first: 1697905800,
    //           second: 1697909400,
    //         },
    //         venue: {
    //           id: 1494,
    //           name: 'Estadio Ram\u00f3n S\u00e1nchez Pizju\u00e1n',
    //           city: 'Sevilla',
    //         },
    //         status: {
    //           long: 'Match Finished',
    //           short: 'FT',
    //           elapsed: 90,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 10',
    //       },
    //       teams: {
    //         home: {
    //           id: 536,
    //           name: 'Sevilla',
    //           logo: 'https://media-4.api-sports.io/football/teams/536.png',
    //           winner: null,
    //         },
    //         away: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: null,
    //         },
    //       },
    //       goals: {
    //         home: 1,
    //         away: 1,
    //       },
    //       score: {
    //         halftime: {
    //           home: 0,
    //           away: 0,
    //         },
    //         fulltime: {
    //           home: 1,
    //           away: 1,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038054,
    //         referee: 'Jes\u00fas Gil',
    //         timezone: 'UTC',
    //         date: '2023-10-28T14:15:00+00:00',
    //         timestamp: 1698502500,
    //         periods: {
    //           first: 1698502500,
    //           second: 1698506100,
    //         },
    //         venue: {
    //           id: 19939,
    //           name: 'Estadi Ol\u00edmpic Llu\u00eds Companys',
    //           city: 'Barcelona',
    //         },
    //         status: {
    //           long: 'Match Finished',
    //           short: 'FT',
    //           elapsed: 90,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 11',
    //       },
    //       teams: {
    //         home: {
    //           id: 529,
    //           name: 'Barcelona',
    //           logo: 'https://media-4.api-sports.io/football/teams/529.png',
    //           winner: false,
    //         },
    //         away: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: true,
    //         },
    //       },
    //       goals: {
    //         home: 1,
    //         away: 2,
    //       },
    //       score: {
    //         halftime: {
    //           home: 1,
    //           away: 0,
    //         },
    //         fulltime: {
    //           home: 1,
    //           away: 2,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038070,
    //         referee: 'Juan Mart\u00ednez',
    //         timezone: 'UTC',
    //         date: '2023-11-05T20:00:00+00:00',
    //         timestamp: 1699214400,
    //         periods: {
    //           first: 1699214400,
    //           second: 1699218000,
    //         },
    //         venue: {
    //           id: 1456,
    //           name: 'Estadio Santiago Bernab\u00e9u',
    //           city: 'Madrid',
    //         },
    //         status: {
    //           long: 'Match Finished',
    //           short: 'FT',
    //           elapsed: 90,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 12',
    //       },
    //       teams: {
    //         home: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: null,
    //         },
    //         away: {
    //           id: 728,
    //           name: 'Rayo Vallecano',
    //           logo: 'https://media-4.api-sports.io/football/teams/728.png',
    //           winner: null,
    //         },
    //       },
    //       goals: {
    //         home: 0,
    //         away: 0,
    //       },
    //       score: {
    //         halftime: {
    //           home: 0,
    //           away: 0,
    //         },
    //         fulltime: {
    //           home: 0,
    //           away: 0,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038075,
    //         referee: 'Jos\u00e9 S\u00e1nchez',
    //         timezone: 'UTC',
    //         date: '2023-11-11T20:00:00+00:00',
    //         timestamp: 1699732800,
    //         periods: {
    //           first: 1699732800,
    //           second: 1699736400,
    //         },
    //         venue: {
    //           id: 1456,
    //           name: 'Estadio Santiago Bernab\u00e9u',
    //           city: 'Madrid',
    //         },
    //         status: {
    //           long: 'Match Finished',
    //           short: 'FT',
    //           elapsed: 90,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 13',
    //       },
    //       teams: {
    //         home: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: true,
    //         },
    //         away: {
    //           id: 532,
    //           name: 'Valencia',
    //           logo: 'https://media-4.api-sports.io/football/teams/532.png',
    //           winner: false,
    //         },
    //       },
    //       goals: {
    //         home: 5,
    //         away: 1,
    //       },
    //       score: {
    //         halftime: {
    //           home: 2,
    //           away: 0,
    //         },
    //         fulltime: {
    //           home: 5,
    //           away: 1,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038084,
    //         referee: 'Guillermo Cuadra',
    //         timezone: 'UTC',
    //         date: '2023-11-26T17:30:00+00:00',
    //         timestamp: 1701019800,
    //         periods: {
    //           first: 1701019800,
    //           second: 1701023400,
    //         },
    //         venue: {
    //           id: 11915,
    //           name: 'Estadio Nuevo Mirandilla',
    //           city: 'C\u00e1diz',
    //         },
    //         status: {
    //           long: 'Match Finished',
    //           short: 'FT',
    //           elapsed: 90,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 14',
    //       },
    //       teams: {
    //         home: {
    //           id: 724,
    //           name: 'Cadiz',
    //           logo: 'https://media-4.api-sports.io/football/teams/724.png',
    //           winner: false,
    //         },
    //         away: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: true,
    //         },
    //       },
    //       goals: {
    //         home: 0,
    //         away: 3,
    //       },
    //       score: {
    //         halftime: {
    //           home: 0,
    //           away: 1,
    //         },
    //         fulltime: {
    //           home: 0,
    //           away: 3,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038100,
    //         referee: 'Pablo Gonz\u00e1lez',
    //         timezone: 'UTC',
    //         date: '2023-12-02T17:30:00+00:00',
    //         timestamp: 1701538200,
    //         periods: {
    //           first: 1701538200,
    //           second: 1701541800,
    //         },
    //         venue: {
    //           id: 1456,
    //           name: 'Estadio Santiago Bernab\u00e9u',
    //           city: 'Madrid',
    //         },
    //         status: {
    //           long: 'Match Finished',
    //           short: 'FT',
    //           elapsed: 90,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 15',
    //       },
    //       teams: {
    //         home: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: true,
    //         },
    //         away: {
    //           id: 715,
    //           name: 'Granada CF',
    //           logo: 'https://media-4.api-sports.io/football/teams/715.png',
    //           winner: false,
    //         },
    //       },
    //       goals: {
    //         home: 2,
    //         away: 0,
    //       },
    //       score: {
    //         halftime: {
    //           home: 1,
    //           away: 0,
    //         },
    //         fulltime: {
    //           home: 2,
    //           away: 0,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038103,
    //         referee: 'C\u00e9sar Soto',
    //         timezone: 'UTC',
    //         date: '2023-12-09T15:15:00+00:00',
    //         timestamp: 1702134900,
    //         periods: {
    //           first: 1702134900,
    //           second: 1702138500,
    //         },
    //         venue: {
    //           id: 1489,
    //           name: 'Estadio Benito Villamar\u00edn',
    //           city: 'Sevilla',
    //         },
    //         status: {
    //           long: 'Match Finished',
    //           short: 'FT',
    //           elapsed: 90,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 16',
    //       },
    //       teams: {
    //         home: {
    //           id: 543,
    //           name: 'Real Betis',
    //           logo: 'https://media-4.api-sports.io/football/teams/543.png',
    //           winner: null,
    //         },
    //         away: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: null,
    //         },
    //       },
    //       goals: {
    //         home: 1,
    //         away: 1,
    //       },
    //       score: {
    //         halftime: {
    //           home: 0,
    //           away: 0,
    //         },
    //         fulltime: {
    //           home: 1,
    //           away: 1,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038116,
    //         referee: 'Jorge Figueroa',
    //         timezone: 'UTC',
    //         date: '2023-12-17T20:00:00+00:00',
    //         timestamp: 1702843200,
    //         periods: {
    //           first: 1702843200,
    //           second: 1702846800,
    //         },
    //         venue: {
    //           id: 1456,
    //           name: 'Estadio Santiago Bernab\u00e9u',
    //           city: 'Madrid',
    //         },
    //         status: {
    //           long: 'Match Finished',
    //           short: 'FT',
    //           elapsed: 90,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 17',
    //       },
    //       teams: {
    //         home: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: true,
    //         },
    //         away: {
    //           id: 533,
    //           name: 'Villarreal',
    //           logo: 'https://media-4.api-sports.io/football/teams/533.png',
    //           winner: false,
    //         },
    //       },
    //       goals: {
    //         home: 4,
    //         away: 1,
    //       },
    //       score: {
    //         halftime: {
    //           home: 2,
    //           away: 0,
    //         },
    //         fulltime: {
    //           home: 4,
    //           away: 1,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038129,
    //         referee: 'Isidro D\u00edaz de Mera',
    //         timezone: 'UTC',
    //         date: '2023-12-21T20:30:00+00:00',
    //         timestamp: 1703190600,
    //         periods: {
    //           first: 1703190600,
    //           second: 1703194200,
    //         },
    //         venue: {
    //           id: 1470,
    //           name: 'Estadio de Mendizorroza',
    //           city: 'Vitoria-Gasteiz',
    //         },
    //         status: {
    //           long: 'Match Finished',
    //           short: 'FT',
    //           elapsed: 90,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 18',
    //       },
    //       teams: {
    //         home: {
    //           id: 542,
    //           name: 'Alaves',
    //           logo: 'https://media-4.api-sports.io/football/teams/542.png',
    //           winner: false,
    //         },
    //         away: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: true,
    //         },
    //       },
    //       goals: {
    //         home: 0,
    //         away: 1,
    //       },
    //       score: {
    //         halftime: {
    //           home: 0,
    //           away: 0,
    //         },
    //         fulltime: {
    //           home: 0,
    //           away: 1,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038140,
    //         referee: null,
    //         timezone: 'UTC',
    //         date: '2024-01-03T18:15:00+00:00',
    //         timestamp: 1704305700,
    //         periods: {
    //           first: null,
    //           second: null,
    //         },
    //         venue: {
    //           id: 1456,
    //           name: 'Estadio Santiago Bernab\u00e9u',
    //           city: 'Madrid',
    //         },
    //         status: {
    //           long: 'Not Started',
    //           short: 'NS',
    //           elapsed: null,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 19',
    //       },
    //       teams: {
    //         home: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: null,
    //         },
    //         away: {
    //           id: 798,
    //           name: 'Mallorca',
    //           logo: 'https://media-4.api-sports.io/football/teams/798.png',
    //           winner: null,
    //         },
    //       },
    //       goals: {
    //         home: null,
    //         away: null,
    //       },
    //       score: {
    //         halftime: {
    //           home: null,
    //           away: null,
    //         },
    //         fulltime: {
    //           home: null,
    //           away: null,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038148,
    //         referee: null,
    //         timezone: 'UTC',
    //         date: '2024-02-01T20:00:00+00:00',
    //         timestamp: 1706817600,
    //         periods: {
    //           first: null,
    //           second: null,
    //         },
    //         venue: {
    //           id: 20422,
    //           name: 'Estadio Coliseum',
    //           city: 'Getafe',
    //         },
    //         status: {
    //           long: 'Not Started',
    //           short: 'NS',
    //           elapsed: null,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 20',
    //       },
    //       teams: {
    //         home: {
    //           id: 546,
    //           name: 'Getafe',
    //           logo: 'https://media-4.api-sports.io/football/teams/546.png',
    //           winner: null,
    //         },
    //         away: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: null,
    //         },
    //       },
    //       goals: {
    //         home: null,
    //         away: null,
    //       },
    //       score: {
    //         halftime: {
    //           home: null,
    //           away: null,
    //         },
    //         fulltime: {
    //           home: null,
    //           away: null,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038155,
    //         referee: null,
    //         timezone: 'UTC',
    //         date: '2024-01-21T00:00:00+00:00',
    //         timestamp: 1705795200,
    //         periods: {
    //           first: null,
    //           second: null,
    //         },
    //         venue: {
    //           id: 1456,
    //           name: 'Estadio Santiago Bernab\u00e9u',
    //           city: 'Madrid',
    //         },
    //         status: {
    //           long: 'Time to be defined',
    //           short: 'TBD',
    //           elapsed: null,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 21',
    //       },
    //       teams: {
    //         home: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: null,
    //         },
    //         away: {
    //           id: 723,
    //           name: 'Almeria',
    //           logo: 'https://media-4.api-sports.io/football/teams/723.png',
    //           winner: null,
    //         },
    //       },
    //       goals: {
    //         home: null,
    //         away: null,
    //       },
    //       score: {
    //         halftime: {
    //           home: null,
    //           away: null,
    //         },
    //         fulltime: {
    //           home: null,
    //           away: null,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038166,
    //         referee: null,
    //         timezone: 'UTC',
    //         date: '2024-01-28T00:00:00+00:00',
    //         timestamp: 1706400000,
    //         periods: {
    //           first: null,
    //           second: null,
    //         },
    //         venue: {
    //           id: 1481,
    //           name: 'Estadio de Gran Canaria',
    //           city: 'Las Palmas de Gran Canaria',
    //         },
    //         status: {
    //           long: 'Time to be defined',
    //           short: 'TBD',
    //           elapsed: null,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 22',
    //       },
    //       teams: {
    //         home: {
    //           id: 534,
    //           name: 'Las Palmas',
    //           logo: 'https://media-4.api-sports.io/football/teams/534.png',
    //           winner: null,
    //         },
    //         away: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: null,
    //         },
    //       },
    //       goals: {
    //         home: null,
    //         away: null,
    //       },
    //       score: {
    //         halftime: {
    //           home: null,
    //           away: null,
    //         },
    //         fulltime: {
    //           home: null,
    //           away: null,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038179,
    //         referee: null,
    //         timezone: 'UTC',
    //         date: '2024-02-04T00:00:00+00:00',
    //         timestamp: 1707004800,
    //         periods: {
    //           first: null,
    //           second: null,
    //         },
    //         venue: {
    //           id: 1456,
    //           name: 'Estadio Santiago Bernab\u00e9u',
    //           city: 'Madrid',
    //         },
    //         status: {
    //           long: 'Time to be defined',
    //           short: 'TBD',
    //           elapsed: null,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 23',
    //       },
    //       teams: {
    //         home: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: null,
    //         },
    //         away: {
    //           id: 530,
    //           name: 'Atletico Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/530.png',
    //           winner: null,
    //         },
    //       },
    //       goals: {
    //         home: null,
    //         away: null,
    //       },
    //       score: {
    //         halftime: {
    //           home: null,
    //           away: null,
    //         },
    //         fulltime: {
    //           home: null,
    //           away: null,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038190,
    //         referee: null,
    //         timezone: 'UTC',
    //         date: '2024-02-11T00:00:00+00:00',
    //         timestamp: 1707609600,
    //         periods: {
    //           first: null,
    //           second: null,
    //         },
    //         venue: {
    //           id: 1456,
    //           name: 'Estadio Santiago Bernab\u00e9u',
    //           city: 'Madrid',
    //         },
    //         status: {
    //           long: 'Time to be defined',
    //           short: 'TBD',
    //           elapsed: null,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 24',
    //       },
    //       teams: {
    //         home: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: null,
    //         },
    //         away: {
    //           id: 547,
    //           name: 'Girona',
    //           logo: 'https://media-4.api-sports.io/football/teams/547.png',
    //           winner: null,
    //         },
    //       },
    //       goals: {
    //         home: null,
    //         away: null,
    //       },
    //       score: {
    //         halftime: {
    //           home: null,
    //           away: null,
    //         },
    //         fulltime: {
    //           home: null,
    //           away: null,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038195,
    //         referee: null,
    //         timezone: 'UTC',
    //         date: '2024-02-18T00:00:00+00:00',
    //         timestamp: 1708214400,
    //         periods: {
    //           first: null,
    //           second: null,
    //         },
    //         venue: {
    //           id: 1488,
    //           name: 'Estadio de Vallecas',
    //           city: 'Madrid',
    //         },
    //         status: {
    //           long: 'Time to be defined',
    //           short: 'TBD',
    //           elapsed: null,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 25',
    //       },
    //       teams: {
    //         home: {
    //           id: 728,
    //           name: 'Rayo Vallecano',
    //           logo: 'https://media-4.api-sports.io/football/teams/728.png',
    //           winner: null,
    //         },
    //         away: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: null,
    //         },
    //       },
    //       goals: {
    //         home: null,
    //         away: null,
    //       },
    //       score: {
    //         halftime: {
    //           home: null,
    //           away: null,
    //         },
    //         fulltime: {
    //           home: null,
    //           away: null,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038206,
    //         referee: null,
    //         timezone: 'UTC',
    //         date: '2024-02-25T00:00:00+00:00',
    //         timestamp: 1708819200,
    //         periods: {
    //           first: null,
    //           second: null,
    //         },
    //         venue: {
    //           id: 1456,
    //           name: 'Estadio Santiago Bernab\u00e9u',
    //           city: 'Madrid',
    //         },
    //         status: {
    //           long: 'Time to be defined',
    //           short: 'TBD',
    //           elapsed: null,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 26',
    //       },
    //       teams: {
    //         home: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: null,
    //         },
    //         away: {
    //           id: 536,
    //           name: 'Sevilla',
    //           logo: 'https://media-4.api-sports.io/football/teams/536.png',
    //           winner: null,
    //         },
    //       },
    //       goals: {
    //         home: null,
    //         away: null,
    //       },
    //       score: {
    //         halftime: {
    //           home: null,
    //           away: null,
    //         },
    //         fulltime: {
    //           home: null,
    //           away: null,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038218,
    //         referee: null,
    //         timezone: 'UTC',
    //         date: '2024-03-03T00:00:00+00:00',
    //         timestamp: 1709424000,
    //         periods: {
    //           first: null,
    //           second: null,
    //         },
    //         venue: {
    //           id: 1497,
    //           name: 'Estadio de Mestalla',
    //           city: 'Valencia',
    //         },
    //         status: {
    //           long: 'Time to be defined',
    //           short: 'TBD',
    //           elapsed: null,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 27',
    //       },
    //       teams: {
    //         home: {
    //           id: 532,
    //           name: 'Valencia',
    //           logo: 'https://media-4.api-sports.io/football/teams/532.png',
    //           winner: null,
    //         },
    //         away: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: null,
    //         },
    //       },
    //       goals: {
    //         home: null,
    //         away: null,
    //       },
    //       score: {
    //         halftime: {
    //           home: null,
    //           away: null,
    //         },
    //         fulltime: {
    //           home: null,
    //           away: null,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038230,
    //         referee: null,
    //         timezone: 'UTC',
    //         date: '2024-03-10T00:00:00+00:00',
    //         timestamp: 1710028800,
    //         periods: {
    //           first: null,
    //           second: null,
    //         },
    //         venue: {
    //           id: 1456,
    //           name: 'Estadio Santiago Bernab\u00e9u',
    //           city: 'Madrid',
    //         },
    //         status: {
    //           long: 'Time to be defined',
    //           short: 'TBD',
    //           elapsed: null,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 28',
    //       },
    //       teams: {
    //         home: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: null,
    //         },
    //         away: {
    //           id: 538,
    //           name: 'Celta Vigo',
    //           logo: 'https://media-4.api-sports.io/football/teams/538.png',
    //           winner: null,
    //         },
    //       },
    //       goals: {
    //         home: null,
    //         away: null,
    //       },
    //       score: {
    //         halftime: {
    //           home: null,
    //           away: null,
    //         },
    //         fulltime: {
    //           home: null,
    //           away: null,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038234,
    //         referee: null,
    //         timezone: 'UTC',
    //         date: '2024-03-17T00:00:00+00:00',
    //         timestamp: 1710633600,
    //         periods: {
    //           first: null,
    //           second: null,
    //         },
    //         venue: {
    //           id: 1486,
    //           name: 'Estadio El Sadar',
    //           city: 'Iru\u00f1ea',
    //         },
    //         status: {
    //           long: 'Time to be defined',
    //           short: 'TBD',
    //           elapsed: null,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 29',
    //       },
    //       teams: {
    //         home: {
    //           id: 727,
    //           name: 'Osasuna',
    //           logo: 'https://media-4.api-sports.io/football/teams/727.png',
    //           winner: null,
    //         },
    //         away: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: null,
    //         },
    //       },
    //       goals: {
    //         home: null,
    //         away: null,
    //       },
    //       score: {
    //         halftime: {
    //           home: null,
    //           away: null,
    //         },
    //         fulltime: {
    //           home: null,
    //           away: null,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038248,
    //         referee: null,
    //         timezone: 'UTC',
    //         date: '2024-03-31T00:00:00+00:00',
    //         timestamp: 1711843200,
    //         periods: {
    //           first: null,
    //           second: null,
    //         },
    //         venue: {
    //           id: 1456,
    //           name: 'Estadio Santiago Bernab\u00e9u',
    //           city: 'Madrid',
    //         },
    //         status: {
    //           long: 'Time to be defined',
    //           short: 'TBD',
    //           elapsed: null,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 30',
    //       },
    //       teams: {
    //         home: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: null,
    //         },
    //         away: {
    //           id: 531,
    //           name: 'Athletic Club',
    //           logo: 'https://media-4.api-sports.io/football/teams/531.png',
    //           winner: null,
    //         },
    //       },
    //       goals: {
    //         home: null,
    //         away: null,
    //       },
    //       score: {
    //         halftime: {
    //           home: null,
    //           away: null,
    //         },
    //         fulltime: {
    //           home: null,
    //           away: null,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038255,
    //         referee: null,
    //         timezone: 'UTC',
    //         date: '2024-04-14T00:00:00+00:00',
    //         timestamp: 1713052800,
    //         periods: {
    //           first: null,
    //           second: null,
    //         },
    //         venue: {
    //           id: 19940,
    //           name: 'Estadi Mallorca Son Moix',
    //           city: 'Palma de Mallorca',
    //         },
    //         status: {
    //           long: 'Time to be defined',
    //           short: 'TBD',
    //           elapsed: null,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 31',
    //       },
    //       teams: {
    //         home: {
    //           id: 798,
    //           name: 'Mallorca',
    //           logo: 'https://media-4.api-sports.io/football/teams/798.png',
    //           winner: null,
    //         },
    //         away: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: null,
    //         },
    //       },
    //       goals: {
    //         home: null,
    //         away: null,
    //       },
    //       score: {
    //         halftime: {
    //           home: null,
    //           away: null,
    //         },
    //         fulltime: {
    //           home: null,
    //           away: null,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038267,
    //         referee: null,
    //         timezone: 'UTC',
    //         date: '2024-04-21T00:00:00+00:00',
    //         timestamp: 1713657600,
    //         periods: {
    //           first: null,
    //           second: null,
    //         },
    //         venue: {
    //           id: 1456,
    //           name: 'Estadio Santiago Bernab\u00e9u',
    //           city: 'Madrid',
    //         },
    //         status: {
    //           long: 'Time to be defined',
    //           short: 'TBD',
    //           elapsed: null,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 32',
    //       },
    //       teams: {
    //         home: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: null,
    //         },
    //         away: {
    //           id: 529,
    //           name: 'Barcelona',
    //           logo: 'https://media-4.api-sports.io/football/teams/529.png',
    //           winner: null,
    //         },
    //       },
    //       goals: {
    //         home: null,
    //         away: null,
    //       },
    //       score: {
    //         halftime: {
    //           home: null,
    //           away: null,
    //         },
    //         fulltime: {
    //           home: null,
    //           away: null,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038281,
    //         referee: null,
    //         timezone: 'UTC',
    //         date: '2024-04-28T00:00:00+00:00',
    //         timestamp: 1714262400,
    //         periods: {
    //           first: null,
    //           second: null,
    //         },
    //         venue: {
    //           id: 1491,
    //           name: 'Reale Arena',
    //           city: 'Donostia-San Sebasti\u00e1n',
    //         },
    //         status: {
    //           long: 'Time to be defined',
    //           short: 'TBD',
    //           elapsed: null,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 33',
    //       },
    //       teams: {
    //         home: {
    //           id: 548,
    //           name: 'Real Sociedad',
    //           logo: 'https://media-4.api-sports.io/football/teams/548.png',
    //           winner: null,
    //         },
    //         away: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: null,
    //         },
    //       },
    //       goals: {
    //         home: null,
    //         away: null,
    //       },
    //       score: {
    //         halftime: {
    //           home: null,
    //           away: null,
    //         },
    //         fulltime: {
    //           home: null,
    //           away: null,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038288,
    //         referee: null,
    //         timezone: 'UTC',
    //         date: '2024-05-05T00:00:00+00:00',
    //         timestamp: 1714867200,
    //         periods: {
    //           first: null,
    //           second: null,
    //         },
    //         venue: {
    //           id: 1456,
    //           name: 'Estadio Santiago Bernab\u00e9u',
    //           city: 'Madrid',
    //         },
    //         status: {
    //           long: 'Time to be defined',
    //           short: 'TBD',
    //           elapsed: null,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 34',
    //       },
    //       teams: {
    //         home: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: null,
    //         },
    //         away: {
    //           id: 724,
    //           name: 'Cadiz',
    //           logo: 'https://media-4.api-sports.io/football/teams/724.png',
    //           winner: null,
    //         },
    //       },
    //       goals: {
    //         home: null,
    //         away: null,
    //       },
    //       score: {
    //         halftime: {
    //           home: null,
    //           away: null,
    //         },
    //         fulltime: {
    //           home: null,
    //           away: null,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038296,
    //         referee: null,
    //         timezone: 'UTC',
    //         date: '2024-05-12T00:00:00+00:00',
    //         timestamp: 1715472000,
    //         periods: {
    //           first: null,
    //           second: null,
    //         },
    //         venue: {
    //           id: 1479,
    //           name: 'Estadio Nuevo Los C\u00e1rmenes',
    //           city: 'Granada',
    //         },
    //         status: {
    //           long: 'Time to be defined',
    //           short: 'TBD',
    //           elapsed: null,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 35',
    //       },
    //       teams: {
    //         home: {
    //           id: 715,
    //           name: 'Granada CF',
    //           logo: 'https://media-4.api-sports.io/football/teams/715.png',
    //           winner: null,
    //         },
    //         away: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: null,
    //         },
    //       },
    //       goals: {
    //         home: null,
    //         away: null,
    //       },
    //       score: {
    //         halftime: {
    //           home: null,
    //           away: null,
    //         },
    //         fulltime: {
    //           home: null,
    //           away: null,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038311,
    //         referee: null,
    //         timezone: 'UTC',
    //         date: '2024-05-15T00:00:00+00:00',
    //         timestamp: 1715731200,
    //         periods: {
    //           first: null,
    //           second: null,
    //         },
    //         venue: {
    //           id: 1456,
    //           name: 'Estadio Santiago Bernab\u00e9u',
    //           city: 'Madrid',
    //         },
    //         status: {
    //           long: 'Time to be defined',
    //           short: 'TBD',
    //           elapsed: null,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 36',
    //       },
    //       teams: {
    //         home: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: null,
    //         },
    //         away: {
    //           id: 542,
    //           name: 'Alaves',
    //           logo: 'https://media-4.api-sports.io/football/teams/542.png',
    //           winner: null,
    //         },
    //       },
    //       goals: {
    //         home: null,
    //         away: null,
    //       },
    //       score: {
    //         halftime: {
    //           home: null,
    //           away: null,
    //         },
    //         fulltime: {
    //           home: null,
    //           away: null,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038321,
    //         referee: null,
    //         timezone: 'UTC',
    //         date: '2024-05-19T00:00:00+00:00',
    //         timestamp: 1716076800,
    //         periods: {
    //           first: null,
    //           second: null,
    //         },
    //         venue: {
    //           id: 1498,
    //           name: 'Estadio de la Cer\u00e1mica',
    //           city: 'Villarreal',
    //         },
    //         status: {
    //           long: 'Time to be defined',
    //           short: 'TBD',
    //           elapsed: null,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 37',
    //       },
    //       teams: {
    //         home: {
    //           id: 533,
    //           name: 'Villarreal',
    //           logo: 'https://media-4.api-sports.io/football/teams/533.png',
    //           winner: null,
    //         },
    //         away: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: null,
    //         },
    //       },
    //       goals: {
    //         home: null,
    //         away: null,
    //       },
    //       score: {
    //         halftime: {
    //           home: null,
    //           away: null,
    //         },
    //         fulltime: {
    //           home: null,
    //           away: null,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1038330,
    //         referee: null,
    //         timezone: 'UTC',
    //         date: '2024-05-26T00:00:00+00:00',
    //         timestamp: 1716681600,
    //         periods: {
    //           first: null,
    //           second: null,
    //         },
    //         venue: {
    //           id: 1456,
    //           name: 'Estadio Santiago Bernab\u00e9u',
    //           city: 'Madrid',
    //         },
    //         status: {
    //           long: 'Time to be defined',
    //           short: 'TBD',
    //           elapsed: null,
    //         },
    //       },
    //       league: {
    //         id: 140,
    //         name: 'La Liga',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/140.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Regular Season - 38',
    //       },
    //       teams: {
    //         home: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: null,
    //         },
    //         away: {
    //           id: 543,
    //           name: 'Real Betis',
    //           logo: 'https://media-4.api-sports.io/football/teams/543.png',
    //           winner: null,
    //         },
    //       },
    //       goals: {
    //         home: null,
    //         away: null,
    //       },
    //       score: {
    //         halftime: {
    //           home: null,
    //           away: null,
    //         },
    //         fulltime: {
    //           home: null,
    //           away: null,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1097382,
    //         referee: null,
    //         timezone: 'UTC',
    //         date: '2023-07-29T21:00:00+00:00',
    //         timestamp: 1690664400,
    //         periods: {
    //           first: 1690664400,
    //           second: 1690668000,
    //         },
    //         venue: {
    //           id: null,
    //           name: null,
    //           city: null,
    //         },
    //         status: {
    //           long: 'Match Finished',
    //           short: 'FT',
    //           elapsed: 90,
    //         },
    //       },
    //       league: {
    //         id: 667,
    //         name: 'Friendlies Clubs',
    //         country: 'World',
    //         logo: 'https://media-4.api-sports.io/football/leagues/667.png',
    //         flag: null,
    //         season: 2023,
    //         round: 'Club Friendlies 5',
    //       },
    //       teams: {
    //         home: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: false,
    //         },
    //         away: {
    //           id: 529,
    //           name: 'Barcelona',
    //           logo: 'https://media-4.api-sports.io/football/teams/529.png',
    //           winner: true,
    //         },
    //       },
    //       goals: {
    //         home: 0,
    //         away: 3,
    //       },
    //       score: {
    //         halftime: {
    //           home: 0,
    //           away: 1,
    //         },
    //         fulltime: {
    //           home: 0,
    //           away: 3,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1117081,
    //         referee: 'A. Chapman',
    //         timezone: 'UTC',
    //         date: '2023-07-29T21:00:00+00:00',
    //         timestamp: 1690664400,
    //         periods: {
    //           first: 1690664400,
    //           second: 1690668000,
    //         },
    //         venue: {
    //           id: null,
    //           name: 'AT&T Stadium',
    //           city: 'Arlington, Texas',
    //         },
    //         status: {
    //           long: 'Match Finished',
    //           short: 'FT',
    //           elapsed: 90,
    //         },
    //       },
    //       league: {
    //         id: 667,
    //         name: 'Friendlies Clubs',
    //         country: 'World',
    //         logo: 'https://media-4.api-sports.io/football/leagues/667.png',
    //         flag: null,
    //         season: 2023,
    //         round: 'Club Friendlies 1',
    //       },
    //       teams: {
    //         home: {
    //           id: 529,
    //           name: 'Barcelona',
    //           logo: 'https://media-4.api-sports.io/football/teams/529.png',
    //           winner: true,
    //         },
    //         away: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: false,
    //         },
    //       },
    //       goals: {
    //         home: 3,
    //         away: 0,
    //       },
    //       score: {
    //         halftime: {
    //           home: 1,
    //           away: 0,
    //         },
    //         fulltime: {
    //           home: 3,
    //           away: 0,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1126153,
    //         referee: 'E. Esk\u00e5s',
    //         timezone: 'UTC',
    //         date: '2023-09-20T16:45:00+00:00',
    //         timestamp: 1695228300,
    //         periods: {
    //           first: 1695228300,
    //           second: 1695231900,
    //         },
    //         venue: {
    //           id: 1456,
    //           name: 'Estadio Santiago Bernab\u00e9u',
    //           city: 'Madrid',
    //         },
    //         status: {
    //           long: 'Match Finished',
    //           short: 'FT',
    //           elapsed: 90,
    //         },
    //       },
    //       league: {
    //         id: 2,
    //         name: 'UEFA Champions League',
    //         country: 'World',
    //         logo: 'https://media-4.api-sports.io/football/leagues/2.png',
    //         flag: null,
    //         season: 2023,
    //         round: 'Group C - 1',
    //       },
    //       teams: {
    //         home: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: true,
    //         },
    //         away: {
    //           id: 182,
    //           name: 'Union Berlin',
    //           logo: 'https://media-4.api-sports.io/football/teams/182.png',
    //           winner: false,
    //         },
    //       },
    //       goals: {
    //         home: 1,
    //         away: 0,
    //       },
    //       score: {
    //         halftime: {
    //           home: 0,
    //           away: 0,
    //         },
    //         fulltime: {
    //           home: 1,
    //           away: 0,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1126166,
    //         referee: 'C. Turpin',
    //         timezone: 'UTC',
    //         date: '2023-10-03T19:00:00+00:00',
    //         timestamp: 1696359600,
    //         periods: {
    //           first: 1696359600,
    //           second: 1696363200,
    //         },
    //         venue: {
    //           id: 11904,
    //           name: 'Stadio Diego Armando Maradona',
    //           city: 'Napoli',
    //         },
    //         status: {
    //           long: 'Match Finished',
    //           short: 'FT',
    //           elapsed: 90,
    //         },
    //       },
    //       league: {
    //         id: 2,
    //         name: 'UEFA Champions League',
    //         country: 'World',
    //         logo: 'https://media-4.api-sports.io/football/leagues/2.png',
    //         flag: null,
    //         season: 2023,
    //         round: 'Group C - 2',
    //       },
    //       teams: {
    //         home: {
    //           id: 492,
    //           name: 'Napoli',
    //           logo: 'https://media-4.api-sports.io/football/teams/492.png',
    //           winner: false,
    //         },
    //         away: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: true,
    //         },
    //       },
    //       goals: {
    //         home: 2,
    //         away: 3,
    //       },
    //       score: {
    //         halftime: {
    //           home: 1,
    //           away: 2,
    //         },
    //         fulltime: {
    //           home: 2,
    //           away: 3,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1126181,
    //         referee: 'M. Oliver',
    //         timezone: 'UTC',
    //         date: '2023-10-24T19:00:00+00:00',
    //         timestamp: 1698174000,
    //         periods: {
    //           first: 1698174000,
    //           second: 1698177600,
    //         },
    //         venue: {
    //           id: 1291,
    //           name: 'Est\u00e1dio Municipal de Braga',
    //           city: 'Braga',
    //         },
    //         status: {
    //           long: 'Match Finished',
    //           short: 'FT',
    //           elapsed: 90,
    //         },
    //       },
    //       league: {
    //         id: 2,
    //         name: 'UEFA Champions League',
    //         country: 'World',
    //         logo: 'https://media-4.api-sports.io/football/leagues/2.png',
    //         flag: null,
    //         season: 2023,
    //         round: 'Group C - 3',
    //       },
    //       teams: {
    //         home: {
    //           id: 217,
    //           name: 'SC Braga',
    //           logo: 'https://media-4.api-sports.io/football/teams/217.png',
    //           winner: false,
    //         },
    //         away: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: true,
    //         },
    //       },
    //       goals: {
    //         home: 1,
    //         away: 2,
    //       },
    //       score: {
    //         halftime: {
    //           home: 0,
    //           away: 1,
    //         },
    //         fulltime: {
    //           home: 1,
    //           away: 2,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1126206,
    //         referee: 'H. Meler',
    //         timezone: 'UTC',
    //         date: '2023-11-08T20:00:00+00:00',
    //         timestamp: 1699473600,
    //         periods: {
    //           first: 1699473600,
    //           second: 1699477200,
    //         },
    //         venue: {
    //           id: 1456,
    //           name: 'Estadio Santiago Bernab\u00e9u',
    //           city: 'Madrid',
    //         },
    //         status: {
    //           long: 'Match Finished',
    //           short: 'FT',
    //           elapsed: 90,
    //         },
    //       },
    //       league: {
    //         id: 2,
    //         name: 'UEFA Champions League',
    //         country: 'World',
    //         logo: 'https://media-4.api-sports.io/football/leagues/2.png',
    //         flag: null,
    //         season: 2023,
    //         round: 'Group C - 4',
    //       },
    //       teams: {
    //         home: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: true,
    //         },
    //         away: {
    //           id: 217,
    //           name: 'SC Braga',
    //           logo: 'https://media-4.api-sports.io/football/teams/217.png',
    //           winner: false,
    //         },
    //       },
    //       goals: {
    //         home: 3,
    //         away: 0,
    //       },
    //       score: {
    //         halftime: {
    //           home: 1,
    //           away: 0,
    //         },
    //         fulltime: {
    //           home: 3,
    //           away: 0,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1126220,
    //         referee: 'F. Letexier',
    //         timezone: 'UTC',
    //         date: '2023-11-29T20:00:00+00:00',
    //         timestamp: 1701288000,
    //         periods: {
    //           first: 1701288000,
    //           second: 1701291600,
    //         },
    //         venue: {
    //           id: 1456,
    //           name: 'Estadio Santiago Bernab\u00e9u',
    //           city: 'Madrid',
    //         },
    //         status: {
    //           long: 'Match Finished',
    //           short: 'FT',
    //           elapsed: 90,
    //         },
    //       },
    //       league: {
    //         id: 2,
    //         name: 'UEFA Champions League',
    //         country: 'World',
    //         logo: 'https://media-4.api-sports.io/football/leagues/2.png',
    //         flag: null,
    //         season: 2023,
    //         round: 'Group C - 5',
    //       },
    //       teams: {
    //         home: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: true,
    //         },
    //         away: {
    //           id: 492,
    //           name: 'Napoli',
    //           logo: 'https://media-4.api-sports.io/football/teams/492.png',
    //           winner: false,
    //         },
    //       },
    //       goals: {
    //         home: 4,
    //         away: 2,
    //       },
    //       score: {
    //         halftime: {
    //           home: 2,
    //           away: 1,
    //         },
    //         fulltime: {
    //           home: 4,
    //           away: 2,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1126229,
    //         referee: 'R. Obrenovi\u0107',
    //         timezone: 'UTC',
    //         date: '2023-12-12T20:00:00+00:00',
    //         timestamp: 1702411200,
    //         periods: {
    //           first: 1702411200,
    //           second: 1702414800,
    //         },
    //         venue: {
    //           id: 694,
    //           name: 'Olympiastadion Berlin',
    //           city: 'Berlin',
    //         },
    //         status: {
    //           long: 'Match Finished',
    //           short: 'FT',
    //           elapsed: 90,
    //         },
    //       },
    //       league: {
    //         id: 2,
    //         name: 'UEFA Champions League',
    //         country: 'World',
    //         logo: 'https://media-4.api-sports.io/football/leagues/2.png',
    //         flag: null,
    //         season: 2023,
    //         round: 'Group C - 6',
    //       },
    //       teams: {
    //         home: {
    //           id: 182,
    //           name: 'Union Berlin',
    //           logo: 'https://media-4.api-sports.io/football/teams/182.png',
    //           winner: false,
    //         },
    //         away: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: true,
    //         },
    //       },
    //       goals: {
    //         home: 2,
    //         away: 3,
    //       },
    //       score: {
    //         halftime: {
    //           home: 1,
    //           away: 0,
    //         },
    //         fulltime: {
    //           home: 2,
    //           away: 3,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1139465,
    //         referee: null,
    //         timezone: 'UTC',
    //         date: '2024-01-10T19:00:00+00:00',
    //         timestamp: 1704913200,
    //         periods: {
    //           first: null,
    //           second: null,
    //         },
    //         venue: {
    //           id: null,
    //           name: 'Al Awal Park at King Saud University',
    //           city: 'Riyadh',
    //         },
    //         status: {
    //           long: 'Not Started',
    //           short: 'NS',
    //           elapsed: null,
    //         },
    //       },
    //       league: {
    //         id: 556,
    //         name: 'Super Cup',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/556.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Semi-finals',
    //       },
    //       teams: {
    //         home: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: null,
    //         },
    //         away: {
    //           id: 530,
    //           name: 'Atletico Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/530.png',
    //           winner: null,
    //         },
    //       },
    //       goals: {
    //         home: null,
    //         away: null,
    //       },
    //       score: {
    //         halftime: {
    //           home: null,
    //           away: null,
    //         },
    //         fulltime: {
    //           home: null,
    //           away: null,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1147417,
    //         referee: null,
    //         timezone: 'UTC',
    //         date: '2024-01-06T20:30:00+00:00',
    //         timestamp: 1704573000,
    //         periods: {
    //           first: null,
    //           second: null,
    //         },
    //         venue: {
    //           id: 6811,
    //           name: 'Estadio El Montecillo',
    //           city: 'Aranda de Duero',
    //         },
    //         status: {
    //           long: 'Not Started',
    //           short: 'NS',
    //           elapsed: null,
    //         },
    //       },
    //       league: {
    //         id: 143,
    //         name: 'Copa del Rey',
    //         country: 'Spain',
    //         logo: 'https://media-4.api-sports.io/football/leagues/143.png',
    //         flag: 'https://media-4.api-sports.io/flags/es.svg',
    //         season: 2023,
    //         round: 'Round of 32',
    //       },
    //       teams: {
    //         home: {
    //           id: 9722,
    //           name: 'Arandina',
    //           logo: 'https://media-4.api-sports.io/football/teams/9722.png',
    //           winner: null,
    //         },
    //         away: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: null,
    //         },
    //       },
    //       goals: {
    //         home: null,
    //         away: null,
    //       },
    //       score: {
    //         halftime: {
    //           home: null,
    //           away: null,
    //         },
    //         fulltime: {
    //           home: null,
    //           away: null,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1149512,
    //         referee: null,
    //         timezone: 'UTC',
    //         date: '2024-02-13T20:00:00+00:00',
    //         timestamp: 1707854400,
    //         periods: {
    //           first: null,
    //           second: null,
    //         },
    //         venue: {
    //           id: 738,
    //           name: 'Red Bull Arena',
    //           city: 'Leipzig',
    //         },
    //         status: {
    //           long: 'Not Started',
    //           short: 'NS',
    //           elapsed: null,
    //         },
    //       },
    //       league: {
    //         id: 2,
    //         name: 'UEFA Champions League',
    //         country: 'World',
    //         logo: 'https://media-4.api-sports.io/football/leagues/2.png',
    //         flag: null,
    //         season: 2023,
    //         round: 'Round of 16',
    //       },
    //       teams: {
    //         home: {
    //           id: 173,
    //           name: 'RB Leipzig',
    //           logo: 'https://media-4.api-sports.io/football/teams/173.png',
    //           winner: null,
    //         },
    //         away: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: null,
    //         },
    //       },
    //       goals: {
    //         home: null,
    //         away: null,
    //       },
    //       score: {
    //         halftime: {
    //           home: null,
    //           away: null,
    //         },
    //         fulltime: {
    //           home: null,
    //           away: null,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //     {
    //       fixture: {
    //         id: 1149513,
    //         referee: null,
    //         timezone: 'UTC',
    //         date: '2024-03-06T20:00:00+00:00',
    //         timestamp: 1709755200,
    //         periods: {
    //           first: null,
    //           second: null,
    //         },
    //         venue: {
    //           id: 1456,
    //           name: 'Estadio Santiago Bernab\u00e9u',
    //           city: 'Madrid',
    //         },
    //         status: {
    //           long: 'Not Started',
    //           short: 'NS',
    //           elapsed: null,
    //         },
    //       },
    //       league: {
    //         id: 2,
    //         name: 'UEFA Champions League',
    //         country: 'World',
    //         logo: 'https://media-4.api-sports.io/football/leagues/2.png',
    //         flag: null,
    //         season: 2023,
    //         round: 'Round of 16',
    //       },
    //       teams: {
    //         home: {
    //           id: 541,
    //           name: 'Real Madrid',
    //           logo: 'https://media-4.api-sports.io/football/teams/541.png',
    //           winner: null,
    //         },
    //         away: {
    //           id: 173,
    //           name: 'RB Leipzig',
    //           logo: 'https://media-4.api-sports.io/football/teams/173.png',
    //           winner: null,
    //         },
    //       },
    //       goals: {
    //         home: null,
    //         away: null,
    //       },
    //       score: {
    //         halftime: {
    //           home: null,
    //           away: null,
    //         },
    //         fulltime: {
    //           home: null,
    //           away: null,
    //         },
    //         extratime: {
    //           home: null,
    //           away: null,
    //         },
    //         penalty: {
    //           home: null,
    //           away: null,
    //         },
    //       },
    //     },
    //   ],
    // };

    // this.fixture_cache.set(this.team_id, response);
    // return response;

    // uncomment below code for actual api call

    if (!this.fixture_cache.has(this.team_id)) {
      return this.http
        .get<ApiFixtureResponse>('https://v3.football.api-sports.io/fixtures', {
          headers,
          params,
        })
        .subscribe(
          (response) => {
            this.fixture_cache.set(this.team_id, response);
          },
          (error) => {
            console.log('error');
          }
        );
      return new Subscription();
    } else {
      return new Subscription();
    }
  }

  getLeagueByCountryFromCache(): Map<string, ApiStandingResponse> {
    return this.standing_cache;
  }

  getTopLeagueFromCache(): Map<string, ApiFixtureResponse> {
    return this.fixture_cache;
  }
}
