import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsletterComponent } from './dsletter.component';

describe('DsletterComponent', () => {
  let component: DsletterComponent;
  let fixture: ComponentFixture<DsletterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsletterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
