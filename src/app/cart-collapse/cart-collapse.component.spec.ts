import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCollapseComponent } from './cart-collapse.component';

describe('CartCollapseComponent', () => {
  let component: CartCollapseComponent;
  let fixture: ComponentFixture<CartCollapseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartCollapseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
