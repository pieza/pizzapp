import { Component, OnInit } from '@angular/core';
import { PromoService } from 'src/app/services/promo.service';
import { AlertService } from 'src/app/services/alert.service';
import { Promo } from 'src/app/models/promo';

@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.sass']
})
export class PromosComponent implements OnInit {

  items: Promo[] = []
  constructor(private service: PromoService, private alert:AlertService) { }

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
