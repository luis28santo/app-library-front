import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLoanComponent } from './register-loan.component';

describe('RegisterLoanComponent', () => {
  let component: RegisterLoanComponent;
  let fixture: ComponentFixture<RegisterLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterLoanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterLoanComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
