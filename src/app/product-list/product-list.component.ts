import {Component, OnInit} from '@angular/core';
import { Product } from "../product";
import { ProductService } from "../product.service";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements  OnInit{

  //Empty list of products
  products: Product[] = [];

  //This component is using a product service class to get data
  constructor(private productService: ProductService) {}




  //what happens when the page opens
  ngOnInit(){
    this.productService.getAllProducts().subscribe(data => {
      console.log(data);
      this.products = data;
    })
  }


  onSearch(search: string){
    this.productService.searchProduct(search).subscribe(data =>{
      this.products = data;
    })
  }

}
