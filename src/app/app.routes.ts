import { Routes } from '@angular/router';
import {ProductListComponent} from "./product-list/product-list.component";
import {DetailedProductComponent} from "./detailed-product/detailed-product.component";
import {AddProductComponent} from "./add-product/add-product.component";
import {EditProductComponent} from "./edit-product/edit-product.component";

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
    path: 'list/:search',
    component: ProductListComponent,
    title: "Search"
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
    path: 'editproduct/:sku',
    component: EditProductComponent,
    title: 'Edit A Product'
  },
  {
    path: '**',
    component: ProductListComponent,
    title: 'List of Products'
  }


];
