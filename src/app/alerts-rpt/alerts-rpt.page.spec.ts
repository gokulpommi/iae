import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertsRptPage } from './alerts-rpt.page';

describe('AlertsRptPage', () => {
  let component: AlertsRptPage;
  let fixture: ComponentFixture<AlertsRptPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsRptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
