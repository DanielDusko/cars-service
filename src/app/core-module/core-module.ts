import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import {RouterModule} from '@angular/router';
import {EmptyComponent} from '../cars/empty/empty.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [SidebarComponent],
  declarations: [SidebarComponent, EmptyComponent]
})
export class CoreModule { }
