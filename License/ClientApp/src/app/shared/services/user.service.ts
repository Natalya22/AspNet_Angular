import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  private url = "/api/users";
  constructor(private http: HttpClient) { }

  getUserClaims(){
    return  this.http.get(this.url);
   }

  registerUser(user: User) {
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.url + '/Register', user, {headers : reqHeader});
  }

  userAuthentication(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post(this.url + '/token', data, { headers: reqHeader });
  }

}