import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {CarDetailsComponent} from './car-details/car-details.component';
import {CarResolveService} from './car-resolve.service';

const CARS_ROUTES: Route[] = [
  {
    path: 'cars/:id',
    component: CarDetailsComponent,
    resolve: {car: CarResolveService}
  }
];

@NgModule({
  imports: [RouterModule.forChild(CARS_ROUTES)],
  exports: [RouterModule]
})

export class CarsRoutingModule {}
