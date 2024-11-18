import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportFileDocumentComponent } from './support-file-document.component';

describe('SupportFileDocumentComponent', () => {
  let component: SupportFileDocumentComponent;
  let fixture: ComponentFixture<SupportFileDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportFileDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportFileDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
