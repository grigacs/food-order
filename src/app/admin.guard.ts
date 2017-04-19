import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SessionService } from './session.service';


@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router){}

  /** Created by Richard Asztalos
   *   This guard helps to defend the admin route.
   *   It checks if the user is logged in.
   *   If it is then checks the session and decides if the user is admin or not.
   *   If the user is a normal user or a guest (not logged in) then will get an error page.
   *   If admin, then will be redirected to the admin page.
   */

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(this.sessionService.isLoggedIn() === false){
          this.router.navigate(['/page-not-found']);
          return true;
        }

        if(this.sessionService.getUser().username === 'admin'){
            return this.sessionService.isLoggedIn();
        }else{
          this.router.navigate(['/page-not-found']);
          return false;
        }

        }
  }

