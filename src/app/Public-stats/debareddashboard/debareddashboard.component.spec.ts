import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebareddashboardComponent } from './debareddashboard.component';

describe('DebareddashboardComponent', () => {
  let component: DebareddashboardComponent;
  let fixture: ComponentFixture<DebareddashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebareddashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebareddashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
