import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';

@Component({
  selector: 'cs-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit {
  time: Date = null;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    setInterval(() => {
      this.time = new Date();
      // this.changeDetectorRef.markForCheck();
      this.changeDetectorRef.detectChanges();
    }, 1500);
  }

}
