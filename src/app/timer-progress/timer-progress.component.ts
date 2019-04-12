import { Component, OnInit, Input } from '@angular/core';

/**
 * @see https://codepen.io/anon/pen/KrwJxw for demo/reference
 */
@Component({
  selector: 'app-timer-progress',
  templateUrl: './timer-progress.component.html',
  styleUrls: ['./timer-progress.component.scss']
})
export class TimerProgressComponent implements OnInit {
  @Input()
  set percent(value: number) {
    value = this.limit(value, 0, 99.9999) || 0;
    const angle = (value / 100) * 360;
    this.svgPath = this.calculateSvgPath(angle);
  }

  svgPath: string;

  constructor() {}

  ngOnInit() {}

  private calculateSvgPath(angle) {
    angle %= 360;
    const r = (angle * Math.PI) / 180;
    const x = Math.sin(r) * 125;
    const y = Math.cos(r) * -125;
    const mid = angle > 180 ? 1 : 0;
    const result = 'M 0 0 v -125 A 125 125 1 ' + mid + ' 1 ' + x + ' ' + y + ' z';
    return result;
  }

  private limit(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }
}
