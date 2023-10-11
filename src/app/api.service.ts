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

  checkDuplicateUser(email: string, phoneNumber: string, token: string): Observable<any> {
    // Mock the duplicate check response
    const duplicateResponse = {
      success: true,
    };
    return of(duplicateResponse);
  }

  registerUser(user: any, token: string): Observable<any> {
    // Define your registration endpoint
    const registerEndpoint = `${this.baseUrl}/register`;
    
    // Create headers with the authorization token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Send a POST request to the server
    return this.http.post(registerEndpoint, user, { headers });
  }
}