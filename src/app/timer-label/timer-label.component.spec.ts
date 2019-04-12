import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerLabelComponent } from './timer-label.component';

describe('TimerLabelComponent', () => {
  let component: TimerLabelComponent;
  let fixture: ComponentFixture<TimerLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimerLabelComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
