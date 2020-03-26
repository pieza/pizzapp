import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { AdminComponent } from './admin.component'
import { HomeComponent } from './pages/home/home.component'


const routes: Routes = [
  { path: '', component: AdminComponent, 
  children: [
    {
      path: '', component: HomeComponent
    }
  ] }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
