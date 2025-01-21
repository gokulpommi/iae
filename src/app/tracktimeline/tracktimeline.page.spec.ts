import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TracktimelinePage } from './tracktimeline.page';

describe('TracktimelinePage', () => {
  let component: TracktimelinePage;
  let fixture: ComponentFixture<TracktimelinePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TracktimelinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
