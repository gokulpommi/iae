import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FarmersdataRptPage } from './farmersdata-rpt.page';

describe('FarmersdataRptPage', () => {
  let component: FarmersdataRptPage;
  let fixture: ComponentFixture<FarmersdataRptPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmersdataRptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
