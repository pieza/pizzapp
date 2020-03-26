import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IngredientsComponent } from './pages/ingredients/ingredients.component';
import { UsersComponent } from './pages/users/users.component';
import { EditIngredientComponent } from './pages/ingredients/edit-ingredient/edit-ingredient.component';
import { CreateIngredientComponent } from './pages/ingredients/create-ingredient/create-ingredient.component';




@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
    IngredientsComponent,
    UsersComponent,
    EditIngredientComponent,
    CreateIngredientComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
