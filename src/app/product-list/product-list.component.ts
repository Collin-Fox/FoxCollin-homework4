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

  categories: Set<string> = new Set<string>();

  category: string = "";

  //This component is using a product service class to get data
  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {}





  //what happens when the page opens
  ngOnInit(){
    this.productService.getAllProducts().subscribe(data => {
      console.log("What im showing")
      console.log(data);
      this.products = data;

      //create a set of all categories
      for(var product of data){
        console.log("Test One")
        this.categories.add(product.category)
      }

      console.log(this.categories);

    })




  }

  //when someone selects a category
  onCategory(){
    console.log("This is the category: " + this.category)
    if(this.category == "none" || this.category == ""){
      this.productService.getAllProducts().subscribe(data =>{
        this.products = data;
      });
    }else{
      this.productService.getAllProductsByCategory(this.category).subscribe(data =>{
        this.products = data;
      })
    }
  }

  //when someone is searching in the search bar
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

  //General sorts of different elements of a product

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
