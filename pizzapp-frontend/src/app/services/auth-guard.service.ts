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

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let role = route.data.role
    
    if (this.auth.isAuth(role)) return true

    this.router.navigate(['login'])
    return false
  }
}