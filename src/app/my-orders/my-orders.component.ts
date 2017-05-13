import { Component, OnInit } from '@angular/core';
import {SessionService} from "../session.service";
import {GetMyOrdersService} from "../getdata/getmyorders.service";
import {GetfoodService} from "../getdata/getfood.service";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  providers: [SessionService,GetMyOrdersService, GetfoodService]
})
export class MyOrdersComponent implements OnInit {

  private id: number;
  private myOrders = [];
  private myFoods = [];
  private orders = [];
  private totalPrice = [];
  private date = [];
  private delivered = [];

  constructor(private sessionService: SessionService,
              private getMyOrderService: GetMyOrdersService,
              private getFoodService: GetfoodService) {
    this.getOrders();
  }

  ngOnInit() {
  }

  getUserId(): number{
    return this.sessionService.getUser().user_id;
  }

  getOrders(){
    this.id = this.getUserId();
    this.getMyOrderService.getOrders().subscribe(
      myOrders => { this.myOrders = this.getMyOrderService.getMyOrder(this.id, myOrders) },
      error => {console.log(error)},
      () => {
        this.getFoodService.getFoods().subscribe(
          food => {
            for (let i = 0; i < this.myOrders.length; i++) {
              this.orders[i] = [];
              this.totalPrice[i] = [];
              this.date[i] = [];
              this.delivered[i] = [];
              this.totalPrice[i].push(this.myOrders[i].totalPrice);
              this.date[i].push(this.myOrders[i].date);
              this.delivered[i].push(this.myOrders[i].delivered);
              for(let j = 0; j < this.myOrders[i].food_ids.length; j++){
                let pizza_name = this.getFoodService.getCurrentFood(food, this.myOrders[i].food_ids[j]).name;
                this.orders[i].push(pizza_name + ' x' + this.myOrders[i].food_quantities[j] + ' ' + this.myOrders[i].food_sizes[j]);
              }
            }
          },
        error=> console.log(error),
        ()=>  {console.log(this.orders)}
        );
        console.log(this.myOrders); return this.myOrders;  }
    )
  }

}
