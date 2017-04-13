import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @HostBinding('class') class = 'contact';

  public contactForm = this.contactFormBuilder.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    problem: ['', Validators.required],
    email: ['', Validators.required]
  });

  constructor(private router: Router, public contactFormBuilder: FormBuilder) { }

    contact(event) {
      console.log(event);
      console.log(this.contactForm.value);
     // let data = this.contactForm.value;
    //  let email = this.contactForm.controls.email.value;
    }

  ngOnInit() {
  }

}
