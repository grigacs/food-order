import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FoodOrderComponent } from './food-order/food-order.component';
import { MainComponent } from './main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from './login/login.component';
import { SessionService } from "./session.service";
import { CartComponent } from './cart/cart.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselModule } from "ngx-bootstrap";
import { ModalModule } from 'ngx-bootstrap/modal';


const appRoutes: Routes = [
    { path: '', component: MainComponent},
    { path: 'contact', component: ContactComponent },
    { path: 'main', component: MainComponent },
    { path: 'order', component: FoodOrderComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', component: PageNotFoundComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    PageNotFoundComponent,
    FoodOrderComponent,
    MainComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    CartComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    CarouselModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [SessionService],
  bootstrap: [AppComponent]
})
export class AppModule {}
