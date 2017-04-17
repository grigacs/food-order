import { Injectable } from '@angular/core';
import {Users} from "./interfaces/user.interface";
import {Foods} from "./interfaces/food.interface";
import {StoredFoods} from "./interfaces/stored-food.interface";
import {Observable} from "rxjs";


@Injectable()
export class SessionService {

  private loggedIn: boolean = false;
  private user: Users;
  private foods: Array<StoredFoods> = [];
  private sameFoodAdded:boolean;
  private storedFoods: StoredFoods;

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

  setFood(food: Foods, quantity: number) {
    let getFoods:string = '';
    //let quantity: number = 1;
    let strFoodObjects: Array<string> = [];
    food['quantity'] = quantity;


    if(sessionStorage.getItem('foods') !== null) {
      this.sameFoodAdded = false;
      getFoods = sessionStorage.getItem('foods');
      strFoodObjects = sessionStorage.getItem('foods').split('+');
      for(let i = 0; i < strFoodObjects.length;i++){
        if(strFoodObjects[i] != ''){
          let currentFood = JSON.parse(strFoodObjects[i]);
          if(food.food_id == currentFood.food_id) {
            let tempFood = JSON.parse(strFoodObjects[i]);
            tempFood.quantity+= quantity;
            strFoodObjects[i] = JSON.stringify(tempFood);
            this.sameFoodAdded = true;
          }
        }
      }
    }else{
      console.log(food);
      getFoods = JSON.stringify(food);
      sessionStorage.setItem('foods', getFoods);
    }

    if(this.sameFoodAdded === false){
        console.log(food);
        getFoods = getFoods + '+' + JSON.stringify(food);
        sessionStorage.setItem('foods', getFoods)

    }else if(this.sameFoodAdded === true){
        console.log(food);
        getFoods = strFoodObjects.join('+');
        sessionStorage.setItem('foods', getFoods);
    }

  }

  removeFromCart(food: StoredFoods){
    let removed: boolean = false;
    let index: number;
    let getFoods:string = '';
    let strFoodObjects = sessionStorage.getItem('foods').split('+');
    for(let i = 0; i < strFoodObjects.length;i++){
      if(strFoodObjects[i] != ''){
        let currentFood = JSON.parse(strFoodObjects[i]);
        if(food.food_id == currentFood.food_id) {
          console.log(currentFood);
          let tempFood = JSON.parse(strFoodObjects[i]);
          tempFood.quantity--;
          if(tempFood.quantity > 0){
            strFoodObjects[i] = JSON.stringify(tempFood);
          }else{
            removed = true;
            index = i;
          }
        }
      }
    }


    if(removed === true)
      strFoodObjects.splice(index,1);
    getFoods = strFoodObjects.join('+');

    sessionStorage.setItem('foods', getFoods);
  }


  addMoreToCart(food: StoredFoods){
    let getFoods:string = '';
    let strFoodObjects: Array<string> = [];

    getFoods = sessionStorage.getItem('foods');
    strFoodObjects = sessionStorage.getItem('foods').split('+');
      for(let i = 0; i < strFoodObjects.length;i++){
        if(strFoodObjects[i] != ''){
          let currentFood = JSON.parse(strFoodObjects[i]);
          if(food.food_id == currentFood.food_id) {
            let tempFood = JSON.parse(strFoodObjects[i]);
            tempFood.quantity++;
            strFoodObjects[i] = JSON.stringify(tempFood);
          }
        }
      }

    getFoods = strFoodObjects.join('+');
    sessionStorage.setItem('foods', getFoods);
  }


  removeAllFromCart(food: StoredFoods){
    let strFoodObjects = sessionStorage.getItem('foods').split('+');
    let index: number;
    for(let i = 0; i < strFoodObjects.length;i++){
      if(strFoodObjects[i] != '') {
        let currentFood = JSON.parse(strFoodObjects[i]);
        if (food.food_id == currentFood.food_id) {
          strFoodObjects.splice(i,1);
        }
      }
    }
    sessionStorage.setItem('foods',strFoodObjects.join('+'));
  }

  emptyCart(){
    sessionStorage.setItem('foods',[''].toString().trim());
  }

  getFoods(): Array<StoredFoods>{
    let strFoodObjects: Array<string> = [];
    if (sessionStorage.getItem('foods') !== null) {
      strFoodObjects = sessionStorage.getItem('foods').split('+');
    }
    this.foods = [];
    for (let i = 0; i < strFoodObjects.length; i++) {
      if(strFoodObjects[i] != '') {
        this.foods.push(JSON.parse(strFoodObjects[i]))
      }
    }
    return this.foods;
  }


}
