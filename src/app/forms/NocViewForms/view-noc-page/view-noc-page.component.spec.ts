import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNocPageComponent } from './view-noc-page.component';

describe('ViewNocPageComponent', () => {
  let component: ViewNocPageComponent;
  let fixture: ComponentFixture<ViewNocPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNocPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewNocPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
