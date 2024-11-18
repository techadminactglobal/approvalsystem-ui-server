import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlintComponentComponent } from './plint-component.component';

describe('PlintComponentComponent', () => {
  let component: PlintComponentComponent;
  let fixture: ComponentFixture<PlintComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlintComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlintComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
