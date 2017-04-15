import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Users} from "../interfaces/user.interface";
import {Observable} from "rxjs";

@Injectable()
export class GetUserService {

  constructor(private http: Http) { }

  database: Object;
  data: Object;
  users: Users[];
  result: Observable<Users[]>;
  id: number;

  getUsers(): Observable<Users[]>{

   this.result = this.http.get('http://localhost:8100/database')
      .map(res => res.json())
      .map(database => this.database = database.database)
      .map(data => this.data = data.users)
      .map(users => this.users = users);

    return this.result;
  }

  getLastId(users: Users[]) : number{
    for(let i = 0;i < users.length;i++){
        this.id = users[i].user_id;
    }
    return this.id;
  }


  login(users: Users[], username: string, password: string) : Users{
    for(let i = 0;i < users.length;i++){
      if(username == users[i].username && users[i].password == password){
        return users[i];
      }
    }
    return null;
  }

  getUser(users: Users[], username:string) : Users{
    for(let i = 0;i < users.length;i++){
      if(username == users[i].username){
        return users[i];
      }
    }
  }

}
