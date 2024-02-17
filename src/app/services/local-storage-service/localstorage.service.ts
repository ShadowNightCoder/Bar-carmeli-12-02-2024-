import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  private localStorage: Storage;


  constructor() {
    this.localStorage = window.localStorage;
  }

  // Set in localStorage favorit Cities list
  setLocalStorage(name: string) {
    const existingData = localStorage.getItem('favoriteCities'); // Retrieve existing data
    if (existingData) {
      const cities = existingData.split(',');
      if (!cities.includes(name)) { // If the city doesn't exist, add it
        localStorage.setItem('favoriteCities', existingData + ',' + name);
      }
    }
    else {
      this.localStorage.setItem('favoriteCities', name);
    }
  }


  // get all favorit cities list
  getLocalStorage() {
    return this.localStorage.getItem('favoriteCities')
  }


  // Check if the city is already in local storage.
  getIsCityInLocalStorage(cityName: string){
    const existingData = localStorage.getItem('favoriteCities'); 
    return existingData?.split(',').includes(cityName);
  }


  // Retrieve existing data and filter out specific data
  removeLocalStorage(cityToRemove: string) {
    const existingData = localStorage.getItem('favoriteCities'); 
    if (existingData) {
      const updatedData = existingData.split(',').filter(item => item.trim() !== cityToRemove);
      const cleanedData = updatedData.join(',');
      localStorage.setItem('favoriteCities', cleanedData); 
    }
  }
}
