import { Injectable } from '@angular/core';
import { BaseHttpService } from './BaseHttpService';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RegisterUser } from '../models/register-user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseHttpService<User> {

  constructor(private http: HttpClient) {
    super(http, '/users');
  }

  register(user: RegisterUser) {
    return this.http.post(`${environment.apiPath}/register`, user);
  }

  login(email: string, password: string) {
    let user = {email, password };
    return this.http.post(`${environment.apiPath}/login`, user,  {
      withCredentials: true
    });
  }

  logout() {
    return this.http.get(`${environment.apiPath}/logout`);
  }

  current() {
    return this.http.get(`${environment.apiPath}/current`);
  }

}
