import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  state: 'running' | 'paused' = 'paused';
  action: 'play' | 'pause' = 'play';

  timer$: Observable<number>;
  progress$: Observable<number>;

  constructor() {
    this.timer$ = timer(1000, 1000).pipe(startWith(0));
    this.progress$ = this.timer$.pipe(map(i => Math.max(0, 100 - i)));
  }

  ngOnInit() {}

  toggle() {
    if (this.state === 'running') {
      this.state = 'paused';
      this.action = 'play';
    } else {
      this.state = 'running';
      this.action = 'pause';
    }
  }
}
