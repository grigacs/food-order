import { Component, OnInit } from '@angular/core';
import {Foods} from "../interfaces/food.interface";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  foods: Array<Foods> = [];

  constructor() { }


  ngOnInit() {

  }
}
