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

  /**
   * Return Observable who contains Users array , the structure is in the Users interface
   * With http get we get the json from server
   * map from database.json into the user array
   * */
  getUsers(): Observable<Users[]>{

   this.result = this.http.get('http://localhost:8100/database')
      .map(res => res.json())
      .map(database => this.database = database.database)
      .map(data => this.data = data.users)
      .map(users => this.users = users);

    return this.result;
  }


  /**
   * get the last id from users , for register , if register a new user must increment the last id and because it is need to be unique
   * */
  getLastId(users: Users[]) : number{
    for(let i = 0;i < users.length;i++){
        this.id = users[i].user_id;
    }
    return this.id;
  }


  /**
   * at the login we need to check exist this user with this username and password or not
   * if exist return user Object
   * else return null
   * */
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
