import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  private url = "/api/users";
  constructor(private http: HttpClient) { }

  register(formData) {
    return this.http.post(this.url + '/Register', formData);
  }

  login(formData) {
    return this.http.post(this.url + '/Login', formData);
  }

  getUsers() {
    return this.http.get(this.url);
  }

}