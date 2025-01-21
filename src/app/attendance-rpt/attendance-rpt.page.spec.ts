import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttendanceRptPage } from './attendance-rpt.page';

describe('AttendanceRptPage', () => {
  let component: AttendanceRptPage;
  let fixture: ComponentFixture<AttendanceRptPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceRptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
