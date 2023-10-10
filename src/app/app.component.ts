import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: any = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    middleName: '',
    lastName: '',
    phoneNumber: ''
  };
  isRegistered: boolean = false;
  registrationSuccessful: boolean = false;

  @ViewChild('registrationForm', { static: false }) form!: NgForm;

  constructor(private modalRef: BsModalRef) { }

  ngAfterViewInit() {
  }

  passwordsMatchValidator(): boolean {
    return this.user['password'] === this.user['confirmPassword'];
  }

  registerUser() {
    this.isRegistered = false;

    if (this.form.valid) {
      if (this.passwordsMatchValidator()) {
        this.isRegistered = true;
        this.registrationSuccessful = true;
  
        // Close the modal after 3 seconds (3000 milliseconds)
        setTimeout(() => {
          this.modalRef.hide();
        }, 3000);
      } else {
        this.form.controls['confirmPassword'].setErrors({ 'passwordMismatch': true });
      }
    }
  }
}