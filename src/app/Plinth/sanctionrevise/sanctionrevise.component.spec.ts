import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanctionreviseComponent } from './sanctionrevise.component';

describe('SanctionreviseComponent', () => {
  let component: SanctionreviseComponent;
  let fixture: ComponentFixture<SanctionreviseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanctionreviseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SanctionreviseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
