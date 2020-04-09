import { Component, OnInit } from '@angular/core';
import { PromoService } from 'src/app/services/promo.service';
import { AlertService } from 'src/app/services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { Promo } from 'src/app/models/promo';

@Component({
  selector: 'app-edit-promo',
  templateUrl: './edit-promo.component.html',
  styleUrls: ['./edit-promo.component.sass']
})
export class EditPromoComponent implements OnInit {

  id:string
  item: Promo = new Promo()

  constructor(private service: PromoService, private alert: AlertService, private route: ActivatedRoute) { }

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
