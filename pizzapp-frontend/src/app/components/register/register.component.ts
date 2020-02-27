import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RegisterUser } from '../../models/register-user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  constructor(private service: UserService) { }

  ngOnInit(): void {
  }

  submit(form: RegisterUser) {
    this.service.register(form).subscribe((data) => {
      console.log(data)
      
    });
  }
}
