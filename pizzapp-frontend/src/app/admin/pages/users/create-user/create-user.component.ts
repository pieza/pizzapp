import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { RegisterUser } from 'src/app/models/register-user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.sass']
})
export class CreateUserComponent implements OnInit {

  item: RegisterUser = new RegisterUser()

  constructor(private service: UserService, private alert: AlertService) { }

  ngOnInit(): void {
    // default
    this.item.type = "ADMIN"
  }

  submit() {
    this.alert.showLoading()
    this.service.register(this.item).subscribe(result => {
      this.alert.success('Elemento creado correctamente!')
    }, error => { this.alert.handleError(error) })
  }
}
