import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioClaseComponent } from './formulario-clase.component';

describe('FormularioClaseComponent', () => {
  let component: FormularioClaseComponent;
  let fixture: ComponentFixture<FormularioClaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioClaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
