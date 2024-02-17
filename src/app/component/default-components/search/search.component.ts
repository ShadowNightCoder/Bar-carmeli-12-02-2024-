import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { isEnglishLettersOnly } from 'src/app/generic-func/genericFunc';
import { RequestServiceService } from 'src/app/services/recived-data-service/request-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  inputLive = '';
  inputEnglishOnley = true;
  cityList: any[] = [];
  selectedCity = {
    key: '',
    name: '',
    country: ''
  };
  optionSelected: boolean = false;
  timeStatus = '';
  src = '';
  badInput = false;
  errorShow = '';
  @Input() cityTime = '';
  @Output() citySelected = new EventEmitter<{ cityName: string, cityKey: string }>();


  constructor(private request: RequestServiceService, private elementRef: ElementRef, private renderer: Renderer2) { }


  ngOnInit(): void {
  
  }


  ngAfterViewInit() {
    // Get the element
    const element = this.elementRef.nativeElement.querySelector('.mat-mdc-form-field-subscript-wrapper');

    // Remove the class
    this.renderer.removeClass(element, 'mat-mdc-form-field-bottom-align');
  }


  autoComplete() {
    this.inputEnglishOnley = isEnglishLettersOnly(this.inputLive)
    if (this.inputEnglishOnley) {
      this.badInput = false;
      this.request.getCity(this.inputLive).subscribe((citiesInfoArray: any[]) => {
        this.cityList = citiesInfoArray;
      })
    }
    else if (!this.inputEnglishOnley) {
      this.badInput = true;
      this.errorShow = "You entered invalid input. Please only enter English letters!"
    }
    if (this.inputLive === '') {
      this.badInput = false;
      this.cityList = []
    }
    return this.inputEnglishOnley
  }


  onOptionSelected(city: any) {
    this.selectedCity = city;
    this.optionSelected = true;
  }


  onSubmit() {
    this.inputEnglishOnley = this.autoComplete()
    if (this.inputEnglishOnley) {
      this.citySelected.emit({cityKey: this.selectedCity.key, cityName: this.selectedCity.name});
    }
    this.inputLive = ''
  }
}
