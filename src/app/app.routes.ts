import { Routes } from '@angular/router';
import {ProductListComponent} from "./product-list/product-list.component";
import {DetailedProductComponent} from "./detailed-product/detailed-product.component";
import {AddProductComponent} from "./add-product/add-product.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ProductListComponent,
    title: 'List of Products'
  },
  {
    path: 'addproduct',
    component: AddProductComponent,
    title: 'Add A Product'
  },
  {
    path: 'product/:sku',
    component: DetailedProductComponent,
    title: 'Detailed Product'
  },
  {
    path: '**',
    component: ProductListComponent,
    title: 'List of Products'
  }


];
