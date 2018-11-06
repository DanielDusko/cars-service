import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {CarsListComponent} from './cars/cars-list/cars-list.component';
import {AppComponent} from './app.component';
import {EmptyComponent} from './cars/empty/empty.component';

const APP_ROUTES: Route[] = [
  {path: '', pathMatch: 'full', redirectTo: 'cars'},
  {path: 'cars', component: CarsListComponent},
  {path: 'motorbikes', component: EmptyComponent},
  {path: 'bikes', component: EmptyComponent},
  {path: 'quads', component: EmptyComponent}

]
// pathMatch mówi jak musi zgadzać się nasza ścieżka w pełni
// full oznacza że musi sie zgadzać z path
@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule {}
