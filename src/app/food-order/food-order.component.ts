import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { GetfoodService } from '../getdata/getfood.service';
import { Foods } from './../interfaces/food.interface';

@Component({
  selector: 'app-food-order',
  templateUrl: './food-order.component.html',
  styleUrls: ['./food-order.component.scss'],
  providers: [GetfoodService]
})

export class FoodOrderComponent implements OnInit {

  food: Foods[];

    constructor(private http: Http, private getfoodService: GetfoodService, private router: Router) {
        this.getfoodService.getFoods().subscribe(food => this.food = food);
      }

  ngOnInit() {

  }
}
