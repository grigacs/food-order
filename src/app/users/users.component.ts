import { Component, OnInit } from '@angular/core';
import {GetUserService} from "../getdata/getuser.service";
import {Users} from "../interfaces/user.interface";



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['../admin/admin.component.scss'],
   providers: [GetUserService]
})
export class UsersComponent implements OnInit {
   /**  Created by Richard Asztalos
   *    This component helps to listing out all of the users from the database.
   *    Only available after admin logged in.
   */
  users: Users[];

  constructor(private getUserService: GetUserService) {
        this.getUserService.getUsers().subscribe(users => this.users = users);
    }

  ngOnInit() {
  }

}
