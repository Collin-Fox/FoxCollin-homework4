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


  onSearch(){

    //When i click the button to search:
    /*
    1: Route to list/:search url with the text box body as the search param
    2: Set the products param in this file to the search server call
     */
    this.productService.searchProduct(this.search).subscribe(data =>{
      this.products = data;
      this.router.navigate(['/list', this.search])
    })
  }


  //what happens when the page opens
  ngOnInit(){

    this.productService.getAllProducts().subscribe(data => {
      console.log(data);
      this.products = data;
    })
  }



}
