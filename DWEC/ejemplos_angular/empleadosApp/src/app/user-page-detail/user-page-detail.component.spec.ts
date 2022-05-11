import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageDetailComponent } from './user-page-detail.component';

describe('UserPageDetailComponent', () => {
  let component: UserPageDetailComponent;
  let fixture: ComponentFixture<UserPageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPageDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
