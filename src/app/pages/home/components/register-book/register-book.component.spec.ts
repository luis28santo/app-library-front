import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBookComponent } from './register-book.component';

describe('RegisterBookComponent', () => {
  let component: RegisterBookComponent;
  let fixture: ComponentFixture<RegisterBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterBookComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
