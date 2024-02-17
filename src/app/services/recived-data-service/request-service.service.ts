import { Injectable } from '@angular/core';
import { ApiServiceService } from '../api-service/api-service.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { CurrentWeather } from 'src/app/interface/currentweather';
import { ErrorHandlerService } from '../error-service/error-handler.service';
import { CitiesData } from 'src/app/interface/citiesinfo';


@Injectable({
  providedIn: 'root'
})
export class RequestServiceService {
  currentWeather: CurrentWeather[] = [];

  constructor(private weatherApi: ApiServiceService, private ErrorDialog: ErrorHandlerService) { }

  /**
   * Fetches city information from the weather API
   * @param cityName - The name of the city to fetch
   * @returns An observable that emits an array of city information
   */
  getCity(cityName: string): Observable<any[]> {
    return this.weatherApi.getCityInfo(cityName).pipe(
      map((res: CitiesData[]) => {
        return res.map(city => ({
          key: city.Key,
          name: city.LocalizedName,
          country: city.Country.LocalizedName
        }));
      }),
      catchError((error) => {
        this.ErrorDialog.showErrorDialog('An error occurred while fetching city list.');
        return throwError(error);
      })
    );
  }


  /**
   * Fetches current weather information for a city from the weather API
   * @param Locationkey - The location key of the city
   * @returns An observable that emits an array of current weather information
   */
  getCityCurrentWeather(Locationkey: string): Observable<any[]> {
    return this.weatherApi.getCityWeather(Locationkey).pipe(
      map((res: CurrentWeather[]) => {
        return res.map(city => ({
          cityWeatherText: city.WeatherText,
          cityWeatherDate: city.LocalObservationDateTime,
          cityWeatherTemperatureImperial: city.Temperature.Imperial,
          cityWeatherIcon: city.WeatherIcon,
        }));
      }),
      catchError((error) => {
        this.ErrorDialog.showErrorDialog('An error occurred while fetching city current weather information.')
        return throwError(error);
      })
    );
  }


/**
   * Fetches five days forecast information for a city from the weather API
   * @param Locationkey - The location key of the city
   * @returns An observable that emits an array of five days forecast information
   */
  getFiveDaysForecast(Locationkey: string): Observable<any[]> {
    return this.weatherApi.getCityDailyForecasts(Locationkey).pipe(
      map((res: any) => {
        return res.DailyForecasts.map((city: any) => ({
          Date: city.Date,
          Temperature: {
            Minimum: {
              Value: city.Temperature.Minimum.Value,
              Unit: city.Temperature.Minimum.Unit,
            },
            Maximum: {
              Value: city.Temperature.Maximum.Value,
              Unit: city.Temperature.Maximum.Unit,
            }
          },
          Day: {
            PrecipitationIntensity: city.Day.PrecipitationIntensity,
            PrecipitationType: city.Day.PrecipitationType
          },
          Night: {
            PrecipitationIntensity: city.Night.PrecipitationIntensity,
            PrecipitationType: city.Night.PrecipitationType
          }
        }))

      }),
      catchError((error) => {
        this.ErrorDialog.showErrorDialog('An error occurred while fetching city current weather information.')
        return throwError(error);
      })
    );
  }

}
