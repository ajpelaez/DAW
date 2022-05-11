import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroUsuarios3Component } from './registro-usuarios3.component';

describe('RegistroUsuarios3Component', () => {
  let component: RegistroUsuarios3Component;
  let fixture: ComponentFixture<RegistroUsuarios3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroUsuarios3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroUsuarios3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
