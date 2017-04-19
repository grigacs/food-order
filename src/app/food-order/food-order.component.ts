import {Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { GetfoodService } from '../getdata/getfood.service';
import { Foods } from './../interfaces/food.interface';
import {SessionService} from "../session.service";
import {StoredFoods} from "../interfaces/stored-food.interface";
import {NgForm} from "@angular/forms";
import {PopoverModule, PopoverConfig} from "ngx-bootstrap";
import {CartService} from "../cart.service";

@Component({
  selector: 'app-food-order',
  templateUrl: './food-order.component.html',
  styleUrls: ['./food-order.component.scss'],
  providers: [GetfoodService, SessionService, PopoverModule, PopoverConfig, CartService]
})

export class FoodOrderComponent implements OnInit {

    /** Created by Richard Asztalos
     *           This component gives back stored foods from database which will be listed.
     *           Cart functions were created by Gergely Der.
    */

  food: Foods[];
  sizes: Array<string> = ['small','medium','big'];


  foods: Array<StoredFoods>;
  price:number;
  currentFood: Foods;
  message: string;


    constructor(private http: Http,
                private getfoodService: GetfoodService,
                private router: Router,
                private sessionService: SessionService,
                private cartService: CartService) {
        this.getfoodService.getFoods().subscribe(food => this.food = food);
        this.price = 1;
      }

  ngOnInit() {

  }

  getFromCart(){
      this.foods = this.sessionService.getFoods();
  }

  onChange(target, id, item, quantity){

    this.getfoodService.getFoods().subscribe(
      food => {
        this.currentFood = this.getfoodService.getCurrentFood(food, id);

        if (quantity != '')
        {
          if (target.value == 'small' && this.currentFood.food_id == id) {
            item.basic_price = (this.currentFood.basic_price * quantity);
          } else if (target.value == 'medium' && this.currentFood.food_id == id) {
            item.basic_price = (this.currentFood.basic_price * 1.5 * quantity);
          } else if (target.value == 'big' && this.currentFood.food_id == id) {
            item.basic_price = (this.currentFood.basic_price * 2.2 * quantity);
          }
        }else{
          if (target.value == 'small' && this.currentFood.food_id == id) {
            item.basic_price = this.currentFood.basic_price;
          } else if (target.value == 'medium' && this.currentFood.food_id == id) {
            item.basic_price = this.currentFood.basic_price * 1.5;
          } else if (target.value == 'big' && this.currentFood.food_id == id) {
            item.basic_price = this.currentFood.basic_price * 2.2;
          }
        }
      }
    );


  }

  /**
   * receive two parameter first the form second the food object
   * check form is valid or not
   * if form is valid we set the food into session with the quantity value
   * */
  addToCart(form: NgForm, food: Foods, pop){

    if(!form.valid){
      this.message = "All field must be filled out!";
      pop.show();
      return;
    }


    if(form.value.quantity < 1 || form.value.quantity > 5){
      form.value.quantity = 1;
      return;
    }

    this.message = "successful added into cart!";

    pop.show();
    this.sessionService.setFood(food, form.value.quantity, form.value.size);

  }


  hide(pop){
    setTimeout(()=>{
      pop.hide();
    },3000)
  }



}
