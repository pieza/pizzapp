import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { PromoService } from 'src/app/services/promo.service';
import { Promo } from 'src/app/models/promo';
import { Order } from 'src/app/models/order';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { Ingredient } from 'src/app/models/ingredient';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.sass']
})
export class OrderSummaryComponent implements OnInit {
  code: string = ""
  promo: Promo
  selectedBeverage: Ingredient = new Ingredient()
  beverages = []


  constructor(public cartService: CartService, private productService: ProductService, private ingredientService: IngredientService, private orderService: OrderService, private promoService: PromoService, private router: Router, private alert: AlertService, private auth: AuthService) { }

  ngOnInit(): void {
    this.getBeverages()
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

  async createOrder() {
    let order: Order = {
      products: this.cartService.cart.products,
      user_id: this.auth.current._id
    } 
    if(this.promo?._id) {
      order.promo_id = this.promo._id
    }

    if(this.selectedBeverage) {
      let bProduct = await this.productService.create({ image_url: this.selectedBeverage.image_url, ingredients: [this.selectedBeverage]}).toPromise()
      order.products.push(bProduct)
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
    let cartTotal = this.cartService.getTotalPrice() + (this.selectedBeverage.price ? this.selectedBeverage.price : 0)
    return this.promo?.percent ? cartTotal - (cartTotal * this.promo.percent) : cartTotal
  }

  getBeverages() {
    this.ingredientService.find({ type: 'beverage' }).subscribe(data => {
      this.beverages = data
    })
  }

  setSelectedBeverage(beverage: Ingredient) {
    this.selectedBeverage = beverage
  }
}
