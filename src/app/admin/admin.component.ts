import { Component, OnInit } from '@angular/core';

import {GetfoodService} from '../getdata/getfood.service';
import {GetUserService} from "../getdata/getuser.service";
import {GetOrdersService} from "../getdata/getorders.service";
import {AdminGuard} from "../admin.guard";
import {Users} from "../interfaces/user.interface";
import {UsersOrders} from "../interfaces/user-orders.interface";
import {GuestsOrders} from "../interfaces/guest-orders.interface";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [GetUserService, GetOrdersService, AdminGuard, GetfoodService]
})
export class AdminComponent implements OnInit {

  /** Created by Richard Asztalos, associated with Gergely Der (orders listing)
   *           Users which are stored in database will be listed by admin.
   *           This component helps to create admin menu (here we need to subscribe to list users, and orders (guest and user orders)).
   *           Admin route has been guarded by AdminGuard.
  */

  users: Users[];
  usersOrders: UsersOrders[];
  guestsOrders: GuestsOrders[];
  usersProp: Users[] = [];
  pizzaProps: Array<any> = [];
  pizzaGuestProps: Array<any> = [];
  totalPrice: Array<any> = [];
  date: Array<any> = [];
  delivered: Array<any> = [];
  username: string;

    constructor(private getUserService: GetUserService,
                private getOrdersService: GetOrdersService,
                private getFoodService: GetfoodService) {
        this.getUserService.getUsers().subscribe(users => this.users = users);
    }

  ngOnInit() {

    this.getOrdersService.getUserOrders().subscribe(usersOrders => this.usersOrders = usersOrders,
      error => { console.log(error)},
      () => {

        this.getFoodService.getFoods().subscribe(
          foods => {
            for (let i = 0; i < this.usersOrders.length; i++) {
              this.pizzaProps[i] = [];
              for(let j = 0; j < this.usersOrders[i].food_ids.length; j++) {
                let pizza = this.getFoodService.getFoodsById(this.usersOrders[i].food_ids[j], foods);
                this.pizzaProps[i].push(pizza.name + ' x' + this.usersOrders[i].food_quantities[j] + ' ' + this.usersOrders[i].food_sizes[j]);
              }
            }
          },
          error => {console.log(error)},
          () => {}
        );


        this.getUserService.getUsers().subscribe(users => {
            for (let i = 0; i < this.usersOrders.length; i++) {
              this.usersProp.push(this.getUserService.getUserById(users, this.usersOrders[i].user_id));
            }
          },
          error => {console.log(error)},
          () => {}
        );
      }
    );
    this.getOrdersService.getGuestOrders().subscribe(guestsOrders =>
    {this.guestsOrders = guestsOrders},
      error => {console.log(error)},
      () => {
        this.getFoodService.getFoods().subscribe(
          foods => {
            for (let i = 0; i < this.guestsOrders.length; i++) {
              this.pizzaGuestProps[i] = [];
              for(let j = 0; j < this.guestsOrders[i].food_ids.length; j++) {
                let pizza = this.getFoodService.getFoodsById(this.guestsOrders[i].food_ids[j], foods);
                this.pizzaGuestProps[i].push(pizza.name + ' x' + this.guestsOrders[i].food_quantities[j] + ' ' + this.guestsOrders[i].food_sizes[j])
              }
            }
          },
          error => {console.log(error)},
          () => {}
        );
      }
    );
  }

}
