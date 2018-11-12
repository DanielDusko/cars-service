import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'cs-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.less']
})
export class PageNotFoundComponent {
  constructor(private router: Router) { }
  goToLogin() {
    this.router.navigate(['/login']);
    return false;
  }
}
