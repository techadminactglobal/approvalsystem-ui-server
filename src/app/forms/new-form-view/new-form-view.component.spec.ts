import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFormViewComponent } from './new-form-view.component';

describe('NewFormViewComponent', () => {
  let component: NewFormViewComponent;
  let fixture: ComponentFixture<NewFormViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFormViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
