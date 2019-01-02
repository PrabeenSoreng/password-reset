import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const url = 'http://localhost:3000/api/auth';

interface IForgotPassword {
  email: string;
}

interface IResetPassword {
  password: string;
  token: string;
}

interface ILogin {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  forgotPassword(email: IForgotPassword): Observable<any> {
    return this.http.post(`${url}/forgot-password`, {
      email
    });
  }

  resetPassword(password, token): Observable<IResetPassword> {
    return this.http.post<IResetPassword>(`${url}/reset-password/${token}`, {
      password
    });
  }

  loginForm(body: ILogin): Observable<any> {
    return this.http.post(`${url}/login`, body);
  }
}
