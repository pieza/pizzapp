import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  private errors: any

  constructor(private service: UserService ,private router: Router) { }

  ngOnInit() {
  }

  submit(form: any) {
    this.service.login(form.email, form.password).subscribe((data: any) => {
      this.errors = data.errors ? data.errors : {};
    });
  }

}
