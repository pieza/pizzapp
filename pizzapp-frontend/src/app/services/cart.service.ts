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
  public cart: Cart
  constructor(private http: HttpClient, private productService: ProductService, private auth: AuthService) { 
    this.service = new BaseHttpService(http, '/carts');
    this.loadCart()
  }

  loadCart() {
    this.get().then((data: any) => this.cart = data)
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
    if(this.cart) {
      await this.productService.delete(product._id).toPromise()
      this.cart.products = this.cart.products.filter(p => { return p._id != product._id})
      return await this.service.update(this.cart._id, this.cart).toPromise()
    }
  }


  getIngredientsDescription(item: Product) {
    let result = item.ingredients.reduce((a, b) => a + b.name + ", ", "")
    if(result.length >= 2) {
      result = result.substring(0, result.length - 2)
    }
    return result
  }

  getProductPrice(item: Product) {
    return item.ingredients.reduce((a, b) => a + b.price, 0)
  }

  getTotalPrice() {
    let result = 0
    if(this.cart && this.cart.products) {
      this.cart.products.map(p => {
        result += this.getProductPrice(p)
      })
    }
    return result
  }

  isActive() {
    return this.cart?.products?.length > 0
  }
}
