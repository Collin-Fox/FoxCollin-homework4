import { Injectable } from '@angular/core';
import { Product } from "./product";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  urlBase: string;
  constructor(private http: HttpClient) { this.urlBase = "http://localhost:8080"; }

  //get all products as  a list
  public getAllProducts(): Observable<any> {
    return this.http.get(this.urlBase + '/products');
  }

  //Get a product by its sku
  public getProductBySku(sku: string): Observable<any>{
    console.log("CALLED BY SKU");
    return this.http.get(this.urlBase + '/product/' + sku);
  }

  // Add a product
  public addProduct(product: Product): Observable<any>{
    return this.http.post<Product>(this.urlBase + '/product', product);
  }

  public searchProduct(search: string): Observable<any>{
    return this.http.get(this.urlBase + '/products/contains/' + search);
  }
}
