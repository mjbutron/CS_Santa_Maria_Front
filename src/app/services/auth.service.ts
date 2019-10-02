import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

import { UserInterface } from '../models/user-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  headers : HttpHeaders = new HttpHeaders({
    "Content-type": "application/json"
  });

  loginUser(email: string, password: string): Observable<any>{
    const url_api = 'http://localhost/apiRest/public/api/login';
    return this.http.post<UserInterface>(url_api, {email, password}, {headers: this.headers})
    .pipe(map(data => data));
  }

  setUser(user: UserInterface): void{
    let user_obj = JSON.stringify(user);
    localStorage.setItem("currentUser", user_obj);
  }

  setToken(accessToken): void{
    localStorage.setItem("keyAccess", accessToken);
  }

  getToken(){
    return localStorage.getItem("keyAccess");
  }

  getCurrentUser(): UserInterface {
    let user_obj = localStorage.getItem("currentUser");
    if(!isNullOrUndefined(user_obj)){
      let user: UserInterface = JSON.parse(user_obj);
      return user;
    }else{
      return null;
    }
  }

  logoutUser(){
    // deslogar en el servidor ??
    localStorage.removeItem("keyAccess");
    localStorage.removeItem("currentUser");
  }
}
