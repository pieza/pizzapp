import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IngredientService } from 'src/app/services/ingredient.service';
import { Ingredient } from 'src/app/models/ingredient';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { AlertService } from 'src/app/services/alert.service';
import { Cart } from 'src/app/models/cart';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-assemble',
  templateUrl: './assemble.component.html',
  styleUrls: ['./assemble.component.sass']
})
export class AssembleComponent implements OnInit {

  @ViewChild('capture') capture: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  ctx: CanvasRenderingContext2D;

  imageSize = 400
  product_id: string
  product: Product
  selectedSize: Ingredient = new Ingredient()
  selectedPasta: Ingredient = new Ingredient()
  toppingsFilter: string
  sizes = []
  toppings = []
  pastas = []
  constructor(
    private ingredientService: IngredientService, 
    private productService: ProductService, 
    public cartService: CartService, 
    private alert: AlertService, 
    private route: ActivatedRoute,
    private router: Router) { 
      this.product_id = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.getSizes()
    this.getToppings()
    this.getPastas()
    this.loadProduct()   
  }

  getProductPrice() {
    return this.product?.ingredients.reduce((a, b) =>  { return a + b.price }, 0) + this.selectedPasta.price + this.selectedSize.price || 0
  }

  getSizes() {
    this.ingredientService.find({ type: 'size' }).subscribe(data => {
      this.sizes = data
      if(!this.product_id) this.selectedSize = this.sizes[0]
    })
  }

  getToppings() {
    this.ingredientService.find({ type: 'topping' }).subscribe(data => {
      this.toppings = data
    })
  }

  getPastas() {
    this.ingredientService.find({ type: 'pasta' }).subscribe(data => {
      this.pastas = data
      if(!this.product_id) this.selectedPasta = this.pastas[0]
    })
  }



  filterToppings(): Ingredient[] {
    if(!this.toppingsFilter) return this.toppings
    else
      return this.toppings.filter((item: Ingredient) => {
        return item.name.toUpperCase().includes(this.toppingsFilter.toUpperCase()) || item.description.toUpperCase().includes(this.toppingsFilter.toUpperCase())
      })
  }

  addIngredient(item: Ingredient) {
    this.product.ingredients.push(item)
  }

  deleteIngredient(item: Ingredient) {
    let i = this.product.ingredients.indexOf(item)
    this.product.ingredients.splice(i, 1)
  }

  setSelectedSize(size: Ingredient) {
    this.selectedSize = size
  }

  sortIngredients(){
    return this.product?.ingredients.sort((a, b) => a.zindex - b.zindex) || []
  }

  loadProduct() {
    if(this.product_id) {
      this.productService.findOne(this.product_id).subscribe(data => {
        this.product = new Product()
        this.product.ingredients = data.ingredients.filter(item => { return item.type == 'topping' })
        this.selectedSize = data.ingredients.filter(item => { return item.type == 'size' })[0]
        this.selectedPasta = this.pastas.filter(p => { return p._id == data.ingredients.filter(item => { return item.type == 'pasta' })[0]._id })[0]
      }, error => this.alert.handleError(error))
    } else{
      this.product = new Product()
    }
  }

  addToCart() {
    this.alert.showLoading()
    let p: Product = JSON.parse(JSON.stringify(this.product))
    p.ingredients.push(this.selectedPasta)
    p.ingredients.push(this.selectedSize)
    let img = this.generateImage()
    this.cartService.addProduct(p, new File([img], 'product.png')).then(data => {
      this.alert.success('Producto agregado correctamente!')
      this.product = new Product()
      this.cartService.loadCart()
    }).catch(error => this.alert.handleError(error))
  }

  generateImage(){
    let images: HTMLCollection = this.capture.nativeElement.children
    this.ctx = this.canvas.nativeElement.getContext('2d')
    for (let i = 1; i < images.length; i++) {
      const image = images[i]
      this.draw(image)
    }
    return this.canvas.nativeElement.toDataURL("image/png")
  }

  draw(element) {
    this.ctx.drawImage(element, 0, 0, this.imageSize, this.imageSize)   
  }

  updateProduct() {
    this.alert.showLoading()
    let p = this.product
    p.ingredients.push(this.selectedPasta)
    p.ingredients.push(this.selectedSize)
    this.productService.update(this.product_id, p).subscribe(data => {
      this.alert.success('Producto actualizado correctamente!')
      this.product = new Product()
      this.product_id = null
      this.cartService.get()
      this.router.navigate(['assemble'])
    }, error => this.alert.handleError(error))
  }

  goToOrderSummary() {
    this.router.navigate(['/order-summary'])
  }
}
