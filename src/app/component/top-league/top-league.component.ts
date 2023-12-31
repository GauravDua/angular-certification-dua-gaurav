import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiFixtureResponse } from '../../models/fixture.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-top-league',
  templateUrl: './top-league.component.html',
  styleUrls: ['./top-league.component.css'],
})
export class TopLeagueComponent implements OnInit {
  team_id: string = '';
  games_map: Map<string, ApiFixtureResponse> = new Map();
  countryName: string = '';

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('TeamGamesComponent');
    this.route.params.subscribe((params: Params) => {
      this.team_id = params['teamID'];
      this.countryName = params['name'];
      this.dataService.getTopLeague(this.team_id);

      this.games_map = this.dataService.getTopLeagueFromCache();
    });
  }
}
