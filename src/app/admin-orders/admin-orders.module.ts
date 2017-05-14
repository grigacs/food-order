import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOrdersComponent } from './admin-orders.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../admin.guard';
import { ModuleWithProviders } from '@angular/core';

const appRoutes: Routes = [
  { path: 'admin-orders', component: AdminOrdersComponent, canActivate: [AdminGuard] }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
   /**  Created by Richard Asztalos
   *    This module helps to define the AdminOrders component, we can call through it. 
   */

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [AdminOrdersComponent]
})
export class AdminOrdersModule { }
