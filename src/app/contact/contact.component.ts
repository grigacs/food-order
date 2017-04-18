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
