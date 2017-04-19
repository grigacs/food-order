import { Foods } from './../interfaces/food.interface';
import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import {SessionService} from "../session.service";


@Injectable()
export class GetfoodService {

  constructor(private http: Http, private sessionService:SessionService) { }

    /** Created by Richard Asztalos
     *           This service helps to the food-order component to list out the stored foods.
     *           It connects to the database (which is on the server - at localhost:8100).
     *           After it returns an Observable with the foods and map the result into a food array.
    */

  jsondata: Object;
  foods: Object;
  food: Foods[];
  results: Observable<Foods[]>;

  getFoods(): Observable<Foods[]>{

   this.results = this.http.get('http://localhost:8100/database')
      .map(res => res.json())
      .map(jsondata => this. jsondata = jsondata.database)
      .map(foods => this.foods = foods.foods)
      .map(food => this.food = food);
    return this.results;
  }



}
