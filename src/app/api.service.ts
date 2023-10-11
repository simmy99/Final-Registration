import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://your-api-base-url.com'; // Replace with your actual API base URL

  constructor(private http: HttpClient) {}

  authenticateUser(username: string, password: string): Observable<any> {
    // Define your authentication endpoint
    const authEndpoint = `${this.baseUrl}/authenticate`;
    const body = {
      username: username,
      password: password
    };
    return this.http.post(authEndpoint, body);
  }

  checkDuplicateUser(email: string, phoneNumber: string, token: string): Observable<any> {
    // Define your check duplicate user endpoint
    const checkDuplicateEndpoint = `${this.baseUrl}/check-duplicate`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const body = {
      email: email,
      phoneNumber: phoneNumber
    };
    return this.http.post(checkDuplicateEndpoint, body, { headers: headers });
  }

  registerUser(user: any, token: string): Observable<any> {
    // Define your registration endpoint
    const registerEndpoint = `${this.baseUrl}/register`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(registerEndpoint, user, { headers: headers });
  }
}
