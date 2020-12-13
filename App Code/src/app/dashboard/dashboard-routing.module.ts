import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'products',
        loadChildren: () => import('./product/product.module').then((m) => m.ProductModule),
        canActivate: [],
      },
      {
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
        canActivate: [],
      },
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
