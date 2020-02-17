import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { RegisterUser } from 'src/models/register-user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  userToRegister: RegisterUser;

  constructor(private service: UserService) { }

  ngOnInit(): void {
  }

  submit() {
    this.service.register(this.userToRegister).subscribe((data) => {
      console.log(data)
      
    });
  }
}
