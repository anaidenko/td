import { Component, OnInit } from '@angular/core';
import { Observable, timer, BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  state: 'running' | 'paused' = 'paused';
  action: 'play' | 'pause' = 'play';

  playing$ = new BehaviorSubject<boolean>(false);
  timer$: Observable<number>;
  progress$: Observable<number>;

  constructor() {
    this.timer$ = timer(1000, 1000).pipe(startWith(0));
    this.progress$ = this.playing$.pipe(
      switchMap(playing => (playing ? this.timer$ : of(0))),
      map(i => Math.max(0, 100 - i))
    );
  }

  ngOnInit() {}

  toggle() {
    if (this.state === 'running') {
      this.state = 'paused';
      this.action = 'play';
      this.playing$.next(false);
    } else {
      this.state = 'running';
      this.action = 'pause';
      this.playing$.next(true);
    }
  }
}
