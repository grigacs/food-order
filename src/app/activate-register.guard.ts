import { Injectable } from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {SessionService} from "./session.service";
import {Observable} from "rxjs";


@Injectable()
export class ActivateRegisterGuard implements CanActivate {

  constructor(private sessionService: SessionService, private router: Router){

  }

  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.sessionService.isLoggedIn()){
        return true;
      }else{
        this.router.navigate(['/main']);
      }
    }
}
