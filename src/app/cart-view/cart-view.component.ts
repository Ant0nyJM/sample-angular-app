import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {

  products;

  constructor(public cartService : CartService, private orderService : OrderService) { 
    
  }

  ngOnInit(): void {
    if(this.cartService.products.length >0)  this.products = this.cartService.products;
  }


  createOrder(){
    let bodyParams = {};
    bodyParams['user'] = JSON.parse(localStorage.getItem('currentUser'))['user_id']
    bodyParams['products'] = JSON.parse(localStorage.getItem('productIds'));
    this.orderService.createOrder(bodyParams).subscribe(
      data =>{
        console.log("Data");
        console.log(data)
      },
      error => {
        console.log(error);
      }
    );
  }

}
