import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiStandingResponse } from '../../models/standing.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
})
export class CountryComponent implements OnInit {
  countryName: string = '';
  teams: string[] = [];
  leagues_map: Map<string, ApiStandingResponse> = new Map();

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('LeaguesComponent');
    this.route.params.subscribe((params: Params) => {
      this.countryName = params['name'];

      this.dataService.getLeagueByCountry(this.countryName);

      this.leagues_map = this.dataService.getLeagueByCountryFromCache();
      console.log('leageus_map', this.leagues_map);
    });

    this.getTeamName();
  }

  ngOnChanges() {
    console.log('onchanges');
    this.getTeamName();
  }

  getTeamName() {
    console.log('getTeamName');
    if (this.leagues_map.has(this.countryName)) {
      const league = this.leagues_map.get(this.countryName)!;
      this.teams.push(this.countryName);
    }
  }

  ngOnDestroy(): void {}
}
