import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/services/local-storage-service/localstorage.service';
import { favCity } from 'src/app/interface/favoritcity';
import { RequestServiceService } from 'src/app/services/recived-data-service/request-service.service';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
    cityList: any[] = [];
    wantendCity: any[] = [];
    favoritCityList: favCity[] = [];
    CourentCityName = '';

    constructor(private request: RequestServiceService, private storage: LocalstorageService) { }

    // Fetches favorite city names from local storage and retrieves weather information for each city.
    async ngOnInit(): Promise<void> {
        const localStorageValue = this.storage.getLocalStorage();
        if (localStorageValue) {
            this.cityList = localStorageValue.split(',');
        }
        for (const city of this.cityList) {
            await this.reciveCity(city);
        }
    }


     /**
     * Fetches city information from the API
     * @param cityName - The name of the city to fetch
     * @returns A promise that resolves when the city information is fetched successfully
     */
    reciveCity(cityName: string): Promise<void> {
        this.CourentCityName = cityName;
        return new Promise<void>((resolve, reject) => {
            this.request.getCity(cityName).subscribe((citiesInfoArray: any[]) => {
                this.cityList = citiesInfoArray;
                this.wantendCity = this.cityList.filter(city => city.name === cityName);
                this.reciveCityCurrentWeather(this.wantendCity[0].key, cityName);
                resolve();
            }, error => {
                console.error('Error fetching city:', error);
                reject(error);
            });
        });
    }


    /**
     * Fetches current weather information for a city
     * @param Locationkey - The location key of the city
     * @param cityName - The name of the city (optional)
     * @returns A promise that resolves when the weather information is fetched successfully
     */
    async reciveCityCurrentWeather(Locationkey: string, cityName?: string): Promise<void> {
        const favCityName = cityName ? cityName : this.CourentCityName;
        return new Promise<void>((resolve, reject) => {
            this.request.getCityCurrentWeather(Locationkey).subscribe((currentCity: any[]) => {
                currentCity.map(city => {
                    this.favoritCityList.push({
                        cityid: Locationkey,
                        name: favCityName,
                        weather: city.cityWeatherText
                    })
                });
                resolve();
            }, error => {
                console.error('Error fetching current weather:', error);
                reject(error);
            });
        });
    }
}
