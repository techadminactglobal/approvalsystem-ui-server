import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupancyDashboradComponent } from './occupancy-dashborad.component';

describe('OccupancyDashboradComponent', () => {
  let component: OccupancyDashboradComponent;
  let fixture: ComponentFixture<OccupancyDashboradComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OccupancyDashboradComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OccupancyDashboradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
