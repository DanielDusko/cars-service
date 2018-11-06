import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CostSharedService {
  //$ oznacza, że jest to Observable
  totalCostSource$ = new Subject<number>();

  sharedCost(cost: number) {
    //next wysyła
    this.totalCostSource$.next(cost);
  }
}
