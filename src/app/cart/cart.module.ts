import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartComponent} from "./cart.component";
import {CartService} from "../cart.service";
import { CollapseModule } from 'ngx-bootstrap/collapse';
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    CollapseModule,
    FormsModule,
  ],
  declarations: [
    CartComponent,
  ],
  providers: [
    CartService
  ],
  exports:[
    CartComponent,
    CollapseModule,
  ]
})
export class CartModule { }
