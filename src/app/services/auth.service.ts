import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = "https://localhost:7045/api/User/";
  private userPayload:any;

  constructor(private _http: HttpClient, private router:Router) { 
    this.userPayload = this.decodeToken();
  }

  signUp(userObj:any) {
    return this._http.post<any>(`${this.baseUrl}register`,userObj)
  }

  signOut() {
    localStorage.clear();
    this.userPayload={};
    this.router.navigate(['login']);
  }

  login(loginObj:any) {
    return this._http.post<any>(`${this.baseUrl}authenticate`,loginObj)
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn():boolean {
    return !!localStorage.getItem('token');
  }

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  getNameFromToken() {
    if(this.userPayload)
    return this.userPayload.name;
  }

  getEmailFromToken() {
    if(this.userPayload)
    return this.userPayload.email;
  }

  getRoleFromToken() {
    if(this.userPayload)
    return this.userPayload.role;
  }

}
