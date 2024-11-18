import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerApplicantDetialsComponent } from './owner-applicant-detials.component';

describe('OwnerApplicantDetialsComponent', () => {
  let component: OwnerApplicantDetialsComponent;
  let fixture: ComponentFixture<OwnerApplicantDetialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerApplicantDetialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerApplicantDetialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
