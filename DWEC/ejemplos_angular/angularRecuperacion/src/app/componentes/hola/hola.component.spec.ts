import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolaComponent } from './hola.component';

describe('HolaComponent', () => {
  let component: HolaComponent;
  let fixture: ComponentFixture<HolaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
