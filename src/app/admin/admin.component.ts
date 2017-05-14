import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router , ActivatedRoute } from '@angular/router';
import { GetUserService } from './../getdata/getuser.service';
import { SessionService } from './../session.service';
import { Users } from './../interfaces/user.interface';
import { GuestsOrders } from '../interfaces/guest-orders.interface';
import { AdminGuard } from './../admin.guard';
import { GetOrdersService } from './../getdata/getorders.service';
import { UsersOrders } from './../interfaces/user-orders.interface';
import {GetfoodService} from '../getdata/getfood.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [GetUserService, GetOrdersService, SessionService, AdminGuard, GetfoodService]
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
  pizzaProps = [];
  pizzaGuestProps = [];
  totalPrice = [];
  date = [];
  delivered = [];
  username: string;

    constructor(private http: Http,
                private getUserService: GetUserService,
                private getOrdersService: GetOrdersService,
                private getFoodService: GetfoodService,
                private router: Router,
                private sessionService: SessionService) {
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
