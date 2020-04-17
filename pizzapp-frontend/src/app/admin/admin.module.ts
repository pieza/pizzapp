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
import { FormsModule } from '@angular/forms';
import { CreateUserComponent } from './pages/users/create-user/create-user.component';
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';
import { PromosComponent } from './pages/promos/promos.component';
import { CreatePromoComponent } from './pages/promos/create-promo/create-promo.component';
import { EditPromoComponent } from './pages/promos/edit-promo/edit-promo.component';
import { ProductComponent } from './pages/product/product.component';
import { EditProductComponent } from './pages/product/edit-product/edit-product.component';
import { OrderComponent } from './pages/order/order.component';
import { CreateOrderComponent } from './pages/order/create-order/create-order.component';
import { EditOrderComponent } from './pages/order/edit-order/edit-order.component';

 


@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
    IngredientsComponent,
    UsersComponent,
    EditIngredientComponent,
    CreateIngredientComponent,
    CreateUserComponent,
    EditUserComponent,
    PromosComponent,
    CreatePromoComponent,
    EditPromoComponent,
    ProductComponent,
    EditProductComponent,
    OrderComponent,
    CreateOrderComponent,
    EditOrderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
