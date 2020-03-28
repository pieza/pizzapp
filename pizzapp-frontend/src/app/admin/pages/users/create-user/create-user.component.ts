import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.sass']
})
export class CreateUserComponent implements OnInit {

  item: User = new User()

  constructor(private service: UserService, private alert: AlertService) { }

  ngOnInit(): void {
    // default
    this.item.type = "ADMIN"
  }

  submit() {
    this.alert.showLoading()
    this.service.create(this.item).subscribe(result => {
      this.alert.success('Elemento creado correctamente!')
    }, error => { this.alert.error('Ha ocurrido un error') })
  }
}
