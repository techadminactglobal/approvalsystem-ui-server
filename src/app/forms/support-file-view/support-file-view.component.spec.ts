import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportFileViewComponent } from './support-file-view.component';

describe('SupportFileViewComponent', () => {
  let component: SupportFileViewComponent;
  let fixture: ComponentFixture<SupportFileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportFileViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportFileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
