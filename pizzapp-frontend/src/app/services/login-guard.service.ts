import { Injectable } from '@angular/core'
import { 
  Router,
  CanActivate
} from '@angular/router'
import { AuthService } from './auth.service'

@Injectable()
export class LoginGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  async canActivate(): Promise<boolean> {
    await this.auth.getCurent()
    console.log(2, this.auth.current)
    if (this.auth.isAuth('ADMIN')) {
      this.router.navigate(['admin'])
      return false
    }
      
    else if (this.auth.isAuth('CLIENT')) {
      this.router.navigate([''])
      return false
    }
    return true
  }
}