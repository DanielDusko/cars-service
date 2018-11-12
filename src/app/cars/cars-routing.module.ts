import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {CarDetailsComponent} from './car-details/car-details.component';
import {CarResolveService} from './car-resolve.service';
import {CarsListComponent} from './cars-list/cars-list.component';
import {CarsComponent} from './cars.component';
import {FormCanDeactivateGuard} from '../guards/form-can-deactivate.guard';

const CARS_ROUTES: Route[] = [
  {
    path: '',
    component: CarsComponent,
    children: [
      {
        path: '',
        component: CarsListComponent,
        canDeactivate: [FormCanDeactivateGuard]
      },
      {
        path: ':id',
        component: CarDetailsComponent,
        resolve: {car: CarResolveService},
        canDeactivate: [FormCanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(CARS_ROUTES)],
  exports: [RouterModule]
})

export class CarsRoutingModule {}
