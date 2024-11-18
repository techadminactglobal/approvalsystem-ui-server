import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebarredComponent } from './debarred.component';

describe('DebarredComponent', () => {
  let component: DebarredComponent;
  let fixture: ComponentFixture<DebarredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebarredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebarredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
