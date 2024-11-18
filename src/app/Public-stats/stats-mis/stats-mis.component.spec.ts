import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsMisComponent } from './stats-mis.component';

describe('StatsMisComponent', () => {
  let component: StatsMisComponent;
  let fixture: ComponentFixture<StatsMisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsMisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsMisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
