import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FarmmstoneTxnPage } from './farmmstone-txn.page';

describe('FarmmstoneTxnPage', () => {
  let component: FarmmstoneTxnPage;
  let fixture: ComponentFixture<FarmmstoneTxnPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmmstoneTxnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
