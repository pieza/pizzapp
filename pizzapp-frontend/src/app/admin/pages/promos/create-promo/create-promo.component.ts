import { Component, OnInit } from '@angular/core';
import { PromoService } from 'src/app/services/promo.service';
import { AlertService } from 'src/app/services/alert.service';
import { Promo } from 'src/app/models/promo';

@Component({
  selector: 'app-create-promo',
  templateUrl: './create-promo.component.html',
  styleUrls: ['./create-promo.component.sass']
})
export class CreatePromoComponent implements OnInit {

  item: Promo = new Promo()
  constructor(private service: PromoService, private alert: AlertService) { }

  ngOnInit(): void {
    this.item.active = true
  }

  submit() {
    this.alert.showLoading()
    this.service.create(this.item).subscribe(result => {
      this.alert.success('Elemento creado correctamente!')
    }, error => { this.alert.error('Ha ocurrido un error') })
  }

}
