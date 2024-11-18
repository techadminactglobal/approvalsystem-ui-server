import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupancyComponentComponent } from './occupancy-component.component';

describe('OccupancyComponentComponent', () => {
  let component: OccupancyComponentComponent;
  let fixture: ComponentFixture<OccupancyComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OccupancyComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OccupancyComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
