import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FarmbookingTxnPage } from './farmbooking-txn.page';

describe('FarmbookingTxnPage', () => {
  let component: FarmbookingTxnPage;
  let fixture: ComponentFixture<FarmbookingTxnPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmbookingTxnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
