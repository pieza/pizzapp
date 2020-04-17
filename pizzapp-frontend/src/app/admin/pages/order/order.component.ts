import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {
  items: OrderComponent[] = []

  constructor(private service: OrderService, private alert: AlertService) { }

  ngOnInit(): void {
    this.get()
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
        this.get()
      }, error => reject('No se pudo eliminar el objeto.'))
    }))
  }

}
