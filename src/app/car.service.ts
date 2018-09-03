import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Car } from './car';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment as ENV } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private subject: BehaviorSubject<Array<Car>>;
  private carsList: Array<Car>

  constructor(private http: HttpClient) {
    this.subject=new BehaviorSubject(new Array());
    this.carsList=new Array<Car>();
  }

  get cars(): Observable<Array<Car>>{
    return this.subject.asObservable();
  }

  getApi() {
    return this.http.get(ENV.apiUrl); 
  }

  loadList() {
    this.http.get<Array<Car>>(ENV.apiUrl)
      .subscribe((list)=>this.subject.next(list))
    return this.cars;
  }

  createCar(car: Car) {
    let result = new Subject<Car>();
    this.http.post<Car>(ENV.apiUrl, car)
      .subscribe((newCar)=> {
        // HTTP post -> success
        this.carsList.push(newCar);
        result.next(newCar);
        result.complete();
      }, (response: HttpErrorResponse) => {
        // HTTP post -> error
        result.error(response.message)
      });
      return result;
  }
}
