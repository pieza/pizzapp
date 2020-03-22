import { Injectable } from '@angular/core'
import { UserService } from './user.service'
import { AlertService } from './alert.service'
import { environment } from 'src/environments/environment'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private userService: UserService, private router: Router, private alert: AlertService) { }
  auth_cookie = 'connect.sid'
  cookie_id = 'uid'

  public current: any = {}

  getCurent() {
    return new Promise((resolve, reject) => {
      this.userService.current().subscribe((data: any) => {
        console.log(1, data)
        this.current = data ? data: null;
        resolve()
      })
    })

  }

  isAuth(role?: string): boolean {
    if (this.current) {
      if (role) {
        return this.current.type == role
      }
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
    this.userService.login(email, password).subscribe((data: any) => {
      if (data) {
        this.current = data
        this.alert.hideLoading()
        this.goHome()
      }
    }, error => {
      if (error.status == 401)
        this.alert.error('Usuario o contraseña incorrecta.')
      else {
        this.alert.error('Ha ocurrido un problema.')
        if (!environment.production) console.log(error)
      }
    })
  }

  logout() {
    this.current = null
    this.userService.logout()
    this.router.navigate([''])
  }
}
