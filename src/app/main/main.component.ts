import { Component, OnInit } from '@angular/core';
import {SessionService} from "../session.service";
import {Users} from "../interfaces/user.interface";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  user: Users;

  /**
   * check user logged in when enter the page
   * */
  constructor(public sessionService: SessionService) {
    this.user = this.sessionService.getUser();
  }

  ngOnInit() {

  }

  showUser(){
    console.log(this.user);
  }

}
