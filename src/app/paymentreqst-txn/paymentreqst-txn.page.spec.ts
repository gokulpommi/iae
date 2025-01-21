import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentreqstTxnPage } from './paymentreqst-txn.page';

describe('PaymentreqstTxnPage', () => {
  let component: PaymentreqstTxnPage;
  let fixture: ComponentFixture<PaymentreqstTxnPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentreqstTxnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
