import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {

  items: Product[] = []

  constructor(private service: ProductService, private alert: AlertService) { }

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
