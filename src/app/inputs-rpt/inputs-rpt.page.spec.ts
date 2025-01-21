import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputsRptPage } from './inputs-rpt.page';

describe('InputsRptPage', () => {
  let component: InputsRptPage;
  let fixture: ComponentFixture<InputsRptPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InputsRptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
