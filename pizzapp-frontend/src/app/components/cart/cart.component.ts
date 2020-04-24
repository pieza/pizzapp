import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {

  constructor(public cartService: CartService, private alert: AlertService, private router: Router) {

  }

  ngOnInit(): void {
    this.cartService.loadCart()
  }

  removeProduct(product: Product) {
    this.alert.preConfirmLoading('¿Esta seguro?', 'La acción eliminará el objeto.', () => new Promise((resolve, reject) => {
      this.cartService.removeProduct(product).then(data => {
        this.cartService.loadCart()
        resolve('Producto eliminado correctamente!')
      }).catch(error => reject('No se pudo eliminar el producto.'))
    }))
  }

  deleteCart() {

  }

  goToOrderSummary() {
    this.router.navigate(['/order-summary'])
  }
}
