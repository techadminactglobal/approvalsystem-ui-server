import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFirstFormComponent } from './new-first-form.component';

describe('NewFirstFormComponent', () => {
  let component: NewFirstFormComponent;
  let fixture: ComponentFixture<NewFirstFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFirstFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewFirstFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
