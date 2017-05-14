import {Component, OnInit} from '@angular/core';
import {SessionService} from "../session.service";
import {StoredFoods} from "../interfaces/stored-food.interface";
import {CommunicationService} from "../communication.service";
import {Users} from "../interfaces/user.interface";
import {NgForm} from "@angular/forms";
import {of} from "rxjs/observable/of";
import {Observable} from "rxjs";
import {CartService} from "../cart.service";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [CommunicationService]
})
export class CartComponent implements OnInit {

  foods: Array<StoredFoods> = [];

  public isCollapsed:boolean = true;
  public quantity: number;
  public totalPrice: number;
  public userObj: Users;
  public loggedUserId : number;
  public loggedIn: boolean;
  public user: Users;
  public error: boolean;
  public errorMessage: string;
  public orderResult: string;
  public successOrder: boolean;
  public orderRequest: boolean = false;
  public pizzaCount: number;
  public totalCount: number;
  public clickable: boolean = true;
  public shoppingCartItems$:Observable<StoredFoods[]> = of([]);


  constructor(private sessionService: SessionService,
              public cartService: CartService,
              private communicationService: CommunicationService) {
                this.pizzaCount = 0;
                this.totalCount = 0;
    //this.sessionService.itemsInCartSubject.subscribe(foods => {this.foods = foods; console.log(this.foods)});
    this.shoppingCartItems$ = this.cartService.getFoodObservable();

    this.shoppingCartItems$.subscribe(food =>{
      this.foods = food;
      this.setPrice(this.foods);
    });
  }

  ngOnInit() {
    this.refreshCart();
  }

  checkClick(){
    this.clickable = false;
  }

  isClickable() {
    return this.clickable;
  }

  public collapsed(event:any):void {}

  public expanded(event:any):void {}

  Close(event: Event){
    this.isCollapsed = true;
  }

  Add(event: Event){
    //setTimeout(() => {this.foods = this.sessionService.getFoods();},30)
  }

  // show foods at cart which are stored at sessionStorage
  refreshCart(){
      this.foods = this.sessionService.getFoods();
      this.setPrice(this.foods);
  }

  /** receive an array which hold type of StoredFoods items , StoredFood is an object (you can see the structure at StoredFood interface)
   *
   * @param foods
   * @returns {number}
   *
   * food price depends from size , TotalPrice equals all stored foods price
   */
  setPrice(foods: Array<StoredFoods>): number{
    let price = 0;
    this.totalPrice = 0;
    this.totalCount = 0;
    for(let i = 0; i <foods.length; i++){
      price = foods[i].basic_price * foods[i].quantity;
      this.pizzaCount = foods[i].quantity;
      this.totalPrice += price;
      this.totalCount += this.pizzaCount;
    }
    return this.totalPrice;
  }

  /**
   * receive an Object which type is StoredFood , all that type of food remove from cart
   * and store to this.foods
   * after again calculate TotalPrice and save this.totalPrice
   * */
  removeElement(food: StoredFoods){
    this.sessionService.removeAllFromCart(food);
    this.foods = this.sessionService.getFoods();
    this.totalPrice = this.setPrice(this.foods);
    if(this.foods.length == 0){
      this.isCollapsed = !this.isCollapsed;
    }
  }

  get counter() {
    return this.quantity;
  }

  set counter(quantity: number) {
    this.quantity = quantity;
  }


  /**
   * receive an Object which type is StoredFood , and decrement decrement the quantity from this type of food
   * and store to this.foods
   * after again calculate TotalPrice and save this.totalPrice
   * */
  decrement(food: StoredFoods) {
    this.sessionService.removeFromCart(food);
    this.foods = this.sessionService.getFoods();
    this.totalPrice = this.setPrice(this.foods);
    if(this.foods.length == 0){
      this.isCollapsed = !this.isCollapsed;
    }
  }


  /**
   * receive an Object which type is StoredFood , and decrement increment the quantity from this type of food
   * and store to this.foods
   * after again calculate TotalPrice and save this.totalPrice
   * */
  increment(food: StoredFoods) {
    this.sessionService.addMoreToCart(food);
    this.foods = this.sessionService.getFoods();
    this.totalPrice = this.setPrice(this.foods);
  }


  /**
   * get user from session if, null no user logged in
   * */
  isLoggedIn(){
    this.user = this.sessionService.getUser();
    this.loggedIn = this.user != null;
  }


  /**
   * after click checkout orderRequest be true, after the user can confirm his order
   * */
  sendOrderRequest(){
    this.orderRequest = true;
  }

  /**
   * if user canceled order
   * */
  canelOrderRequest(){
    this.orderRequest = false;
  }

  /**
   *  Two way have for order (logged user or guest)
   *  first time get the user from storage and call the function with the cart content and the logged user id
   *
   *  if observable complete: we show information to the user from the result e.q(successful order) and wait three sec
   *  after remove the cart content and close
   * */
  insertUsersOrder() {
    let user: string = sessionStorage.getItem('user');
    this.userObj = JSON.parse(user);
    this.loggedUserId = this.userObj.user_id;
    this.communicationService.insertUsersOrders(this.foods, this.loggedUserId, this.totalPrice).subscribe(
      result => {this.orderResult = result},
      error => {console.log(error)},
      () => {
        this.successOrder = true;
        setTimeout(() => {
          this.isCollapsed = !this.isCollapsed;
          this.orderRequest = false;
          this.sessionService.emptyCart();
          this.totalCount = 0;
          this.successOrder = false;
          this.clickable = true;
        },3000)
      }
    );
  }



  /**
   *  If guest do order
   *  first od all the guest need to add his information in the form
   *  after check the form was valid or not
   *  if valid send the order , show information from result
   *  after remove the cart content and close
   * */
  insertGuestOrder(form: NgForm, lgModal: any) {
    this.error = false;

    if (!form.valid) {

      if (form.value.firstname == '' ||
        form.value.lastname == '' ||
        form.value.mail == '' ||
        form.value.address == '') {
        this.error = true;
        this.errorMessage = 'All fields must be filled out!';
      }
      return;
    }


    this.communicationService.insertGuestsOrders(this.foods,form.value.firstname,
                                                 form.value.lastname, form.value.mail,
                                                  form.value.address, this.totalPrice)
      .subscribe(
        result => {this.orderResult = result; console.log(this.orderResult)},
        error => {console.log(error)},
        () => {
          this.successOrder = true;
          setTimeout(() => {
            lgModal.hide();
            this.orderRequest = false;
            this.sessionService.emptyCart();
            this.totalCount = 0;
            this.successOrder = false;
            this.clickable = true;
          },3000)
        }
      )
  }
}
