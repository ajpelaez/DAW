import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroUsuarios2Component } from './registro-usuarios2.component';

describe('RegistroUsuarios2Component', () => {
  let component: RegistroUsuarios2Component;
  let fixture: ComponentFixture<RegistroUsuarios2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroUsuarios2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroUsuarios2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
