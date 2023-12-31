import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { CountryComponent } from './component/country/country.component';
import { TopLeagueComponent } from './component/top-league/top-league.component';

const routes: Routes = [
  { path: 'leagues/:name', component: CountryComponent },
  { path: 'leagues/:name/:teamID', component: TopLeagueComponent },
  { path: '**', redirectTo: '/leagues/england', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CountryComponent,
    TopLeagueComponent,
  ],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
