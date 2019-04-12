import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, timer, BehaviorSubject, of, combineLatest } from 'rxjs';
import { map, switchMap, tap, mapTo, startWith, scan } from 'rxjs/operators';
import { Todo } from '../todo';

// const DEFAULT_TIMER_SEC = 10; // 10 sec
const DEFAULT_TIMER_SEC = 30 * 60; // 30 min

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  state: 'running' | 'paused' = 'paused';
  iconClass: 'play' | 'pause' = 'play';

  private _todo: Todo;

  @Input()
  set todo(todo: Todo) {
    this._todo = todo;
    this.setupTimer(todo);
  }

  @Output()
  start = new EventEmitter<Todo>();

  @Output()
  stop = new EventEmitter<Todo>();

  private playingSubj = new BehaviorSubject<boolean>(false);
  private timeSpentSubj = new BehaviorSubject<number>(0);
  private timeRemainingSubj = new BehaviorSubject<number>(0);

  playing$ = this.playingSubj.asObservable();
  interval$: Observable<number>;
  timer$: Observable<number>;
  timeSpent$: Observable<number>;
  timeRemaining$: Observable<number>;
  timeRemainingProgress$: Observable<number>;

  constructor() {
    this.initObservables();
  }

  ngOnInit() {}

  initObservables() {
    this.interval$ = timer(1000, 1000).pipe(
      mapTo(1),
      startWith(0)
    );

    this.timer$ = this.playingSubj.pipe(
      switchMap(playing => (playing ? this.interval$ : of(0))),
      scan((acc, curr) => (curr ? curr + acc : acc), 0)
    );

    this.timeSpent$ = combineLatest(this.timeSpentSubj, this.timer$).pipe(
      map(([timeSpent, timer]) => (timeSpent || 0) + (timer || 0)),
      tap(value => (this._todo.timeSpent = value))
    );

    this.timeRemaining$ = combineLatest(this.timeRemainingSubj, this.timer$).pipe(
      map(([timeRemaining, timer]) => (typeof timeRemaining === 'number' ? timeRemaining : DEFAULT_TIMER_SEC) - (timer || 0)),
      tap(value => {
        if (value < 0) {
          this.pause();
        } else {
          this._todo.timeRemaining = value;
        }
      })
    );

    this.timeRemainingProgress$ = combineLatest(this.timeSpent$, this.timeRemaining$).pipe(
      map(([timeSpent, timeRemaining]) => (timeSpent + timeRemaining ? (timeRemaining / (timeSpent + timeRemaining)) * 100 : 0))
    );
  }

  setupTimer(todo: Todo) {
    this.timeSpentSubj.next(todo ? todo.timeSpent : 0);
    this.timeRemainingSubj.next(todo ? todo.timeRemaining : 0);
  }

  toggle() {
    if (this.state === 'running') {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    this.state = 'running';
    this.iconClass = 'pause';
    this.playingSubj.next(true);
    this.start.emit(this._todo);
  }

  pause() {
    this.state = 'paused';
    this.iconClass = 'play';
    this.playingSubj.next(false);
    this.stop.emit(this._todo);
  }
}
