import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { urls } from './urls.json';
import { map } from 'rxjs/operators';
import { Product } from './product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  };


  constructor(private http: HttpClient) { }

  getProducts(search : string, rating : string){
    let params = {};
    if(search != "") params['search'] = search;
    if(rating != "") params['rating'] = rating;

    this.httpOptions['params'] = params;
    return this.http.get<Product[]>( urls.get_products, this.httpOptions ).pipe(
      map( key =>{
        // console.log(key);
        return key;
      })
    );

  }


  getProduct(id){

    return this.http.get<Product>( urls.get_product.replace('{id}',id.toString()), this.httpOptions)
    .pipe( map( key => {
        return key;
      })
    );
  }




}
