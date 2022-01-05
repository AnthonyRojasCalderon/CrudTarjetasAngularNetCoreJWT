import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserInfo } from './user-info';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AccountService {
  private apiURL = 'https://localhost:44393/' + "api/Account";  

  constructor(private http: HttpClient, private router: Router) { }

  create(userInfo: IUserInfo): Observable<any> {
    return this.http.post<any>(this.apiURL + "/Create", userInfo);
  }

  login(userInfo: IUserInfo): Observable<any> { 
    return this.http.post<any>(this.apiURL + "/Login", userInfo);
  }

  obtenerToken(): string {
    return localStorage.getItem("token") || "";
  }

  obtenerExpiracionToken(): string {
    return localStorage.getItem("tokenExpiration")  || "";
  }

  obtenerUsuario(): string{
    return localStorage.getItem("usuario") || "";
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("usuario");
  }

  estaLogueado(): boolean {

    var exp = this.obtenerExpiracionToken();

    if (!exp) {
      // el token no existe
      return false;
    }

    var now = new Date().getTime();
    var dateExp = new Date(exp);

    if (now >= dateExp.getTime()) {
      // ya expiró el token
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      localStorage.removeItem("usuario");      
      return false;
    } else {
      return true;
    }
  }

} 