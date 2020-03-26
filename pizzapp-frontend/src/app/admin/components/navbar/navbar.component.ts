import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  name: string = ""
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.name = this.auth.current.name
  }


}
