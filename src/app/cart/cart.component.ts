import {Component, OnInit, ElementRef} from '@angular/core';
import { Orders } from "../interfaces/order.interface";
import {SessionService} from "../session.service";
import {Foods} from "../interfaces/food.interface";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  host: {
    '(document:click)': 'collapseClose($event)',
  },

})
export class CartComponent implements OnInit {

  foods: Array<Foods> = [];

  orders: Orders[];
  public isCollapsed:boolean = true;

  constructor(private elementRef: ElementRef,
              private sessionService: SessionService) { }

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
      console.log(this.foods);
  }




}
