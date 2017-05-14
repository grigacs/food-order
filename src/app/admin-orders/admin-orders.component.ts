import { Component, OnInit } from '@angular/core';
import { GetUserService } from './../getdata/getuser.service';
import { SessionService } from './../session.service';
import { Users } from './../interfaces/user.interface';
import { GuestsOrders } from '../interfaces/guest-orders.interface';
import { AdminGuard } from './../admin.guard';
import { GetOrdersService } from './../getdata/getorders.service';
import { UsersOrders } from './../interfaces/user-orders.interface';
import {GetfoodService} from '../getdata/getfood.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['../admin/admin.component.scss'],
  providers: [GetUserService, GetOrdersService, SessionService, AdminGuard, GetfoodService]
})
export class AdminOrdersComponent implements OnInit {
   /**  Created by Gergely Der
   *    This component helps to listing out all of the orders from the database.
   *    Only available after admin logged in.
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

    constructor(
                private getUserService: GetUserService,
                private getOrdersService: GetOrdersService,
                private getFoodService: GetfoodService) {
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
                let pizza = this.getFoodService.getFoodsById(this.usersOrders[i].food_ids[j], foods)
                this.pizzaProps[i].push(pizza.name + ' x' + this.usersOrders[i].food_quantities[j] + ' ' + this.usersOrders[i].food_sizes[j])
              }
            }
          },
          error => {},
          () => {console.log(this.pizzaProps);}
        );


        this.getUserService.getUsers().subscribe(users => {
            for (let i = 0; i < this.usersOrders.length; i++) {
              this.usersProp.push(this.getUserService.getUserById(users, this.usersOrders[i].user_id));
            }
          },
          error => {},
          () => {console.log(this.usersProp)}
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
                let pizza = this.getFoodService.getFoodsById(this.guestsOrders[i].food_ids[j], foods)
                this.pizzaGuestProps[i].push(pizza.name + ' x' + this.guestsOrders[i].food_quantities[j] + ' ' + this.guestsOrders[i].food_sizes[j])
              }
            }
          },
          error => {},
          () => {console.log(this.pizzaGuestProps);}
        );
      }
    );
  }

}
