import { Component, OnInit } from '@angular/core';
import {Foods} from "../interfaces/food.interface";
import {SessionService} from "../session.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: []
})
export class HeaderComponent implements OnInit {

  foods: Array<Foods> = [];

  constructor(public sessionService: SessionService) {

  }


  ngOnInit() {

  }
}
