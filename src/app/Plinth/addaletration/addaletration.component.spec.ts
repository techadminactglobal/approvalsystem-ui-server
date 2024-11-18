import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddaletrationComponent } from './addaletration.component';

describe('AddaletrationComponent', () => {
  let component: AddaletrationComponent;
  let fixture: ComponentFixture<AddaletrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddaletrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddaletrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
