import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { favCity } from 'src/app/interface/favoritcity';


@Component({
  selector: 'app-favorit-city-card',
  templateUrl: './favorit-city-card.component.html',
  styleUrls: ['./favorit-city-card.component.scss']
})
export class FavoritCityCardComponent {
  @Input() favCity: favCity ={
    cityid: '',
    name: '',
    weather: ''
  };
  dataToSend = {};

  constructor(private router: Router){}

  sendToHome(){
    this.dataToSend = { key: this.favCity.name };
    this.router.navigate(['/home'], { queryParams: this.dataToSend });
  }
}
