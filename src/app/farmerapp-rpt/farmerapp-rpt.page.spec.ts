import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FarmerappRptPage } from './farmerapp-rpt.page';

describe('FarmerappRptPage', () => {
  let component: FarmerappRptPage;
  let fixture: ComponentFixture<FarmerappRptPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerappRptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
