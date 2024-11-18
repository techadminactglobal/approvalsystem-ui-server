import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicdashboardComponent } from './publicdashboard.component';

describe('PublicdashboardComponent', () => {
  let component: PublicdashboardComponent;
  let fixture: ComponentFixture<PublicdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicdashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
