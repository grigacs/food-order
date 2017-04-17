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
  guests_orders: GuestsOrders;

  constructor(private http: Http) {
  }

  insertUser(user: Users) : Observable<string> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.result = this.http.post('http://localhost:8100/', JSON.stringify(user), {
      headers: headers
    })
      .map(res => res.text());

    return this.result;
  }

  insertUsersOrders(order: Array<StoredFoods>, userId: number): Observable<string>{
      this.foodIds = [];
      this.foodQueantites = [];

      for(let i = 0; i < order.length; i++){
        let foodId: number = order[i].food_id;
        let quantity: number = order[i].quantity;
        this.foodIds.push(foodId);
        this.foodQueantites.push(quantity);
      }
      console.log(this.foodIds + ' ' + userId);
      this.users_orders = {user_id: userId, food_ids: this.foodIds, food_quantities:this.foodQueantites, delivered: false};

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.result = this.http.post('http://localhost:8100/users_orders', JSON.stringify(this.users_orders), {
      headers: headers
    })
      .map(res => res.text());

    return this.result;
  }

  insertGuestsOrders(order: Array<StoredFoods>,firstname: string,
                    lastname: string, mail: string, address:string, mobile: string): Observable<string>{
    this.foodIds = [];
    this.foodQueantites = [];

    for(let i = 0; i < order.length; i++){
      let foodId = order[i].food_id;
      let quantity: number = order[i].quantity;
      this.foodIds.push(foodId);
      this.foodQueantites.push(quantity);
    }

    this.guests_orders = {first_name: firstname, last_name: lastname,
                          mail: mail, address: address, mobile:mobile,
                          food_ids: this.foodIds, food_quantities:this.foodQueantites, delivered: false};


    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.result = this.http.post('http://localhost:8100/guests_orders', JSON.stringify(this.guests_orders), {
      headers: headers
    })
      .map(res => res.text());

    return this.result;
  }

}
