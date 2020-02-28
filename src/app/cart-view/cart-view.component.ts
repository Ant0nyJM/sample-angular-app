import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {

  

  constructor(public cartService : CartService, private productService : ProductService) { }

  ngOnInit(): void {
  }

  getCartProducts(){

  }

}
