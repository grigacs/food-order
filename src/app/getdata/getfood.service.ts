import { Foods } from './../interfaces/food.interface';
import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";


@Injectable()
export class GetfoodService {

  constructor(private http: Http) { }

  jsondata: Object;
  foods: Object;
  food: Foods[];
  results: Observable<Foods[]>;

  getFoods(): Observable<Foods[]>{

   this.results = this.http.get('assets/database/database.json')
      .map(res => res.json())
      .map(jsondata => this. jsondata = jsondata.database)
      .map(foods => this.foods = foods.foods)
      .map(food => this.food = food);
    return this.results;
  }


}
