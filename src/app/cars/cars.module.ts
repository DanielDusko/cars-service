import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsListComponent } from './cars-list/cars-list.component';
import { TotalCostComponent } from './total-cost/total-cost.component';
import {SharedModule} from '../shared-module/shared-module';
import { CarDetailsComponent } from './car-details/car-details.component';
import {RouterModule} from '@angular/router';
import {CarResolveService} from './car-resolve.service';
import {ReactiveFormsModule} from '@angular/forms';
import { IncomeTaxComponent } from './total-cost/income-tax/income-tax.component';
import {CostSharedService} from './cost-shared.service';
import { CarTableRowComponent } from './car-table-row/car-table-row.component';
import {CarsRoutingModule} from './cars-routing.module';
import { CarsComponent } from './cars.component';
import { DateInfoComponent } from './car-details/date-info/date-info.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    CarsRoutingModule
  ],
  entryComponents: [DateInfoComponent], //dynamiczne komponenty również tworzone za pomoca routingu
  exports: [CarsListComponent],
  providers: [CarResolveService, CostSharedService],
  declarations: [CarsListComponent, TotalCostComponent, CarDetailsComponent,
    IncomeTaxComponent, CarTableRowComponent, CarsComponent, DateInfoComponent]
})
export class CarsModule { }
