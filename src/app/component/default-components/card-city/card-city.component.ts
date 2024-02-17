import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { celsiusToFahrenheit, fahrenheitToCelsius } from 'src/app/generic-func/genericFunc';
import { CurrentCity } from 'src/app/interface/courentcity';
import { favCity } from 'src/app/interface/favoritcity';
import { LocalstorageService } from 'src/app/services/local-storage-service/localstorage.service';
import { CelsiusfahrenheitServiceService } from 'src/app/services/toggle-button-service/celsiusfahrenheit-service.service';

@Component({
  selector: 'app-card-city',
  templateUrl: './card-city.component.html',
  styleUrls: ['./card-city.component.scss']
})
export class CardCityComponent implements OnInit, OnChanges {
  @Input() CourentCityKey = '';
  @Input() CourentCityName = '';
  @Input() CityInfo: CurrentCity = {
    weatherText: '',
    timeRightNow: '',
    weatherIcon: '',
    temperatureImperial: {
      value: null,
      unit: '',
      unitType: 0
    }
  };
  favoritCityList: favCity[] = [];
  subscription: Subscription | undefined;
  booleanValue: boolean = true;
  isActive: boolean = false;

  constructor(private storage: LocalstorageService, private celsiusFahrenheitService: CelsiusfahrenheitServiceService) { }

  ngOnInit(): void {
    this.subscription = this.celsiusFahrenheitService.booleanValueSubject.subscribe(value => {
      this.booleanValue = value;
      this.convertTemperature();
    });

    this.heartStatus()
  }

  convertTemperature() {
    if (this.CityInfo.temperatureImperial.value !== null) {
      const value = parseFloat(this.CityInfo.temperatureImperial.value.toString());
      try {
        this.CityInfo.temperatureImperial.unit = this.booleanValue ? 'F' : 'C';
        this.CityInfo.temperatureImperial.value = this.booleanValue ? celsiusToFahrenheit(value) : fahrenheitToCelsius(value);
      } catch (error) {
        console.error('Error converting temperature:', error);
      }
    }
  }

  
  ngOnChanges(changes: SimpleChanges): void {
      if(changes['CourentCityName'].previousValue != changes['CourentCityName'].currentValue && changes['CourentCityName'].currentValue != undefined){
        this.heartStatus()
        if(changes['CourentCityName'].previousValue != ''){
          this.celsiusFahrenheitService.refreshButton(true);
        }
      }

      
  }

  heartStatus(){
    if(this.storage.getIsCityInLocalStorage(this.CourentCityName)){
      this.isActive = true;
    }else{
      this.isActive = false;
    }
  }

  addAndRemoveCity() {
    if(this.isActive === true){
      this.storage.removeLocalStorage(this.CourentCityName)
    }
    else if(this.isActive === false){
      this.storage.setLocalStorage(this.CourentCityName)
    } 
    this.isActive = !this.isActive;
  }


}
