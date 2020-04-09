import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AdminComponent } from './admin.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { IngredientsComponent } from './pages/ingredients/ingredients.component'
import { UsersComponent } from './pages/users/users.component'
import { CreateIngredientComponent } from './pages/ingredients/create-ingredient/create-ingredient.component'
import { EditIngredientComponent } from './pages/ingredients/edit-ingredient/edit-ingredient.component'
import { EditUserComponent } from './pages/users/edit-user/edit-user.component'
import { CreateUserComponent } from './pages/users/create-user/create-user.component'
import { PromosComponent } from './pages/promos/promos.component'
import { CreatePromoComponent } from './pages/promos/create-promo/create-promo.component'
import { EditPromoComponent } from './pages/promos/edit-promo/edit-promo.component'


const routes: Routes = [
  { path: '', component: AdminComponent, 
    children: [
      {
        path: '', component: DashboardComponent
      },
      {
        path: 'users', component: UsersComponent
      },
      {
        path: 'users/create', component: CreateUserComponent
      },
      {
        path: 'users/edit/:id', component: EditUserComponent
      },
      {
        path: 'ingredients', component: IngredientsComponent 
      },
      {
        path: 'ingredients/create', component: CreateIngredientComponent
      },
      {
        path: 'ingredients/edit/:id', component: EditIngredientComponent
      },
      {
        path: 'promos', component: PromosComponent 
      },
      {
        path: 'promos/create', component: CreatePromoComponent
      },
      {
        path: 'promos/edit/:id', component: EditPromoComponent
      }
    ] 
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
