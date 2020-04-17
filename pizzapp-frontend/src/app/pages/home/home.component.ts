import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  onOrderClick() {
    if(this.auth.isAuth) {
      this.router.navigate(['/assemble'])
    } else {
      this.router.navigate(['/login'])
    }
  }

}
