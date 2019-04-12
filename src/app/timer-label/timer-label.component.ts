import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-timer-label',
  templateUrl: './timer-label.component.html',
  styleUrls: ['./timer-label.component.scss']
})
export class TimerLabelComponent implements OnInit {
  time: string;

  @Input()
  set timer(value: number) {
    const duration = moment.duration(value, 'seconds');
    this.time = moment.utc(duration.as('milliseconds')).format('mm:ss');
  }

  constructor() {}

  ngOnInit() {}
}
