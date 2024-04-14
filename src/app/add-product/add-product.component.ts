import { Component } from '@angular/core';
import { Product } from "../product";
import { ProductService } from "../product.service";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  skuExists: boolean;
  product: Product;

  //Constructor for the form
  constructor(private router: Router, private productService: ProductService) {
    this.skuExists = false;
    this.product = new Product();
  }

  //What happens when we submit the form
  onSubmit(){
    console.log(this.product);
    //Save this product to the database
    this.productService.addProduct(this.product).subscribe(data =>{
      //Log the product to debug
      console.log(data);
      //Head to the detailed description of the product
      this.router.navigate(['/product', this.product.sku])
    }, error => {
      if(error.status == '302'){
        this.skuExists = true;
      }else{
        //something else went wrong
        this.router.navigateByUrl('/list')
      }
    })
  }

}
