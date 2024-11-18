import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeparmentalRequestViewComponent } from './deparmental-request-view.component';

describe('DeparmentalRequestViewComponent', () => {
  let component: DeparmentalRequestViewComponent;
  let fixture: ComponentFixture<DeparmentalRequestViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeparmentalRequestViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeparmentalRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
