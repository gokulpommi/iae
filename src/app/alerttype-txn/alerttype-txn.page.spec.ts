import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlerttypeTxnPage } from './alerttype-txn.page';

describe('AlerttypeTxnPage', () => {
  let component: AlerttypeTxnPage;
  let fixture: ComponentFixture<AlerttypeTxnPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AlerttypeTxnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
