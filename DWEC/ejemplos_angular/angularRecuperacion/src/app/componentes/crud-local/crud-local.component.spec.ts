import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudLocalComponent } from './crud-local.component';

describe('CrudLocalComponent', () => {
  let component: CrudLocalComponent;
  let fixture: ComponentFixture<CrudLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudLocalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
