import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentsRptPage } from './payments-rpt.page';

describe('PaymentsRptPage', () => {
  let component: PaymentsRptPage;
  let fixture: ComponentFixture<PaymentsRptPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsRptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
