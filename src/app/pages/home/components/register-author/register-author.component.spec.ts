import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAuthorComponent } from './register-author.component';

describe('RegisterAuthorComponent', () => {
  let component: RegisterAuthorComponent;
  let fixture: ComponentFixture<RegisterAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterAuthorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAuthorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
