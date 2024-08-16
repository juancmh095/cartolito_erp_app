import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputsMaterialComponent } from './inputs-material.component';

describe('InputsMaterialComponent', () => {
  let component: InputsMaterialComponent;
  let fixture: ComponentFixture<InputsMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputsMaterialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputsMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
