import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  private errors: any

  constructor(private auth: AuthService, private alert: AlertService) { }

  ngOnInit() {
    this.auth.goHome()
  }

  submit(form: any) {
    this.alert.showLoading();
    this.auth.login(form.email, form.password)
  }

}
