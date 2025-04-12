import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUpsellComponent } from './customer-upsell.component';

describe('CustomerUpsellComponent', () => {
  let component: CustomerUpsellComponent;
  let fixture: ComponentFixture<CustomerUpsellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerUpsellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerUpsellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
