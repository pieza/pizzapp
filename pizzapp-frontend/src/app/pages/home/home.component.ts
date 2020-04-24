import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router, private cartService: CartService) { 

  }

  ngOnInit(): void {
    this.cartService.loadCart()
  }

  onOrderClick() {
    if(this.auth.isAuth) {
      this.router.navigate(['/assemble'])
    } else {
      this.router.navigate(['/login'])
    }
  }

}
