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

  /**  Created by Richard Asztalos
   *   Here we can check if the user is logged in when enter the page. (session)
   */
  constructor(public sessionService: SessionService) {
    this.user = this.sessionService.getUser();
  }

  ngOnInit() {

  }
}
