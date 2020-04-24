import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { PromoService } from 'src/app/services/promo.service';
import { Promo } from 'src/app/models/promo';
import { Order } from 'src/app/models/order';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.sass']
})
export class OrderSummaryComponent implements OnInit {
  code: string = ""
  promo: Promo

  constructor(public cartService: CartService, private orderService: OrderService, private promoService: PromoService, private router: Router, private alert: AlertService, private auth: AuthService) { }

  ngOnInit(): void {
    this.cartService.loadCart()
    if(!this.cartService.isActive()) {
      this.router.navigate(['/assemble'])
    }
  }

  checkPromoCode() {
    this.alert.showLoading()
    this.promoService.find({ code: this.code }).subscribe(data => {
      console.log(data)
      if(data.length > 0) {
        this.promo = data[0]
        if(this.promo.active) {
          this.alert.success("Código encontrado!")
        } else {
          this.alert.error("El código ya fue utilizado")
        }
        
      } else {
        this.alert.error("El código no existe")
      }
    }, error => this.alert.handleError(error))
  }

  createOrder() {
    let order: Order = {
      promo_id: this.promo._id,
      products: this.cartService.cart.products,
      user_id: this.auth.current._id
    } 
    this.alert.preConfirmLoading('Confirmar pedido', '¿Desea realizar la orden?', () => new Promise((resolve, reject) => {
      this.orderService.create(order).subscribe(result => {
        resolve('Orden creada correctamente!')
        this.cartService.deleteCart()
        this.router.navigate(['/'])
      }, error => reject('No se pudo crear la orden.'))
    }))
  }
  
  getFinalPrice(){
    let cartTotal = this.cartService.getTotalPrice() 
    return this.promo?.percent ? cartTotal - (cartTotal * this.promo.percent) : cartTotal
  }
}
