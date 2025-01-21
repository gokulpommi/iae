import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReturnsRptPage } from './returns-rpt.page';

describe('ReturnsRptPage', () => {
  let component: ReturnsRptPage;
  let fixture: ComponentFixture<ReturnsRptPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnsRptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
