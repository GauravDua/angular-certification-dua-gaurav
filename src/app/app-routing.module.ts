import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryComponent } from './component/country/country.component';
import { TopLeagueComponent } from './component/top-league/top-league.component';

const routes: Routes = [
  { path: 'leagues/:name', component: CountryComponent },
  { path: 'leagues/:name/:teamID', component: TopLeagueComponent },
  { path: '**', redirectTo: '/leagues/england', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
