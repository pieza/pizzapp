import { Injectable } from '@angular/core'
import { UserService } from './user.service'
import { AlertService } from './alert.service'
import { environment } from 'src/environments/environment'
import { Router } from '@angular/router'
import { User } from '../models/user'
import { deleteCookie } from '../utils/cookie.util'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private userService: UserService, private router: Router, private alert: AlertService) { }
  auth_cookie = 'connect.sid'
  cookie_id = 'uid'

  public current: User

  getCurent() {
    return new Promise((resolve, reject) => {
      this.userService.current().subscribe((data: any) => {
        this.current = data ? data: null;
        resolve()
      })
    })

  }

  isAuth(role?: string): boolean {
    if (this.current) {
      if (role) return this.current.type == role
      return true
    }
    return false
  }

  goHome() {
    if (this.isAuth('ADMIN'))
      this.router.navigate(['admin'])
    else if (this.isAuth('CLIENT'))
      this.router.navigate([''])
  }

  login(email: string, password: string) {
    this.alert.showLoading()
    this.userService.login(email, password).subscribe((data: any) => {
      if (data) {
        this.current = data
        this.alert.hideLoading(`Bienvenido ${this.current.name}!`)
        this.goHome()
      }
    }, error => {
      console.log(error.status)
      if (error.status == 400)
        this.alert.error('Por favor complete los datos.')
      else if (error.status == 401)
        this.alert.error('Usuario o contraseña incorrecta.')
      else {
        this.alert.handleError(error)
        if (!environment.production) console.log(error)
      }
    })
  }

  logout() {
    this.userService.logout().subscribe(data => {
      console.log(data)
      this.current = null
      deleteCookie('connect.sid')
      this.router.navigate([''])
    }, error => this.alert.handleError(error))
    
  }
}
