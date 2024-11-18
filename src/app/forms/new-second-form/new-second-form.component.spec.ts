import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSecondFormComponent } from './new-second-form.component';

describe('NewSecondFormComponent', () => {
  let component: NewSecondFormComponent;
  let fixture: ComponentFixture<NewSecondFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSecondFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSecondFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
