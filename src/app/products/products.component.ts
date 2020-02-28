import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productsForm : FormGroup;
  ratingsValues = [1,2,3,4,5]
  productsList : Array<Product>;

  constructor(private formBuilder : FormBuilder, private productService : ProductService) { }

  f(){ return this.productsForm.controls; } 

  getProducts(){
    this.productService.getProducts(this.f().search.value, this.f().rating.value)
    .subscribe(
      data =>{
        this.productsList = data;
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );
  }

  ngOnInit(): void {

    this.productsForm = this.formBuilder.group({
      search : [''],
      rating : ['']
    });

    this.getProducts();

  }

}
