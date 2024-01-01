import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TopLeagueResponse } from '../../models/top-league.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-top-league',
  templateUrl: './top-league.component.html',
  styleUrls: ['./top-league.component.css'],
})
export class TopLeagueComponent implements OnInit {
  teamID: string = '';
  legaueMap: Map<string, TopLeagueResponse> = new Map();
  countryName: string = '';

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('TopLeagueComponent');
    this.route.params.subscribe((params: Params) => {
      this.teamID = params['teamID'];
      this.countryName = params['name'];
      this.dataService.getTopLeague(this.teamID);

      this.legaueMap = this.dataService.getTopLeagueFromCache();
    });
  }
}
