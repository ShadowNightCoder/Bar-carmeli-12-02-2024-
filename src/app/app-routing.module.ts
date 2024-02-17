import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './component/pages/weather/weather.component';
import { FavoritesComponent } from './component/pages/favorites/favorites.component';

const routes: Routes = [
  { path: '', component: WeatherComponent },
  { path: 'Home', component: WeatherComponent },
  { path: 'Favorit-city', component: FavoritesComponent },
  { path: '**', redirectTo: 'Home' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
