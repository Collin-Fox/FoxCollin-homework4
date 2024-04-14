import {Component, OnInit} from '@angular/core';
import { Product } from "../product";
import { ProductService } from "../product.service";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-detailed-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detailed-product.component.html',
  styleUrl: './detailed-product.component.css'
})
export class DetailedProductComponent implements OnInit{

  sku: string;
  p: Product;

  //Constructor
  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {
    this.sku = "-1";
    this.p = new Product();
  }

  //What happens when the component is loaded
  ngOnInit() {
    console.log("ONINIT")

    //get the sku parameter and use it in the active route
    this.route.paramMap.subscribe(params => {
      this.sku = params.get("sku")!;
      console.log("Sku"  + this.sku)
    });

    //We have the sku of the product now get the product object by the sku
    this.productService.getProductBySku(this.sku).subscribe(data => {
      this.p = data;
      console.log("Works")
    },
      error => {
        // console.error(()=> (error.status == '400') ? ("This does not exist") : (error))
        // this.router.navigateByUrl("/list");
        console.error(error);
      })



  }
}
