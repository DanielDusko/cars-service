import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'cs-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class EmptyComponent implements OnInit {
  nazwa: string;
  constructor(private router: Router) { }

  ngOnInit() {
    this.nazwa = this.router.url.replace('/', '').concat('!!!');
  }

}
