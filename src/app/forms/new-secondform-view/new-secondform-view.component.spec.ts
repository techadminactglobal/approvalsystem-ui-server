import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSecondformViewComponent } from './new-secondform-view.component';

describe('NewSecondformViewComponent', () => {
  let component: NewSecondformViewComponent;
  let fixture: ComponentFixture<NewSecondformViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSecondformViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSecondformViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
