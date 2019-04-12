import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerProgressComponent } from './timer-progress.component';

describe('TimerProgressComponent', () => {
  let component: TimerProgressComponent;
  let fixture: ComponentFixture<TimerProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimerProgressComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
