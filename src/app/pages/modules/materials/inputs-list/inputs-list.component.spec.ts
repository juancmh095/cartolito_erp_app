import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputsListComponent } from './inputs-list.component';

describe('InputsListComponent', () => {
  let component: InputsListComponent;
  let fixture: ComponentFixture<InputsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
