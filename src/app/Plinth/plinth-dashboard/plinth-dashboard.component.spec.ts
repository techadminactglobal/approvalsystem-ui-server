import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlinthDashboardComponent } from './plinth-dashboard.component';

describe('PlinthDashboardComponent', () => {
  let component: PlinthDashboardComponent;
  let fixture: ComponentFixture<PlinthDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlinthDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlinthDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
