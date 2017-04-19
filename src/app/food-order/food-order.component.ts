import {Component, OnInit} from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { GetfoodService } from '../getdata/getfood.service';
import { Foods } from './../interfaces/food.interface';
import {SessionService} from "../session.service";
import {StoredFoods} from "../interfaces/stored-food.interface";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-food-order',
  templateUrl: './food-order.component.html',
  styleUrls: ['./food-order.component.scss'],
  providers: [GetfoodService, SessionService]
})

export class FoodOrderComponent implements OnInit {

    /** Created by Richard Asztalos
     *           This component gives back stored foods from database which will be listed.
     *           Cart functions were created by Gergely Der.
    */

  food: Foods[];

  foods: Array<StoredFoods>;
  errorMessage: string;
  error:boolean;

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



  }


  /**
   * receive two parameter first the form second the food object
   * check form is valid or not
   * if form is valid we set the food into session with the quantity value
   * */
  addToCart(form: NgForm, food: Foods){

    if(!form.valid){
      return;
    }

    if(form.value.quantity < 1 || form.value.quantity > 5){
      return;
    }

    this.sessionService.setFood(food, form.value.quantity, form.value.size);
  }

}
