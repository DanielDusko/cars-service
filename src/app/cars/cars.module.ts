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
import { IncomeTaxComponent } from './total-cost/income-tax/income-tax.component';
import {CostSharedService} from './cost-shared.service';
import { CarTableRowComponent } from './car-table-row/car-table-row.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [CarsListComponent],
  providers: [CarResolveService, CostSharedService],
  declarations: [CarsListComponent, TotalCostComponent, CarDetailsComponent, EmptyComponent, IncomeTaxComponent, CarTableRowComponent]
})
export class CarsModule { }
