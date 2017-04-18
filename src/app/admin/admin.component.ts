import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router , ActivatedRoute } from '@angular/router';
import { GetUserService } from './../getdata/getuser.service';
import { SessionService } from './../session.service';
import { Users } from './../interfaces/user.interface';
import { AdminGuard } from './../admin.guard';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [GetUserService, SessionService, AdminGuard]
})
export class AdminComponent implements OnInit {

  users: Users[];

    constructor(private http: Http,
                private getUserService: GetUserService,
                private router: Router,
                private sessionService: SessionService) {
        this.getUserService.getUsers().subscribe(users => this.users = users);
      }

  ngOnInit() {
  }

}
