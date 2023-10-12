import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  authenticateUser(username: string, password: string): Observable<any> {
    // Mock the authentication response
    const authResponse = {
      success: true,
      token: 'your_mock_token',
    };
    return of(authResponse);
  }

  checkDuplicateUser(email: string): Observable<any> {
    // Define your check duplicate user endpoint
    const checkDuplicateEndpoint = `${this.baseUrl}/check-duplicate`;
    const body = {
      email: email
    };
    return this.http.post(checkDuplicateEndpoint, body);
  }

  registerUser(user: any): Observable<any> {
    // Define your registration endpoint
    const registerEndpoint = `${this.baseUrl}/register`;
    
    // Send a POST request to the server
    return this.http.post(registerEndpoint, user);
  }
}