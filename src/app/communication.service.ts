import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Users} from "./interfaces/user.interface";
import {Observable} from "rxjs";
import {StoredFoods} from "./interfaces/stored-food.interface";
import {UsersOrders} from "./interfaces/user-orders.interface";
import {GuestsOrders} from "./interfaces/guest-orders.interface";


@Injectable()
export class CommunicationService {

  result: Observable<string>;
  users_orders: UsersOrders;
  foodIds: Array<number>;
  foodQueantites: Array<number>;
  foodSizes: Array<string>;
  guests_orders: GuestsOrders;
  date: string;

  constructor(private http: Http) {
  }


  /**
   * @param user
   * @returns {Observable<string>}
   *
   * registration
   * we send user object stringify to the server for processing and after insert to database
   */
  insertUser(user: Users) : Observable<string> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.result = this.http.post('http://localhost:8100/', JSON.stringify(user), {
      headers: headers
    })
      .map(res => res.text());

    return this.result;
  }

  dateFormatNow(): string  {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = parseInt('0') + dd;
    }
    if (mm < 10) {
      mm = parseInt('0') + mm;
    }
    return  yyyy + "." + mm + "." + dd + ".";
  }
  /**
   * insert UserOrders
   * we send UsersOrders object stringify to the server for processing and after insert to database
   * save user_id food_ids (because can multiple food order) , quantities of foods and delivered false (it means ordered but not finished yet)
   */
  insertUsersOrders(order: Array<StoredFoods>, userId: number, totalPrice: number): Observable<string>{
      this.foodIds = [];
      this.foodQueantites = [];
      this.foodSizes = [];
      this.date = this.dateFormatNow();
      for(let i = 0; i < order.length; i++){
        let foodId: number = order[i].food_id;
        let quantity: number = order[i].quantity;
        let size: string = order[i].size;
        this.foodIds.push(foodId);
        this.foodQueantites.push(quantity);
        this.foodSizes.push(size);
      }
      this.users_orders = {user_id: userId, food_ids: this.foodIds, food_quantities:this.foodQueantites, food_sizes:this.foodSizes, delivered: false, totalPrice:totalPrice,date: this.date};

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.result = this.http.post('http://localhost:8100/users_orders', JSON.stringify(this.users_orders), {
      headers: headers
    })
      .map(res => res.text());

    return this.result;
  }

  /**
   * insert UserOrders
   * we send UsersOrders object stringify to the server for processing and after insert to database
   * save user information from form, food_ids (because can multiple food order) , quantities of foods and delivered false (it means ordered but not finished yet)
   */
  insertGuestsOrders(order: Array<StoredFoods>,firstname: string,
                    lastname: string, mail: string, address:string, totalPrice: number): Observable<string>{
    this.foodIds = [];
    this.foodQueantites = [];
    this.foodSizes = [];
    this.date = this.dateFormatNow();
    for(let i = 0; i < order.length; i++){
      let foodId = order[i].food_id;
      let quantity: number = order[i].quantity;
      let size: string = order[i].size;
      this.foodIds.push(foodId);
      this.foodQueantites.push(quantity);
      this.foodSizes.push(size);

    }

    this.guests_orders = {first_name: firstname, last_name: lastname,
                          mail: mail, address: address,
                          food_ids: this.foodIds, food_quantities:this.foodQueantites,
                          food_sizes:this.foodSizes, delivered: false, totalPrice: totalPrice};

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.result = this.http.post('http://localhost:8100/guests_orders', JSON.stringify(this.guests_orders), {
      headers: headers
    })
      .map(res => res.text());
    return this.result;
  }

}
