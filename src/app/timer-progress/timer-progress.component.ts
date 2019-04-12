import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer-progress',
  templateUrl: './timer-progress.component.html',
  styleUrls: ['./timer-progress.component.scss']
})
export class TimerProgressComponent implements OnInit {
  svgPath: string;

  constructor() {
    this.svgPath = this.calculateSvgPath(300);
  }

  ngOnInit() {}

  private calculateSvgPath(alpha) {
    alpha %= 360;
    const r = (alpha * Math.PI) / 180;
    const x = Math.sin(r) * 125;
    const y = Math.cos(r) * -125;
    const mid = alpha > 180 ? 1 : 0;
    const anim = 'M 0 0 v -125 A 125 125 1 ' + mid + ' 1 ' + x + ' ' + y + ' z';
    return anim;
  }
}
