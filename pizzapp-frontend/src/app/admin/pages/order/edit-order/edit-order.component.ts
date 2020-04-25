import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { AlertService } from 'src/app/services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.sass']
})
export class EditOrderComponent implements OnInit {

  id: string
  item: Order = new Order()

  constructor(private service:OrderService, private alert: AlertService, private route:ActivatedRoute) { }

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
