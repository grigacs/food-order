import { Injectable } from '@angular/core';
import {Users} from "./interfaces/user.interface";
import {Foods} from "./interfaces/food.interface";


@Injectable()
export class SessionService {

  private loggedIn: boolean = false;
  private user: Users;
  private foods: Array<Foods> = [];

  constructor() { }

  isLoggedIn() :boolean{
    let loggedIn = sessionStorage.getItem('isLoggedIn')
    this.loggedIn = (loggedIn === "true");
    return this.loggedIn;
  }

  setLoggedIn(isLoggedIn: boolean){
    this.loggedIn = isLoggedIn;
    sessionStorage.setItem('isLoggedIn', this.loggedIn.toString())
  }

  setUser(user: Users){
    this.user = user;
    sessionStorage.setItem('user', JSON.stringify(this.user));
  }

  getUser(): Users {
    let user = sessionStorage.getItem('user');
    this.user = JSON.parse(user);
    return this.user;
  }

  setFood(food: Foods) {
    let getFoods:string='';
    if(sessionStorage.getItem('foods') !== null) {
      getFoods = sessionStorage.getItem('foods');
    }
      console.log(getFoods);
      getFoods = getFoods + '+' + JSON.stringify(food);

    sessionStorage.setItem('foods', getFoods);
  }

  getFoods(): Array<Foods>{
    let strFoodObjects: Array<string> = [];
    if (sessionStorage.getItem('foods') !== null) {
      strFoodObjects = sessionStorage.getItem('foods').split('+');
    }
    this.foods = [];
    for (let i = 1; i < strFoodObjects.length-1; i++) {
      this.foods.push(JSON.parse(strFoodObjects[i]))
    }
    return this.foods;
  }


}
