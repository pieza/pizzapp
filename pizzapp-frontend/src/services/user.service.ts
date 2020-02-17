import { Injectable } from '@angular/core';
import { BaseHttpService } from './BaseHttpService';
import { User } from 'src/models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RegisterUser } from 'src/models/register-user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseHttpService<User> {

  constructor(private http: HttpClient) {
    super(http, '/users');
  }

  register(user: RegisterUser) {
    console.log(user)
    return this.http.post(`${environment.apiPath}/register`, user);
  }

}
