import {Component, OnInit} from '@angular/core';
import { Product } from "../product";
import { ProductService } from "../product.service";
import { CommonModule } from "@angular/common";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
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

  search: string = "";

  //This component is using a product service class to get data
  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {}





  //what happens when the page opens
  ngOnInit(){
    this.productService.getAllProducts().subscribe(data => {
      console.log("What im showing")
      console.log(data);
      this.products = data;
    })
  }

  onSearch(){

    //if there is something in the search bar look for it, if not just show everything

    if(this.search == "") {
      this.productService.getAllProducts().subscribe(data =>{
        this.products = data;
      });
    }else{
      this.productService.searchProduct(this.search).subscribe(data =>{
        this.products = data;
        console.log("Searched" + this.search);
        console.log(this.products)
      })
    }

  }

  compareSKU(a: Product, b: Product){
    return (a.sku >= b.sku) ? (1) : (-1);
  }

  compareName(a: Product, b: Product){
    return (a.name >= b.name) ? (1) : (-1);
  }

  comparePrice(a: Product, b: Product){
    return (a.price >= b.price) ? (1) : (-1);
  }

  sortSku(){
    this.products = this.products.sort(this.compareSKU);
  }

  sortName(){
    this.products = this.products.sort(this.compareName);
  }

  sortPrice(){
    this.products = this.products.sort(this.comparePrice);
  }




}
