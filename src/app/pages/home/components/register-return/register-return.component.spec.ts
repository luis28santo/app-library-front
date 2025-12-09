import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterReturnComponent } from './register-return.component';

describe('RegisterReturnComponent', () => {
  let component: RegisterReturnComponent;
  let fixture: ComponentFixture<RegisterReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterReturnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterReturnComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
