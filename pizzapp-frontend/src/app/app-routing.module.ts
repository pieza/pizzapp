import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { RegisterComponent } from './components/register/register.component'
import { HomeComponent } from './pages/home/home.component'
import { LoginComponent } from './components/login/login.component'
import { AuthGuardService as AuthGuard } from './services/auth-guard.service'
import { LoginGuardService as LoginGuard } from './services/login-guard.service'
import { AssembleComponent } from './pages/assemble/assemble.component'
import { OrderSummaryComponent } from './pages/order-summary/order-summary.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', canActivate: [LoginGuard], component: RegisterComponent },
  { path: 'login', canActivate: [LoginGuard], component: LoginComponent },
  { path: 'assemble', canActivate: [AuthGuard], data: { role: 'CLIENT' }, component: AssembleComponent },
  { path: 'assemble/:id', canActivate: [AuthGuard], data: { role: 'CLIENT' }, component: AssembleComponent },
  { path: 'order-summary', canActivate: [AuthGuard], data: { role: 'CLIENT' }, component: OrderSummaryComponent },
  { path: 'admin', canActivate: [AuthGuard], data: { role: 'ADMIN' }, loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
