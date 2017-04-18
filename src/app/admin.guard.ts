import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SessionService } from './session.service';


@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router){}

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

