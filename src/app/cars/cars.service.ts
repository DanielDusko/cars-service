import { Injectable } from '@angular/core';
import {Car} from './models/car';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private apiUrl = "http://localhost:3000/api/cars";
  constructor(private http: HttpClient) { }
  // Observable strumień danych
  getCars(): Observable<Car[]> {
    return this.http.get(this.apiUrl)
      .pipe(map(res => res as Car[]));
  }

  getCar(id: number): Observable<Car> {
    return this.http.get(this.apiUrl + `/${id}`)
      .pipe(map(res => res as Car));
  }

  addCar(data): Observable<any> {
    return this.http.post(this.apiUrl, data)
      .pipe(map(res => res as Car[]));
  }

  updateCar(id: number, data): Observable<Car> {
    return this.http.put(this.apiUrl + `/${id}`, data)
      .pipe(map(res => res as Car));
  }
}
