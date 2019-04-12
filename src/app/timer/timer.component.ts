import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  state: 'running' | 'paused' = 'paused';
  action: 'play' | 'pause' = 'play';

  constructor() {}

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
