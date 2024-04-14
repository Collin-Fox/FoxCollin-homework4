import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule, Route, ActivatedRoute, Router} from "@angular/router";
import {Product} from "../product";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{

  sku: string;
  product: Product

  constructor(private router: Router, private productService: ProductService, private route: ActivatedRoute) {

    //Initialize our params so everything doesnt break
    this.sku = "-1";
    this.product = new Product();
  }


  //When we submit our form
  onSubmit(){
    console.log(this.product);
    //Save the new product by calling our put method in the service
    this.productService.editProduct(this.product).subscribe(data =>{
      //Navigate to the detailed version on the new product we just created
      this.router.navigate(['/product', this.sku])
    }, error => {
      //If there is an error go back to the list and debug print
      this.router.navigateByUrl('/list');
      console.error(error);
    })
  }

  //When the page loads
  ngOnInit() {
    //get the sku from the url
    this.route.paramMap.subscribe(params => {
      this.sku = params.get("sku")!;
    });

    //set our product to the product found by the sku in the url if there is an error return it
    this.productService.getProductBySku(this.sku).subscribe(data => {
        this.product = data;
      }, error => {
        if (error.status == '404') {
          console.error("User doesn't exist");
        } else {
          console.error("uh oh happened");
          console.error(error);
        }
        //can't do anything, so bug out
        this.router.navigateByUrl("/list");
        //this.router.navigate(['list']);
      }
    );

  }


  //On init


}
