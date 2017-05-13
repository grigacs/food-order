import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {UsersOrders} from "../interfaces/user-orders.interface";
import {Http} from "@angular/http";

@Injectable()
export class GetMyOrdersService {

  jsondata: Object;
  result : Observable<UsersOrders[]>;
  usersOrders: UsersOrders[];



  constructor(private http: Http) { }

  getOrders(): Observable<UsersOrders[]>{
    this.result = this.http.get('http://localhost:8100/database')
      .map(res => res.json())
      .map(jsondata => this. jsondata = jsondata.database)
      .map(foods => this.usersOrders = foods.users_orders);
    return this.result;
  }

  getMyOrder(user_id: number, orders: UsersOrders[]): UsersOrders[]{
    let myOrders = [];
    for(let i = 0; i < orders.length; i++){
      if(orders[i].user_id === user_id){
        myOrders.push(orders[i]);
      }
    }
    return myOrders;
  }






}
