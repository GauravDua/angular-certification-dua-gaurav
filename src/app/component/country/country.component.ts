import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CountryResponse } from '../../models/country.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
})
export class CountryComponent implements OnInit {
  countryName: string = '';
  teams: string[] = [];
  countryMap: Map<string, CountryResponse> = new Map();

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('CountryComponent');
    this.route.params.subscribe((params: Params) => {
      this.countryName = params['name'];

      this.dataService.getLeagueByCountry(this.countryName);

      this.countryMap = this.dataService.getLeagueByCountryFromCache();
      console.log('countryMap', this.countryMap);
    });

    this.getTeamName();
  }

  ngOnChanges() {
    console.log('onchanges');
    this.getTeamName();
  }

  getTeamName() {
    console.log('getTeamName');
    if (this.countryMap.has(this.countryName)) {
      const league = this.countryMap.get(this.countryName)!;
      this.teams.push(this.countryName);
    }
  }

  ngOnDestroy(): void {}
}
