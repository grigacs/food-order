import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Users} from "./interfaces/user.interface";
import {Observable} from "rxjs";

@Injectable()
export class CommunicationService {

  result: Observable<string>;

  constructor(private http: Http) {

  }

  insertUser(user: Users) : Observable<string> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.result = this.http.post('http://localhost:8100/', JSON.stringify(user), {
      headers: headers
    })
      .map(res => res.text());

    return this.result;
  }

}
