import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AdminComponent } from './admin.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { IngredientsComponent } from './pages/ingredients/ingredients.component'
import { UsersComponent } from './pages/users/users.component'
import { CreateIngredientComponent } from './pages/ingredients/create-ingredient/create-ingredient.component'
import { EditIngredientComponent } from './pages/ingredients/edit-ingredient/edit-ingredient.component'


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
        path: 'ingredients', component: IngredientsComponent 
      },
      {
        path: 'ingredients/create', component: CreateIngredientComponent
      },
      {
        path: 'ingredients/edit/:id', component: EditIngredientComponent
      }
    ] 
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
