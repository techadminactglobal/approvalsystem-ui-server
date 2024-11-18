import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalopenComponent } from './modalopen.component';

describe('ModalopenComponent', () => {
  let component: ModalopenComponent;
  let fixture: ComponentFixture<ModalopenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalopenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalopenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
