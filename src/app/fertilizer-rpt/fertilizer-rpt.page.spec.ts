import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FertilizerRptPage } from './fertilizer-rpt.page';

describe('FertilizerRptPage', () => {
  let component: FertilizerRptPage;
  let fixture: ComponentFixture<FertilizerRptPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FertilizerRptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
