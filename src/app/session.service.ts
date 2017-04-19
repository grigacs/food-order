import { Injectable } from '@angular/core';
import {Users} from "./interfaces/user.interface";
import {Foods} from "./interfaces/food.interface";
import {StoredFoods} from "./interfaces/stored-food.interface";
import {Subject, Observable} from "rxjs";


@Injectable()
export class SessionService {

  private loggedIn: boolean = false;
  private user: Users;
  private foods: Array<StoredFoods> = [];
  private sameFoodAdded:boolean;
  private storedFoods: StoredFoods;

  constructor() { }


  /**
   * check user logged in or not
   * */
  isLoggedIn() :boolean{
    let loggedIn = sessionStorage.getItem('isLoggedIn');
    this.loggedIn = (loggedIn === "true");
    return this.loggedIn;
  }


  /**
   * set user logged or not (true or false)
   * */
  setLoggedIn(isLoggedIn: boolean){
    this.loggedIn = isLoggedIn;
    sessionStorage.setItem('isLoggedIn', this.loggedIn.toString())
  }


  /**
   * set user object
   * only string can be stored must stringify the object
   * */
  setUser(user: Users){
    this.user = user;
    sessionStorage.setItem('user', JSON.stringify(this.user));
  }


  /**
   * get user from storage , need parse into object
   * */
  getUser(): Users {
    let user = sessionStorage.getItem('user');
    this.user = JSON.parse(user);
    return this.user;
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
  }


  /**
   * it is called by decrement
   * receive param which type is StoredFood
   * check the index where same the food_id and decrement the quantity
   * after store it into storage
   * */
  removeFromCart(food: StoredFoods){
    let removed: boolean = false;
    let index: number;
    let getFoods:string = '';
    let strFoodObjects = sessionStorage.getItem('foods').split('+');
    for(let i = 0; i < strFoodObjects.length;i++){
      if(strFoodObjects[i] != ''){
        let currentFood = JSON.parse(strFoodObjects[i]);
        if(food.food_id == currentFood.food_id && food.size == currentFood.size) {
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


  /**
   * it is called by increment
   * receive param which type is StoredFood
   * check the index where same the food_id and decrement the quantity
   * after store it into storage
   * */
  addMoreToCart(food: StoredFoods){
    let getFoods:string = '';
    let strFoodObjects: Array<string> = [];

    getFoods = sessionStorage.getItem('foods');
    strFoodObjects = sessionStorage.getItem('foods').split('+');
      for(let i = 0; i < strFoodObjects.length;i++){
        if(strFoodObjects[i] != ''){
          let currentFood = JSON.parse(strFoodObjects[i]);
          if(food.food_id == currentFood.food_id && food.size == currentFood.size) {
            let tempFood = JSON.parse(strFoodObjects[i]);
            tempFood.quantity++;
            strFoodObjects[i] = JSON.stringify(tempFood);
          }
        }
      }

    getFoods = strFoodObjects.join('+');
    sessionStorage.setItem('foods', getFoods);
  }

  /**
   * it is called by removeElement
   * receive param which type is StoredFood
   * check the index where same the food_id and remove the object
   * after store it into storage
   * */
  removeAllFromCart(food: StoredFoods){
    let strFoodObjects = sessionStorage.getItem('foods').split('+');
    let index: number;
    for(let i = 0; i < strFoodObjects.length;i++){
      if(strFoodObjects[i] != '') {
        let currentFood = JSON.parse(strFoodObjects[i]);
        if (food.food_id == currentFood.food_id && food.size == currentFood.size) {
          strFoodObjects.splice(i,1);
        }
      }
    }
    sessionStorage.setItem('foods',strFoodObjects.join('+'));
  }


  /**
   * remove all item from the cart
   * */
  emptyCart(){
    sessionStorage.setItem('foods',[''].toString().trim());
  }


  /**
   * get food return all foods which are stored into sessionStorage
   * and all of this push into array which type is StoredFoods
   * */
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
