import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RegisterUser } from '../../models/register-user';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  constructor(private service: UserService, private alert: AlertService) { }

  ngOnInit(): void {

  }

  submit(form: RegisterUser) {
    this.alert.showLoading();
    this.service.register(form).subscribe((data) => {
      console.log(data)
    });
  }
}
