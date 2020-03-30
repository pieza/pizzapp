import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assemble',
  templateUrl: './assemble.component.html',
  styleUrls: ['./assemble.component.sass']
})
export class AssembleComponent implements OnInit {
  toppings = []
  pastas = []
  constructor() { }

  ngOnInit(): void {
  }

}
