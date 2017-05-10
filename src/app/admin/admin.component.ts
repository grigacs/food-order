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


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [GetUserService, GetOrdersService, SessionService, AdminGuard]
})
export class AdminComponent implements OnInit {

  /** Created by Richard Asztalos
   *           Users which are stored in database will be listed by admin.
   *           This component helps to create admin menu (here we need to subscribe to list users, and orders (guest and user orders)).
   *           Admin route has been guarded by AdminGuard.
  */

  users: Users[];
  usersOrders: UsersOrders[];
  guestsOrders: GuestsOrders[];

    constructor(private http: Http,
                private getUserService: GetUserService,
                private getOrdersService: GetOrdersService, 
                private router: Router,
                private sessionService: SessionService) {
        this.getUserService.getUsers().subscribe(users => this.users = users);
        this.getOrdersService.getUserOrders().subscribe(usersOrders => this.usersOrders = usersOrders);
        this.getOrdersService.getGuestOrders().subscribe(guestsOrders => this.guestsOrders = guestsOrders);
    }

  ngOnInit() {

  }

}
