import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DownloadmapPage } from './downloadmap.page';

describe('DownloadmapPage', () => {
  let component: DownloadmapPage;
  let fixture: ComponentFixture<DownloadmapPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadmapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
