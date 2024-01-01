import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Season } from '../assets/enums/season.enum';
import { TopLeague } from '../assets/enums/topLeague.enum';
import { Country } from '../assets/enums/country.enum';
import { environment } from '../environments/environment';
import { CountryResponse } from '../models/country.model';
import { TopLeagueResponse } from '../models/top-league.model';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  private countryResponseCache: Map<string, CountryResponse> = new Map();
  private topLeagueCache: Map<string, TopLeagueResponse> = new Map();

  countryName: string = '';
  currentTeamID: string = '';
  id: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  getLeagueByCountry(country_name: string): Subscription {
    console.log('country_name ', country_name);
    this.countryName = country_name;

    //setting the required request header
    const headers = new HttpHeaders({
      'x-rapidapi-host': environment.header.xRapidapiHost,
      'x-rapidapi-key': environment.header.xRapidapiKey,
    });

    if (this.countryName === Country.England) {
      this.id = TopLeague.englangPremierLeague;
    } else if (this.countryName === Country.Spain) {
      this.id = TopLeague.spainLaLiga;
    } else if (this.countryName === Country.Germany) {
      this.id = TopLeague.germanyBundesliga;
    } else if (this.countryName === Country.France) {
      this.id = TopLeague.franceLigue1;
    } else if (this.countryName === Country.Italy) {
      this.id = TopLeague.italySerieA;
    }

    let params = new HttpParams()
      .append('league', this.id)
      .append('season', Season.currentSeason);

    if (!this.countryResponseCache.has(this.countryName)) {
      return this.http
        .get<CountryResponse>('https://v3.football.api-sports.io/standings', {
          headers,
          params,
        })
        .subscribe(
          (response) => {
            this.countryResponseCache.set(this.countryName, response);
          },
          (error) => {
            console.log('error ***', error);
          }
        );
    } else {
      return new Subscription();
    }

  }

  getTopLeague(currentTeamID: string): Subscription {
    this.currentTeamID = currentTeamID;
    const headers = new HttpHeaders({
      'x-rapidapi-host': environment.header.xRapidapiHost,
      'x-rapidapi-key': environment.header.xRapidapiKey,
    });

    let params = new HttpParams()
      .append('team', currentTeamID)
      .append('season', Season.currentSeason);

   

    if (!this.topLeagueCache.has(this.currentTeamID)) {
      return this.http
        .get<TopLeagueResponse>('https://v3.football.api-sports.io/fixtures', {
          headers,
          params,
        })
        .subscribe(
          (response) => {
            this.topLeagueCache.set(this.currentTeamID, response);
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

  getLeagueByCountryFromCache(): Map<string, CountryResponse> {
    return this.countryResponseCache;
  }

  getTopLeagueFromCache(): Map<string, TopLeagueResponse> {
    return this.topLeagueCache;
  }
}
