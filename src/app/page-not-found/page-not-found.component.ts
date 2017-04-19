import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  /** Created by Richard Asztalos
   *  This component has only that function if the URL has been manipulated then it will return with a 404 error page.
   */

  constructor(private router: Router) {

  }

  ngOnInit() {
  }

}
