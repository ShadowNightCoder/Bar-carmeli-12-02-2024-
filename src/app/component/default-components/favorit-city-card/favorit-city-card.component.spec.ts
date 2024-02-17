import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritCityCardComponent } from './favorit-city-card.component';

describe('FavoritCityCardComponent', () => {
  let component: FavoritCityCardComponent;
  let fixture: ComponentFixture<FavoritCityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritCityCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritCityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
