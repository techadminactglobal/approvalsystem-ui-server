import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlinthComponentViewComponent } from './plinth-component-view.component';

describe('PlinthComponentViewComponent', () => {
  let component: PlinthComponentViewComponent;
  let fixture: ComponentFixture<PlinthComponentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlinthComponentViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlinthComponentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
