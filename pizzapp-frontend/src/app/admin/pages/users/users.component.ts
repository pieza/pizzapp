import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {

  items: User[] = []
  constructor(private service: UserService, private alert: AlertService) { }

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.service.find().subscribe(data => {
      this.items = data;
    })
  }

  delete(id: string){
    this.alert.preConfirmLoading('¿Esta seguro?', 'La acción eliminará el objeto.', () => new Promise((resolve, reject) => {
      this.service.delete(id).subscribe(result => {
        resolve('Elemento eliminado correctamente!')
      }, error => reject('No se pudo eliminar el objeto.'))
    }))
  }
}
