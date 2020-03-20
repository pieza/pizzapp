import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { RegisterComponent } from './components/register/register.component'
import { HomeComponent } from './pages/home/home.component'
import { LoginComponent } from './components/login/login.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { AuthGuardService as AuthGuard } from './services/auth-guard.service'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', canActivate:[AuthGuard], data: { role: 'ADMIN' } , component: DashboardComponent }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
