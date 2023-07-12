import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTableComponent } from '../commons/data-table/data-table.component';
import { AccountComponent } from '../components/account/account.component';
import { BrandComponent } from '../components/brand/brand.component';
import { CategoryComponent } from '../components/category/category.component';
import { DiscountComponent } from '../components/discount/discount.component';
import { OrderComponent } from '../components/order/order.component';
import { ProductComponent } from '../components/product/product.component';
import { RoleComponent } from '../components/role/role.component';
import { StatisticComponent } from '../components/statistic/statistic.component';
import { LoginComponent } from '../pages/login/login.component';
import { DashboardComponent } from '../portals/portal-admin/dashboard/dashboard.component';
import { ManagementPageComponent } from '../portals/portal-admin/management-page/management-page.component';
import { NonAuthGuard } from '../utils/guards/non-auth.guard';
import { BlogsComponent } from '../components/blogs/blogs.component';
import { ShoppingComponent } from '../components/shopping/shopping.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [NonAuthGuard],
    canActivateChild: [NonAuthGuard],
    component: LoginComponent, 
    data: { preload: true },
    children: [
    ]
  },
  {
    path: 'admin',
    canActivate: [NonAuthGuard],
    canActivateChild: [NonAuthGuard],
    component: ManagementPageComponent, 
    data: { preload: true },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent, 
      },
      {
        path: 'builder',
        component: DataTableComponent, 
      },
      {
        path: 'data-table',
        component: DataTableComponent, 
      },
      {
        path: 'category',
        component: CategoryComponent, 
      },
      {
        path: 'brand',
        component: BrandComponent, 
      },
      {
        path: 'order',
        component: OrderComponent, 
      },
      {
        path: 'product',
        component: ProductComponent, 
      },
      {
        path: 'role',
        component: RoleComponent, 
      },
      {
        path: 'discount',
        component: DiscountComponent, 
      },
      {
        path: 'account',
        component: AccountComponent, 
      },
      {
        path: 'statistic',
        component: StatisticComponent, 
      },
      {
        path: 'blog',
        component: BlogsComponent, 
      },
      {
        path: 'shopping',
        component: ShoppingComponent, 
      },
    ]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
