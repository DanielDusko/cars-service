import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Car} from '../../models/car';

@Component({
  selector: 'cs-date-info',
  templateUrl: './date-info.component.html',
  styleUrls: ['./date-info.component.less']
})
export class DateInfoComponent {
  @Input() car: Car;
  @Output() checkElapsedDays = new EventEmitter<number>();

  getElapsedDays() {
    const elapsedMiliseconds = +new Date() - +new Date(this.car.deliveryDate);
    this.checkElapsedDays.emit(Math.round(elapsedMiliseconds / (1000 * 60 * 60 * 24)));
  }
}
