import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrmstatusRptPage } from './frmstatus-rpt.page';

describe('FrmstatusRptPage', () => {
  let component: FrmstatusRptPage;
  let fixture: ComponentFixture<FrmstatusRptPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmstatusRptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
