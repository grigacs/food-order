import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @HostBinding('class') class = 'contact';

    /**  Created by Richard Asztalos
     *           This component validates the form which has been sent from the HTML.
     *           Component can be used as a guest or admin or normal user. 
     *           After submitting the form it checks whether the incoming data is correct or not and sends back a message.
     *           If it is not, then errorMessage will show up, else form will be submitted.
     *           It also has a function which redirects the user to the main page when he/she is done.
    */

  errorMessage: string;
  first_name: string;
  last_name: string;
  problem: string;
  email: string;
  checked: boolean;

  constructor(private router: Router) { }

  contact(form: NgForm){
     if (!form.valid) {
        if(form.value.first_name == '' || form.value.last_name == '' || form.value.problem == '' || form.value.email == ''){
          this.errorMessage = 'All fields must be filled out!';
          this.checked = false;
        }
        return;
     }else{
       this.errorMessage = '';
       this.first_name = form.value.first_name;
       this.last_name = form.value.last_name;
       this.problem = form.value.problem;
       this.email = form.value.email;
       this.checked = true;
       console.log(this.first_name + ' ' + this.last_name + ' ' + this.problem + ' ' + this.email);
     }
  }

  redirect() {
    this.router.navigate(['/main']);
  }

  ngOnInit() {
  }

}
