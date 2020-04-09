import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RegisterUser } from '../../models/register-user';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  constructor(private service: UserService, private alert: AlertService, private router: Router) { }

  ngOnInit(): void {

  }

  submit(form: RegisterUser) {
    this.alert.showLoading();
    this.service.register(form).subscribe((data) => {
      console.log(data)
      this.router.navigate(['login'])

    }, error => this.alert.handleError(error))
  }
}
