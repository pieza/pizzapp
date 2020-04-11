import { Injectable } from '@angular/core';
import { BaseHttpService } from './BaseHttpService';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Cart } from '../models/cart';
import { Product } from '../models/product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private service: BaseHttpService<Cart>

  constructor(private http: HttpClient, private productService: ProductService, private auth: AuthService) { 
    this.service = new BaseHttpService(http, '/carts');
  }

  async get() {
    let user_id = this.auth.current?._id
    if(!user_id) return null
    let items = await this.service.find({ user_id }).toPromise()

    if(items[0]) 
      return items[0]
    else 
      return await this.service.create({ user_id, products: [] }).toPromise()
  }

  async deleteCart() {
    let cart = await this.get()

    if(cart) 
      return await this.service.delete(cart._id).toPromise()
    else
      return true
  }

  async addProduct(product: Product, image: File) {
    let formData = new FormData()
    formData.append("file", image)
    formData.append("ingredients", JSON.stringify(product.ingredients))
    let cart: any = await this.get()
    if(cart) {
      let p: any = await this.productService.create(formData).toPromise()
      cart.products.push(p)
      return await this.service.update(cart._id, cart).toPromise()
    }
  }

  async removeProduct(product: Product) {
    let cart: any = await this.get()
    if(cart) {
      await this.productService.delete(product._id).toPromise()
      cart.products = cart.products.filter(p => { return p._id != product._id})
      return await this.service.update(cart._id, cart).toPromise()
    }
  }


  getIngredientsDescription(item: Product) {
    return item.ingredients.reduce((a, b) => a + b.name + ", ", "")
  }

  getProductPrice(item: Product) {
    return item.ingredients.reduce((a, b) => a + b.price, 0)
  }

  getTotalPrice(cart: Cart) {
    let result = 0
    if(cart && cart.products) {
      cart.products.map(p => {
        result += this.getProductPrice(p)
      })
    }
    return result
  }
}
