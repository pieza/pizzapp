import { Component, OnInit } from '@angular/core';
import { IngredientService } from 'src/app/services/ingredient.service';
import { Ingredient } from 'src/app/models/ingredient';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-assemble',
  templateUrl: './assemble.component.html',
  styleUrls: ['./assemble.component.sass']
})
export class AssembleComponent implements OnInit {
  product: Product
  selectedSize: Ingredient
  selectedPasta: Ingredient = new Ingredient()
  sizes = []
  toppings = []
  pastas = []

  constructor(private ingredientService: IngredientService) { 
    this.product = new Product()
  }

  ngOnInit(): void {
    this.getSizes()
    this.getToppings()
    this.getPastas()
  }

  getSizes() {
    this.ingredientService.find({ type: 'size' }).subscribe(data => {
      this.sizes = data
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
      this.selectedPasta = this.pastas[0]
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
    return this.product.ingredients.sort((a, b) => a.zindex - b.zindex)
  }

}
