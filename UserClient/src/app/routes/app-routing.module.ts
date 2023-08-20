import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailComponent } from '../blog-detail/blog-detail.component';
import { BlogComponent } from '../blog/blog.component';
import { DataTableComponent } from '../commons/data-table/data-table.component';
import { BrandComponent } from '../components/brand/brand.component';
import { CategoryComponent } from '../components/category/category.component';
import { OrderComponent } from '../components/order/order.component';
import { ProductComponent } from '../components/product/product.component';
import { LoginComponent } from '../pages/login/login.component';
import { DashboardComponent } from '../portals/portal-admin/dashboard/dashboard.component';
import { ManagementPageComponent } from '../portals/portal-admin/management-page/management-page.component';
import { NonAuthGuard } from '../utils/guards/non-auth.guard';

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
        path: 'blog',
        component: BlogComponent,
      },
      {
        path: 'blog-detail/:id',
        component: BlogDetailComponent,
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
