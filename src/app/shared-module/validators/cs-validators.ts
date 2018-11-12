import {AbstractControl} from '@angular/forms';

export class csValidators {
  static power(control: AbstractControl) {
    const minPower = 50;
    const maxPower = 800;
    if (control.value < minPower || control.value > maxPower) {
      return {
        powerBig: true
      }
    }
    return null;
  }
}
