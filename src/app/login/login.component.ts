import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {GetUserService} from "../getdata/getuser.service";
import {Users} from "../interfaces/user.interface";
import {SessionService} from "../session.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [GetUserService]
})
export class LoginComponent implements OnInit {

  existUser: boolean;
  user: Users[];
  loggedIn: boolean;
  errorMessage: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private getUserService: GetUserService,
              public sessionService: SessionService) {

    this.loggedIn = false;
  }

  ngOnInit() {
  }


  login(form: NgForm) {


    if (!form.valid) {
      if(form.value.username == "" || form.value.password == "")
        this.errorMessage = "All fields must be filled out!";
      else if(form.value.password.length < 8)
        this.errorMessage = "Minimum length of password is 8 character";
      else if(form.value.username.length < 4)
        this.errorMessage = "Minimum length of username is 4 character";
      this.existUser = false;
      return;
    }

    this.getUserService.getUsers().subscribe(
      user => {
        this.user = this.getUserService.login(user, form.value.username, form.value.password)
        if (this.user != null) {
          this.errorMessage = null;
          this.existUser = true;
          this.loggedIn = true;
          this.sessionService.setUser(this.user);
          this.sessionService.setLoggedIn(true);
        } else {
          this.existUser = false;
          this.errorMessage = "Wrong username or password!"
          return;
        }
      },
      () => this.router.navigate([this.route])
    );
  }


  logout() {
    this.loggedIn = false;
    this.existUser = null;
    this.user = [];
    this.sessionService.setUser(null);
    this.sessionService.setLoggedIn(false);
  }

}
