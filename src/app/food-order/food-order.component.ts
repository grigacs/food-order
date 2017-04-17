import {Component, OnInit} from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { GetfoodService } from '../getdata/getfood.service';
import { Foods } from './../interfaces/food.interface';
import {SessionService} from "../session.service";
import {StoredFoods} from "../interfaces/stored-food.interface";

@Component({
  selector: 'app-food-order',
  templateUrl: './food-order.component.html',
  styleUrls: ['./food-order.component.scss'],
  providers: [GetfoodService, SessionService]
})

export class FoodOrderComponent implements OnInit {

  food: Foods[];

  foods: Array<StoredFoods>;


    constructor(private http: Http,
                private getfoodService: GetfoodService,
                private router: Router,
                private sessionService: SessionService) {
        this.getfoodService.getFoods().subscribe(food => this.food = food);
      }

  ngOnInit() {

  }

  getFromCart(){
      this.foods = this.sessionService.getFoods();
      console.log(this.foods);
  }

  addToCart(food: Foods){
    console.log(food);
    this.sessionService.setFood(food);
  }

}
