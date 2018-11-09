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
    return this.http.get<Car[]>(this.apiUrl);
      //.pipe(map(res => res as Car[]));
  }

  removeCar(id: number): Observable<Car> {
    return this.http.delete(this.apiUrl + `/${id}`)
      .pipe(map(res => res as Car));
  }

  getCar(id: number): Observable<Car> {
    return this.http.get<Car>(this.apiUrl + `/${id}`);
       // .pipe(map(res => res as Car));
  }

  addCar(data): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, data);
      // .pipe(map(res => res as Car[]));
  }

  updateCar(id: number, data): Observable<Car> {
    return this.http.put(this.apiUrl + `/${id}`, data)
      .pipe(map(res => res as Car));
  }
}
