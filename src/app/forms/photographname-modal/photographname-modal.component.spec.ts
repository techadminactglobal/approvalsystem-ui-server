import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographnameModalComponent } from './photographname-modal.component';

describe('PhotographnameModalComponent', () => {
  let component: PhotographnameModalComponent;
  let fixture: ComponentFixture<PhotographnameModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotographnameModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotographnameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
