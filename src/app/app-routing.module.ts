import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SecretPageComponent } from './secret-page/secret-page.component';
import { RegisterComponent } from './register/register.component';
import { ProductsComponent } from './products/products.component'
import { ProductViewComponent } from './product-view/product-view.component';
import { CartViewComponent } from './cart-view/cart-view.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

const routes: Routes = [
  { path : '', component : HomeComponent},
  { path : 'login', component : LoginComponent},
  { path : 'secret', component : SecretPageComponent},
  { path : 'register', component : RegisterComponent},
  { path : 'products', component: ProductsComponent},
  { path : 'product/:productId', component: ProductViewComponent},
  { path : 'cart', component: CartViewComponent},
  { path : 'create-product', component: CreateProductComponent},
  { path : 'product/:productId/edit', component : ProductEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
