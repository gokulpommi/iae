import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttandanceTxnPage } from './attandance-txn.page';

describe('AttandanceTxnPage', () => {
  let component: AttandanceTxnPage;
  let fixture: ComponentFixture<AttandanceTxnPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AttandanceTxnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
