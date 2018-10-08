import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsListComponent } from './cars-list/cars-list.component';
import { TotalCostComponent } from './total-cost/total-cost.component';
import {SharedModule} from '../shared-module/shared-module';
import { CarDetailsComponent } from './car-details/car-details.component';
import {RouterModule} from '@angular/router';
import {CarResolveService} from './car-resolve.service';
import { EmptyComponent } from './empty/empty.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [CarsListComponent],
  providers: [CarResolveService],
  declarations: [CarsListComponent, TotalCostComponent, CarDetailsComponent, EmptyComponent]
})
export class CarsModule { }
