import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NocPageComponent } from './noc-page.component';

describe('NocPageComponent', () => {
  let component: NocPageComponent;
  let fixture: ComponentFixture<NocPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NocPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NocPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
