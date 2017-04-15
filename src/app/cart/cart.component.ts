import {Component, OnInit, ElementRef} from '@angular/core';
import { Orders } from "../interfaces/order.interface";
import {SessionService} from "../session.service";
import {StoredFoods} from "../interfaces/stored-food.interface";
import {CommunicationService} from "../communication.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [CommunicationService]
})
export class CartComponent implements OnInit {

  foods: Array<StoredFoods> = [];

  orders: Orders[];
  public isCollapsed:boolean = true;
  public quantity: number;
  public totalPrice: number;

  constructor(private elementRef: ElementRef,
              private sessionService: SessionService,
              private communicationService: CommunicationService) { }

  ngOnInit() {}




  public collapsed(event:any):void {
    //console.log(event);
  }

  public expanded(event:any):void {
    //console.log(event);
  }

  collapseClose(){
    if(!this.elementRef.nativeElement.contains(event.target))
      if(!this.isCollapsed)
        this.isCollapsed = true;
  }

  refreshCart(){
      this.foods = this.sessionService.getFoods();
      this.setPrice(this.foods);
      console.log(this.foods);

  }

  setPrice(foods: Array<StoredFoods>): number{
    let multiply = 0;
    let price = 0;
    this.totalPrice = 0;
    for(let i = 0; i <foods.length; i++){
      if(foods[i].size == 'small')
        multiply = 1;
      if(foods[i].size == 'medium')
        multiply = 1.5;
      if(foods[i].size == 'big')
        multiply = 2.2;
      price = foods[i].basic_price * multiply * foods[i].quantity;
      console.log(price);
      this.totalPrice += price;
    }
    return this.totalPrice;
  }

  removeElement(food: StoredFoods){
    this.sessionService.removeAllFromCart(food);
    this.foods = this.sessionService.getFoods();
    this.totalPrice = this.setPrice(this.foods);
  }

  get counter() {
    return this.quantity;
  }

  set counter(quantity: number) {
    this.quantity = quantity;
  }

  decrement(food: StoredFoods) {
    this.sessionService.removeFromCart(food);
    this.foods = this.sessionService.getFoods();
    this.totalPrice = this.setPrice(this.foods);
  }

  increment(food: StoredFoods) {
    this.sessionService.addMoreToCart(food);
    this.foods = this.sessionService.getFoods();
    this.totalPrice = this.setPrice(this.foods);
  }


  insertOrder(){
    //this.communicationService.insertOrder(this.foods)
  }



}
