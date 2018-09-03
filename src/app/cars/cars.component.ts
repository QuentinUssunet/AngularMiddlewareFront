import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CarService } from '../car.service';
import { Car } from '../car';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars: Array<Car>;
  newCarModel: string;
  newCarPower: number;
  newCarColor: string;

  constructor(private carService: CarService) {
    this.cars=new Array();
  }

  ngOnInit() {
    this.carService.loadList().subscribe((list)=> this.cars = list);
  }

  validateCar(event: Event, carForm: NgForm) {
    let car: Car = new Car();
    car.model = this.newCarModel;
    car.power = this.newCarPower;
    car.color = this.newCarColor;
    this.cars.push(car);
    this.carService.createCar(car);
    carForm.resetForm();
  }
}
