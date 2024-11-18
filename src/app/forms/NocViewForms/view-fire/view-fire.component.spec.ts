import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFireComponent } from './view-fire.component';

describe('ViewFireComponent', () => {
  let component: ViewFireComponent;
  let fixture: ComponentFixture<ViewFireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
