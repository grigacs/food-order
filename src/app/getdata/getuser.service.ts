import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Users} from "../interfaces/user.interface";
import {Observable} from "rxjs";

@Injectable()
export class GetUserService {

  constructor(private http: Http) { }

  data: Object;
  users: Object;
  user: Users[];
  result: Observable<Users[]>;

  getUsers(): Observable<Users[]>{

   this.result = this.http.get('assets/database/database.json')
      .map(res => res.json())
      .map(data => this.data = data.database)
      .map(users => this.users = users.users)
      .map(user => this.user = user);

    return this.result;
  }


  login(users, username, password) : Users[]{
    for(let i = 0;i < users.length;i++){
      if(username == users[i].username && users[i].password == password){
        return users[i];
      }
    }
    return null;
  }
}
