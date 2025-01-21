import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaqRptPage } from './faq-rpt.page';

describe('FaqRptPage', () => {
  let component: FaqRptPage;
  let fixture: ComponentFixture<FaqRptPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqRptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
