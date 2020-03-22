import { Injectable } from '@angular/core'
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router'
import { AuthService } from './auth.service'

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    await this.auth.getCurent()
    let role = route.data.role
    
    if (this.auth.isAuth(role)) return true

    this.router.navigate(['login'])
    return false
  }
}