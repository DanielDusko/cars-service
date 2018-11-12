import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {EmptyComponent} from './cars/empty/empty.component';
import {CarsModule} from './cars';
import {AuthCanLoadGuard} from './guards/auth-can-load.guard';
import {AuthGuard} from './guards/auth.guard';
import {PageNotFoundComponent} from './shared-module/page-not-found/page-not-found.component';

const APP_ROUTES: Route[] = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'cars', canLoad: [AuthCanLoadGuard], loadChildren: () => CarsModule},
  {path: 'motorbikes', component: EmptyComponent, canActivate: [AuthGuard]},
  {path: 'bikes', component: EmptyComponent, canActivate: [AuthGuard]},
  {path: 'quads', component: EmptyComponent, canActivate: [AuthGuard]},
  {path: '**', component: PageNotFoundComponent}
];
// pathMatch mówi jak musi zgadzać się nasza ścieżka w pełni
// full oznacza że musi sie zgadzać z path
@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES, {enableTracing: true})],
  exports: [RouterModule]
})

export class AppRoutingModule {}
