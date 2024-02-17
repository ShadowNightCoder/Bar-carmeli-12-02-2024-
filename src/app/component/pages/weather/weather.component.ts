import { Component, OnInit } from '@angular/core';
import { weatherForFiveDays } from 'src/app/interface/weatherarray';
import { ActivatedRoute } from '@angular/router';
import { RequestServiceService } from 'src/app/services/recived-data-service/request-service.service';
import { CurrentCity } from 'src/app/interface/courentcity';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  cityList: any[] = [];
  CourentCityKey = '';
  CourentCityName = '';
  CourentCity: CurrentCity = {
    weatherText: '',
    timeRightNow: '',
    temperatureImperial: { value: null, unit: '', unitType: 0 },
    weatherIcon: ''
  }
  fiveDaysForecastArray: weatherForFiveDays[] = [];
  wantendCity: any[] = [];

  // Default city to search for (initially set to 'Tel Aviv')
  defaultSearchedCity = 'Tel Aviv';




  constructor(private route: ActivatedRoute, private request: RequestServiceService) {
    this.route.queryParams.subscribe(params => {
      if (params['key']) {
        this.defaultSearchedCity = params['key'];
      }
    });
  }


  ngOnInit(): void {
    this.reciveCity(this.defaultSearchedCity);
  }

  /**
    * Fetch city information from the API based on cityName parameter
    * @param cityName - The name of the city to fetch
    */
  reciveCity(cityName: string) {
    try {
      this.request.getCity(cityName).subscribe((citiesInfoArray: any[]) => {
        this.cityList = citiesInfoArray;
        this.wantendCity = this.cityList.filter(city => city.name === cityName);
        this.CourentCityKey = this.wantendCity[0].key;
        this.CourentCityName = cityName;
        this.reciveCityCurrentWeather(this.CourentCityKey);
      })
    }
    catch (error) {
      console.error('Error receiving city:', error);
    }
  }


  /**
    * Fetch current weather information for the given Locationkey
    * @param Locationkey - The location key of the city
    * @param cityName - The name of the city to fetch (optional)
    */
  reciveCityCurrentWeather(Locationkey: string, cityName?: string) {
    try {
      if (cityName) {
        this.CourentCityName = cityName;
      }

      this.request.getCityCurrentWeather(Locationkey).subscribe((currentCity: any[]) => {
        currentCity.map(city => {
          this.CourentCity.timeRightNow = city.cityWeatherDate;
          this.CourentCity.weatherText = city.cityWeatherText;
          this.CourentCity.temperatureImperial.unit = city.cityWeatherTemperatureImperial.Unit;
          this.CourentCity.temperatureImperial.value = city.cityWeatherTemperatureImperial.Value;
          this.CourentCity.temperatureImperial.unitType = city.cityWeatherTemperatureImperial.UnitType;
          this.CourentCity.weatherIcon = city.cityWeatherIcon;
        })
        this.getFiveDaysForecast(Locationkey)
      })
    }
    catch (error) {
      console.error('Error receiving current weather:', error);
    }
  }


   /**
    * Fetch five days forecast information for the given Locationkey
    * @param Locationkey - The location number of the city to fetch
    */
  getFiveDaysForecast(Locationkey: string) {
    try {
      this.request.getFiveDaysForecast(Locationkey).subscribe((currentCity: any) => {
        this.fiveDaysForecastArray = currentCity;
      });
    }
    catch (error) {
      console.error('Error receiving five days forecast:', error);
    }
  }
}


