import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RegisterUser } from '../../models/register-user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  constructor(private service: UserService, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.goHome()
  }

  submit(form: RegisterUser) {
    this.service.register(form).subscribe((data) => {
      console.log(data)
      
    });
  }
}
