import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.sass']
})
export class EditUserComponent implements OnInit {

  id: string
  item: User = new User()

  constructor(private service: UserService, private alert: AlertService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.service.findOne(this.id).subscribe(data => {
      delete data.password
      this.item = data
    })
  }

  submit() {
    this.alert.showLoading()
    this.service.update(this.id, this.item).subscribe(result => {
      this.alert.success('Elemento actualizado correctamente!')
    }, error => { this.alert.handleError(error) })
  }

}
