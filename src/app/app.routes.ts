import { Routes } from '@angular/router';

import { Login } from './login/login';
import { ProductList } from './product-list/product-list';
import { ProductDetail } from './product-detail/product-detail';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'products',
    component: ProductList,
    canActivate: [AuthGuard]
  },

  {
    path: 'product/:id',
    component: ProductDetail,
    canActivate: [AuthGuard]
  }

];