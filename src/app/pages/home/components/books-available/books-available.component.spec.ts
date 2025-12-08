import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksAvailableComponent } from './books-available.component';

describe('BooksAvailableComponent', () => {
  let component: BooksAvailableComponent;
  let fixture: ComponentFixture<BooksAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksAvailableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksAvailableComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
