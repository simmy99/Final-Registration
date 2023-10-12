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
  emailExistsMessage: string = '';
  errorMessage: string = '';

  @ViewChild('registrationForm', { static: false }) form!: NgForm;

  constructor(private modalRef: BsModalRef, private apiService: ApiService) { }

  ngAfterViewInit() {
  }

  passwordsMatchValidator(): boolean {
    return this.user['password'] === this.user['confirmPassword'];
  }

  registerUser() {
    this.emailExistsMessage = '';
    // Call the checkDuplicateUser method without the token
    this.apiService.checkDuplicateUser(this.user.email).subscribe(
      (duplicateResponse) => {
        if (duplicateResponse.success) {
          // Email doesn't exist, proceed with registration
          this.registerUserOnSuccess();
        } else {
          // Email already exists, show an error message
          this.emailExistsMessage = duplicateResponse.message || 'Email already exists';
          this.isRegistered = false;
        }
      },
      (error) => {
        // Handle the error response here
        console.error('Duplicate check API error:', error);
      }
    );
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
    this.apiService.checkDuplicateUser(this.user.email).subscribe(
      (duplicateResponse) => {
        if (duplicateResponse.success) {
          this.registerUserOnSuccess();
        } else {
          console.error('Duplicate check failed:', duplicateResponse.message);
        }
      },
      (error) => {
        console.error('Duplicate check API error:', error);
      }
    );
  }

  registerUserOnSuccess() {
    // Call the registerUser method without the token
    this.apiService.registerUser(this.user).subscribe(
      (registerResponse) => {
        if (registerResponse.success) {
          this.isRegistered = true;
          // Clear any previous error messages
          this.errorMessage = '';
        } else {
          // Registration failed, set the error message
          this.errorMessage = 'Registration failed: ' + registerResponse.message;
          console.error(this.errorMessage);
        }
      },
      (error) => {
        // Handle the error response here
        this.errorMessage = 'Registration API error: ' + error.message;
        console.error(this.errorMessage);
      }
    );
  }
  
}