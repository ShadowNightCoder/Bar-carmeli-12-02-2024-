import { Component, OnInit } from '@angular/core';
import { CelsiusfahrenheitServiceService } from 'src/app/services/toggle-button-service/celsiusfahrenheit-service.service';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent implements OnInit {
  temperatureUnit: boolean = true; 
  changedAnswear: boolean = false;
  selectedUnit: string = 'F'; 

  
  constructor(private toggle: CelsiusfahrenheitServiceService) { }

  ngOnInit() {
    this.toggle.refreshTheButton.subscribe(value => {
      if(value){
        this.selectedUnit = 'F'
      }
    });
  }


  toggleUnits($event: any) {
    this.toggle.toggleValue($event.value)
  }
}
