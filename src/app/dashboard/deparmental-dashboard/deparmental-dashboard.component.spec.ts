import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeparmentalDashboardComponent } from './deparmental-dashboard.component';

describe('DeparmentalDashboardComponent', () => {
  let component: DeparmentalDashboardComponent;
  let fixture: ComponentFixture<DeparmentalDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeparmentalDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeparmentalDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
