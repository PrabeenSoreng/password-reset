import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const url = 'http://localhost:3000/api/auth';

interface IForgotPassword {
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  forgotPassword(email: IForgotPassword) {
    return this.http.post(`${url}/forgot-password`, {
      email
    });
  }
}
