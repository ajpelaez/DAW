import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplicarComponent } from './multiplicar.component';

describe('MultiplicarComponent', () => {
  let component: MultiplicarComponent;
  let fixture: ComponentFixture<MultiplicarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiplicarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplicarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
