import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizencornerComponent } from './citizencorner.component';

describe('CitizencornerComponent', () => {
  let component: CitizencornerComponent;
  let fixture: ComponentFixture<CitizencornerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitizencornerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizencornerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
