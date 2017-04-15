import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CommunicationService} from "../communication.service";
import {Users} from "../interfaces/user.interface";
import {GetUserService} from "../getdata/getuser.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [CommunicationService, GetUserService]
})
export class RegisterComponent implements OnInit {

  errorMessage: string;
  uErrorMessage: string;
  passErrorMessage: string;
  error: boolean;
  uError: boolean;
  passError: boolean;
  existUser: boolean;
  lastId: number;
  user: Users;
  response: string;
  insertedUser: boolean

  constructor(private communicationService: CommunicationService,
              private getUserService: GetUserService) {
  }

  ngOnInit() {
  }

  register(form: NgForm) {
    this.error = false;
    this.uError = false;
    this.passError = false;

    if (!form.valid) {

      if (form.value.firstname == '' ||
        form.value.lastname == '' ||
        form.value.username == '' ||
        form.value.password == '' ||
        form.value.mail == '' ||
        form.value.address == '') {
        this.error = true;
        this.errorMessage = 'All fields must be filled out!';
      } else if (form.value.username.length < 4 || form.value.password.length < 8) {
        if (form.value.username.length < 4) {
          this.uError = true;
          this.uErrorMessage = "Minimum length of username is 4 character";
        }
        if (form.value.password.length < 8) {
          this.passError = true;
          this.passErrorMessage = "Minimum length of password is 8 character";
        }
      }
      return;
    }

    this.getUserService.getUsers().subscribe(
      users => {
        this.existUser = false;
        this.lastId = this.getUserService.getLastId(users);
        for (let i = 0; i < users.length; i++) {
          if (users[i].username == form.value.username) {
            this.existUser = true;
          }
        }
      },
      error => console.log(error),
      () => {
        console.log(this.existUser);
        if (this.existUser == true) {
          this.uError = true;
          this.uErrorMessage = "Username already exist!";
          return;
        } else {
          this.insertedUser = false;

          this.user = {
            "user_id": ++this.lastId,
            "firstname": form.value.firstname.trim(),
            "lastname": form.value.lastname.trim(),
            "username": form.value.username.trim(),
            "password": form.value.password.trim(),
            "address": form.value.address.trim(),
            "email": form.value.mail.trim()
          };

          this.communicationService.insertUser(this.user)
            .subscribe(
              response => {
                this.insertedUser = true;
                this.response = response;
                console.log(response)
              },
              error => console.log(error),
              () => {}
            );
        }
      }
    );

  }

}
