import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupancyComponentViewComponent } from './occupancy-component-view.component';

describe('OccupancyComponentViewComponent', () => {
  let component: OccupancyComponentViewComponent;
  let fixture: ComponentFixture<OccupancyComponentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OccupancyComponentViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OccupancyComponentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
