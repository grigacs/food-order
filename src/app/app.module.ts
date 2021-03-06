import { AdminGuard } from './admin.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FoodOrderComponent } from './food-order/food-order.component';
import { MainComponent } from './main/main.component';
import {RouterModule, Routes} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SessionService } from './session.service';
import { CartComponent } from './cart/cart.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CartCollapseComponent } from './cart-collapse/cart-collapse.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AdminComponent } from './admin/admin.component';
import { ClickOutsideDirective } from './click-outside.directive';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { CapitalizePipe } from './capitalize.pipe';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import {ActivateRegisterGuard} from './activate-register.guard';
import { UsersComponent } from './users/users.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import {UsersOrders} from './interfaces/user-orders.interface';
import {CartService} from "./cart.service";
import {RegisterModule} from "./register/register.module";
import {LazyModule} from "./lazy/lazy.module";
import {AdminOrdersModule} from "./admin-orders/admin-orders.module";

  /** Routing has been created by Richard Asztalos
   *  Simple routing for the components. Admin route has a guard (for more details check AdminGuard and AdminComponent)
   */
const appRoutes: Routes = [
    { path: '', component: MainComponent},
    { path: 'contact', component: ContactComponent },
    { path: 'main', component: MainComponent },
    { path: 'order', component: FoodOrderComponent },
    { path: 'my_order', component: MyOrdersComponent, canActivate: [ActivateRegisterGuard] },
    { path: 'register', component: RegisterComponent},
    { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
    //{ path: 'admin-orders', component: AdminOrdersComponent, canActivate: [AdminGuard] },
    { path: 'users', loadChildren: './lazy/lazy.module#LazyModule', canActivate: [AdminGuard] },
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
    LoginComponent,
    CartComponent,
    CarouselComponent,
    CartCollapseComponent,
    AdminComponent,
    ClickOutsideDirective,
    CapitalizePipe,
    MyOrdersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    CarouselModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    CollapseModule,
    ReactiveFormsModule,
    RegisterModule,
    PopoverModule,
    LazyModule,
    AdminOrdersModule,
    BrowserAnimationsModule
  ],
  providers: [SessionService, AdminGuard, ActivateRegisterGuard, CartService],
  bootstrap: [AppComponent]
})
export class AppModule {}
