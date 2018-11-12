import {Component, OnDestroy, OnInit} from '@angular/core';
import {LayoutService} from './shared-module/services/layout.service';
import {Subscription} from 'rxjs';
import {Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
  isSidebarVisible: boolean = false;
  isLoading: boolean = false;
  sidebarSubscription: Subscription;

  constructor(private layoutService: LayoutService,
              private router: Router) { }

  ngOnInit() {
    this.sidebarSubscription = this.layoutService.sidebarSource$.subscribe((isVisible) => this.isSidebarVisible = isVisible);

    this.router.events.subscribe((routerEvent: Event) => this.checkRouterEvent(routerEvent));
  }

  ngOnDestroy() {
    if(this.sidebarSubscription) {
      this.sidebarSubscription.unsubscribe();
    }
  }

  private checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.isLoading = true;
    } else if (routerEvent instanceof NavigationEnd ||
                routerEvent instanceof NavigationCancel ||
                routerEvent instanceof NavigationError) {
      this.isLoading = false;
    }

  }
}
