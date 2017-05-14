import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from '../users/users.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../admin.guard';
import { ModuleWithProviders } from '@angular/core';

const appRoutes: Routes = [
  { path: 'users', component: UsersComponent, canActivate: [AdminGuard] }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
   /**  Created by Richard Asztalos
   *    This lazy module helps to define the Users component, we can call through it.
   */
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [UsersComponent]
})

export class LazyModule { }
