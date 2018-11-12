import { Injectable } from '@angular/core';
import {reject} from 'q';
import {LayoutService} from '../shared-module/services/layout.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private layoutService: LayoutService) { }
  //fake credentials
  private credentials = {
    login: 'admin',
    password: 'admin'
  };

  private isUserLoggedIn: boolean = false;

  //fake login
  login(login, password) {
    return new Promise((resolve, reject) => {
      if(login === this.credentials.login && password === this.credentials.password) {
        this.isUserLoggedIn = true;
        resolve();
      } else {
        reject();
      }
    });
  }

  logOut() {
    this.isUserLoggedIn = false;
    this.layoutService.hideSidebar();
  }

  isLoggedIn() {
    return this.isUserLoggedIn;
  }
}
