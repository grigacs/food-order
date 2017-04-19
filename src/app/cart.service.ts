import { Injectable } from '@angular/core';
import {SessionService} from "./session.service";
import {Foods} from "./interfaces/food.interface";
import {StoredFoods} from "./interfaces/stored-food.interface";
import {Observable} from "rxjs";

@Injectable()
export class CartService {

  food: Array<StoredFoods>;
  currentFood: StoredFoods ;


  constructor(private sessionService: SessionService) { }


  refreshCart(): Observable<StoredFoods> {
    let observable = new Observable(() => {
      this.sessionService.getFoods()
        .map(food => this.currentFood = food)
    });

    return observable;
  }

}
