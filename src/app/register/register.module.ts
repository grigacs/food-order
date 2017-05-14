import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisterComponent} from "./register.component";
import {CommunicationService} from "../communication.service";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    RegisterComponent
  ],
  providers:[
    CommunicationService
  ],
  exports:[
    RegisterComponent
  ]
})
export class RegisterModule { }
