import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
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

  constructor(private modalRef: BsModalRef, private apiService: ApiService) { }

  ngAfterViewInit() {
  }

  passwordsMatchValidator(): boolean {
    return this.user['password'] === this.user['confirmPassword'];
  }

  registerUser() {
    this.isRegistered = false;

    if (this.form.valid) {
      if (this.passwordsMatchValidator()) {
        this.authenticateUser();
      } else {
        this.form.controls['confirmPassword'].setErrors({ 'passwordMismatch': true });
      }
    } else {
      console.error('Form validation error: Please check your inputs.');
    }
  }

  authenticateUser() {
    this.apiService.authenticateUser(this.user.email, this.user.password).subscribe(
      (authResponse) => {
        if (authResponse.success) {
          const authToken = authResponse.token;
          this.checkDuplicateUser(authToken);
        } else {
          console.error('Authentication failed:', authResponse.message);
        }
      },
      (error) => {
        console.error('Authentication API error:', error);
      }
    );
  }

  checkDuplicateUser(token: string) {
    this.apiService.checkDuplicateUser(this.user.email, this.user.phoneNumber, token).subscribe(
      (duplicateResponse) => {
        if (duplicateResponse.success) {
          this.registerUserOnSuccess(token);
        } else {
          console.error('Duplicate check failed:', duplicateResponse.message);
        }
      },
      (error) => {
        console.error('Duplicate check API error:', error);
      }
    );
  }

  registerUserOnSuccess(token: string) {
    this.apiService.registerUser(this.user, token).subscribe(
      (registerResponse) => {
        if (registerResponse.success) {
          this.isRegistered = true;
          this.registrationSuccessful = true;

          // Close the modal after 3 seconds (3000 milliseconds)
          setTimeout(() => {
            this.modalRef.hide();
          }, 3000);
        } else {
          console.error('Registration failed:', registerResponse.message);
        }
      },
      (error) => {
        console.error('Registration API error:', error);
      }
    );
  }
}