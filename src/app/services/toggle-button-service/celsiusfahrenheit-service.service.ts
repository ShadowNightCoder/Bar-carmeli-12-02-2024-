import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CelsiusfahrenheitServiceService {
  booleanValue: boolean = true;
  booleanValueSubject: Subject<boolean> = new Subject<boolean>();
  refreshTheButton: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  toggleValue(value:any) {
    if(value === 'F'){
      this.booleanValue = true;
    }
    else if(value === 'C'){
      this.booleanValue = false;
    }
    this.booleanValueSubject.next(this.booleanValue); 
  }

  
  refreshButton(value: boolean){
    this.refreshTheButton.next(value);
  }
}
