import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdfComponent } from './opdf.component';

describe('OpdfComponent', () => {
  let component: OpdfComponent;
  let fixture: ComponentFixture<OpdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpdfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
