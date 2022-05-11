import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarLoteriaComponent } from './generar-loteria.component';

describe('GenerarLoteriaComponent', () => {
  let component: GenerarLoteriaComponent;
  let fixture: ComponentFixture<GenerarLoteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarLoteriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarLoteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
