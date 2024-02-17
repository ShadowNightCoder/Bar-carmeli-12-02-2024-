import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CitiesData } from '../../interface/citiesinfo';
import { CurrentWeather } from '../../interface/currentweather';
import { WeatherData } from '../../interface/fivedaysweather';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  apiKey = "RfB6ZpgUeIZANIypUY8IVG2Y0yQ5fzMr"
  baseUrl = "https://dataservice.accuweather.com";

  constructor(private http: HttpClient) { }

  // Returns basic information about locations matching an autocomplete of the search text
  getCityInfo(city: string) {
    return this.http.get<CitiesData[]>(`${this.baseUrl}/locations/v1/cities/autocomplete?apikey=${this.apiKey}&q=${city}`).pipe(
      catchError(this.handleError)
    );
  }

  // Returns current conditions data for a specific location.
  getCityWeather(locationKey: string) {
    return this.http.get<CurrentWeather[]>(`${this.baseUrl}/currentconditions/v1/${locationKey}?apikey=${this.apiKey}`).pipe(
      catchError(this.handleError)
    );
  }

  // Returns an array of daily forecasts for the next 5 days for a specific location
  getCityDailyForecasts(locationKey: string) {
    return this.http.get<WeatherData[]>(`${this.baseUrl}/forecasts/v1/daily/5day/${locationKey}?apikey=${this.apiKey}`).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message); 
    } 
    else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`); 
    }
    return throwError('Something went wrong, Please try again later');
  }
}