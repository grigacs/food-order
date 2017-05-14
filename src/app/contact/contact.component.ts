import { Component, OnInit, HostBinding} from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CapitalizePipe} from '../capitalize.pipe';
import { Observable } from 'rxjs/Observable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [

        trigger('focusPanel', [
            state('inactive', style({
                transform: 'translateX(-100%) scale(0) translateY(-150%)'
            })),
            state('active', style({
                transform: 'scaleX(1.2) scaleY(1.2) translateY(20%)'
            })),
            transition('inactive => active', [animate('1000ms ease-in'), style({transform: 'translateX(100%) translateY(20%)'})]),
            transition('active => inactive', animate('400ms ease-out'))
        ])
  ]
})
export class ContactComponent implements OnInit {
  @HostBinding('class') class = 'contact';

    /**  Created by Richard Asztalos
     *           This component validates the form which has been sent from the HTML.
     *           Component can be used as a guest or admin or normal user.
     *           After submitting the form it checks whether the incoming data is correct or not and sends back a message.
     *           If it is not, then errorMessage will show up, else form will be submitted.
     *           It also has a function which redirects the user to the main page when he/she is done.
     *           First name and last name use capitalize custom pipe.
     *           There's a time Observable which shows the current date, in the template it is used to transform with a pipe.
    */

  errorMessage: string;
  first_name: string;
  last_name: string;
  problem: string;
  email: string;
  checked: boolean;
  time: Observable<Date>;
  error: boolean = false;


  state: string = 'inactive';

    toggleMove() {
        this.state = (this.state === 'inactive' ? 'active' : 'inactive');
    }

  constructor(private router: Router) { }

  contact(form: NgForm){
     if (!form.valid) {
        if(form.value.first_name == '' || form.value.last_name == '' || form.value.problem == '' || form.value.email == ''){
          this.error = true;
          this.errorMessage = 'All fields must be filled out!';
          this.checked = false;
        }
        return;
     }else{
       this.errorMessage = '';
       this.error = false;
       this.first_name = form.value.first_name;
       this.last_name = form.value.last_name;
       this.problem = form.value.problem;
       this.email = form.value.email;
       this.checked = true;
       this.time = Observable.interval(1).map(x => new Date());
     }
  }

  redirect() {
    this.router.navigate(['/main']);
  }

  ngOnInit() {
  }

}
