import { Injectable } from '@angular/core';
import { UsersOrders } from '../interfaces/user-orders.interface';
import { GuestsOrders } from '../interfaces/guest-orders.interface';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';

@Injectable()
export class GetOrdersService {

    /** Created by Richard Asztalos
     *           This service helps to the admin component to list out the stored orders.
     *           It connects to the database (which is on the server - at localhost:8100).
     *           After it returns an Observable with the orders and map the result into an Order array.
     *           There are 2 methods: One for the users' orders and another for guests' orders.
    */
  constructor(private http: Http) { }


  users_orders: Object;
  result: Observable<UsersOrders[]>;
  database: Object;
  orders: UsersOrders[];

  guests_orders: Object;
  results: Observable<GuestsOrders[]>;
  gorders: GuestsOrders[];

  getUserOrders(): Observable<UsersOrders[]> {

    this.result = this.http.get('http://localhost:8100/database')
      .map(res => res.json())
      .map(database => this.database = database.database)
      .map(users_orders => this.users_orders = users_orders.users_orders)
      .map(orders => this.orders = orders);
    return this.result;
  }


   getGuestOrders(): Observable<GuestsOrders[]>{

   this.results = this.http.get('http://localhost:8100/database')
      .map(res => res.json())
      .map(database => this.database = database.database)
      .map(guests_orders => this.guests_orders = guests_orders.guests_orders)
      .map(gorders => this.gorders = gorders);
    return this.results;
  }



}
