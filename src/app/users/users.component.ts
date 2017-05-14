import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router , ActivatedRoute } from '@angular/router';
import { GetUserService } from './../getdata/getuser.service';
import { SessionService } from './../session.service';
import { Users } from './../interfaces/user.interface';
import { AdminGuard } from './../admin.guard';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['../admin/admin.component.scss'],
   providers: [GetUserService, SessionService, AdminGuard]
})
export class UsersComponent implements OnInit {
   /**  Created by Richard Asztalos
   *    This component helps to listing out all of the users from the database.
   *    Only available after admin logged in.
   */
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
