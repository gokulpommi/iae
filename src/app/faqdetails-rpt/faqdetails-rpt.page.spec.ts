import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaqdetailsRptPage } from './faqdetails-rpt.page';

describe('FaqdetailsRptPage', () => {
  let component: FaqdetailsRptPage;
  let fixture: ComponentFixture<FaqdetailsRptPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqdetailsRptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
