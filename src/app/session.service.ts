import { Injectable } from '@angular/core';
import {Users} from "./interfaces/user.interface";

@Injectable()
export class SessionService {

  private loggedIn: boolean = false;
  private user: Users[];

  constructor() { }

  isLoggedIn() :boolean{
    return this.loggedIn;
  }

  setLoggedIn(isLoggedIn: boolean){
    this.loggedIn = isLoggedIn;
  }

  setUser(user: Users[]){
    this.user = user;
  }

  getUser(){
    return this.user;
  }

}
