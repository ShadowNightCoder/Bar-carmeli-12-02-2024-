import { Component, Input, OnInit } from '@angular/core';
import { weatherForFiveDays } from 'src/app/interface/weatherarray';
import { celsiusToFahrenheit, fahrenheitToCelsius } from 'src/app/generic-func/genericFunc';
import { CelsiusfahrenheitServiceService } from 'src/app/services/toggle-button-service/celsiusfahrenheit-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() weatherForDay!: weatherForFiveDays;
  defaultTemperature = 'F';
  subscription: Subscription | undefined;
  booleanValue: boolean = true;
  daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  src = './../../../../assets/img/7Days/sunday.png'
  showOrNot: any = {};


  updateShowOrNot(): void {
    this.showOrNot = {
      date: this.weatherForDay.Date,
      day: this.weatherForDay.Day.PrecipitationIntensity && this.weatherForDay.Day.PrecipitationType,
      night: this.weatherForDay.Night.PrecipitationIntensity && this.weatherForDay.Night.PrecipitationIntensity,
      temp: this.weatherForDay.Temperature.Minimum.Value && this.weatherForDay.Temperature.Maximum.Value,
    };
  }

  constructor(private celsiusFahrenheitService: CelsiusfahrenheitServiceService) { }

  
  ngOnInit(): void {
    this.updateShowOrNot();
    const date = new Date(this.weatherForDay.Date);
    const dayIndex = date.getDay();
    this.src = "./../../../../assets/img/7Days/" + this.daysOfWeek[dayIndex] + ".png"

    this.subscription = this.celsiusFahrenheitService.booleanValueSubject.subscribe(value => {
      this.booleanValue = value;
      this.convertTemperature();
    });
  }


  convertTemperature() {
    const TMinimum = parseFloat(this.weatherForDay.Temperature.Minimum.Value.toString());
    const TMaximum = parseFloat(this.weatherForDay.Temperature.Maximum.Value.toString());
    try {
      this.defaultTemperature = this.booleanValue ? 'F' : 'C';
      this.weatherForDay.Temperature.Minimum.Value = this.booleanValue ? celsiusToFahrenheit(TMinimum) : fahrenheitToCelsius(TMinimum);
      this.weatherForDay.Temperature.Maximum.Value = this.booleanValue ? celsiusToFahrenheit(TMaximum) : fahrenheitToCelsius(TMaximum);
    } catch (error) {
      console.error('Error converting temperature:', error);
    }
  }
}


