import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocateauditPage } from './locateaudit.page';

describe('LocateauditPage', () => {
  let component: LocateauditPage;
  let fixture: ComponentFixture<LocateauditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LocateauditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
