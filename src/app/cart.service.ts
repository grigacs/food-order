import { Injectable } from '@angular/core';
import {StoredFoods} from "./interfaces/stored-food.interface";
import {BehaviorSubject, Observable} from "rxjs";
import {Foods} from "./interfaces/food.interface";

@Injectable()
export class CartService {

  foods: StoredFoods[] = [];
  sameFoodAdded:boolean;
  storedFoods: StoredFoods;
  itemsInCartSubject: BehaviorSubject<Array<StoredFoods>> = new BehaviorSubject([]);

  constructor() {
    this.itemsInCartSubject.subscribe(foods => this.foods = foods);
  }

  public getFoodObservable(): Observable<StoredFoods[]>{
    return this.itemsInCartSubject.asObservable();
  }

  /**
   * set the food and the quantity
   * it is called by food_order page addToCart button
   *
   * */
  setFood(food: Foods, quantity: number, size:string): void {
    let getFoods:string = '';
    let strFoodObjects: Array<string> = [];
    food['quantity'] = quantity;
    food['size'] = size;
    /** if storage contains foods we get it and split into array
     *
     * after we check that food stored already, if food_id equals its true
     * then increment quantities and store into same object
     * **/
    if(sessionStorage.getItem('foods') !== null) {
      this.sameFoodAdded = false;
      getFoods = sessionStorage.getItem('foods');
      strFoodObjects = sessionStorage.getItem('foods').split('+');
      for(let i = 0; i < strFoodObjects.length;i++){
        if(strFoodObjects[i] != ''){
          let currentFood = JSON.parse(strFoodObjects[i]);
          if(food.food_id == currentFood.food_id) {
            if(size == currentFood.size) {
              let tempFood = JSON.parse(strFoodObjects[i]);
              tempFood.quantity += quantity;
              strFoodObjects[i] = JSON.stringify(tempFood);
              this.sameFoodAdded = true;
            }
          }
        }
      }
    }else{
      /**
       * or it is the first food the simply store it
       * */
      getFoods = JSON.stringify(food);
      sessionStorage.setItem('foods', getFoods);
    }

    /**
     * if another food was stored before but not the same we add the new food
     * after store into session
     * */
    if(this.sameFoodAdded === false) {
      getFoods = getFoods + '+' + JSON.stringify(food);
      sessionStorage.setItem('foods', getFoods);


      /**
       * if same we just do string from array and store it
       * */
    }else if(this.sameFoodAdded === true){
      getFoods = strFoodObjects.join('+');
      sessionStorage.setItem('foods', getFoods);
    }


    let strFoodObjects2: Array<string> = [];
    if (sessionStorage.getItem('foods') !== null) {
      strFoodObjects2 = sessionStorage.getItem('foods').split('+');
    }
    this.foods = [];
    for (let i = 0; i < strFoodObjects2.length; i++) {
      if(strFoodObjects2[i] != '') {
        this.foods.push(JSON.parse(strFoodObjects2[i]))
      }
    }

    this.itemsInCartSubject.next(this.foods);
    console.log(this.itemsInCartSubject);
  }


}
