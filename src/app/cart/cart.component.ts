import {Component, OnInit, ElementRef} from '@angular/core';
import {SessionService} from "../session.service";
import {StoredFoods} from "../interfaces/stored-food.interface";
import {CommunicationService} from "../communication.service";
import {Users} from "../interfaces/user.interface";
import {NgForm} from "@angular/forms";
import {Subject} from "rxjs";


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

  constructor(private sessionService: SessionService,
              private communicationService: CommunicationService,
              private elementRef: ElementRef) {


  }

  ngOnInit() {}




  public collapsed(event:any):void {
    console.log(event);
  }

  public expanded(event:any):void {
    console.log(event);
  }

  Close(event:any){
    const hostElem = this.elementRef.nativeElement;
    console.log(hostElem.children);
    if(!hostElem.children){
      this.isCollapsed = !this.isCollapsed;
    }
  }

  // show foods at cart which are stored at sessionStorage
  refreshCart(){
      this.foods = this.sessionService.getFoods();
      this.setPrice(this.foods);
      console.log(this.foods);
  }

  /** receive an array which hold type of StoredFoods items , StoredFood is an object (you can see the structure at StoredFood interface)
   *
   * @param foods
   * @returns {number}
   *
   * food price depends from size , TotalPrice equals all stored foods price
   */
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

  /**
   * receive an Object which type is StoredFood , all that type of food remove from cart
   * and store to this.foods
   * after again calculate TotalPrice and save this.totalPrice
   * */
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


  /**
   * receive an Object which type is StoredFood , and decrement decrement the quantity from this type of food
   * and store to this.foods
   * after again calculate TotalPrice and save this.totalPrice
   * */
  decrement(food: StoredFoods) {
    this.sessionService.removeFromCart(food);
    this.foods = this.sessionService.getFoods();
    this.totalPrice = this.setPrice(this.foods);
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
          this.successOrder = false;
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
  insertGuestOrder(form: NgForm, lgModal) {
    this.error = false;

    if (!form.valid) {

      if (form.value.firstname == '' ||
        form.value.lastname == '' ||
        form.value.mail == '' ||
        form.value.address == '' ||
        form.value.mobile == '') {
        this.error = true;
        this.errorMessage = 'All fields must be filled out!';
      }
      return;
    }


    this.communicationService.insertGuestsOrders(this.foods,form.value.firstname,
                                                 form.value.lastname, form.value.mail,
                                                  form.value.address, form.value.mobile, this.totalPrice)
      .subscribe(
        result => {this.orderResult = result},
        error => {console.log(error)},
        () => {
          this.successOrder = true;
          setTimeout(() => {
            lgModal.hide();
            this.orderRequest = false;
            this.sessionService.emptyCart();
            this.successOrder = false;
          },3000)
        }
      )
  }


  refreshMyCart(){
    let subject = new Subject();
  }





}
