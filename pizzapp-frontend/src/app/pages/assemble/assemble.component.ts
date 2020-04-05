import { Component, OnInit } from '@angular/core';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-assemble',
  templateUrl: './assemble.component.html',
  styleUrls: ['./assemble.component.sass']
})
export class AssembleComponent implements OnInit {
  sizes = []
  toppings = []
  pastas = []

  constructor(private ingredientService: IngredientService) { }

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
    })
  }

}
