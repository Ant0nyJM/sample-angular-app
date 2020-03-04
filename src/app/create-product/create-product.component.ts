import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ProductService } from '../product.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  createProductForm : FormGroup;
  submitted : boolean;
  imageFile : File;

  constructor(private formBulder:FormBuilder, private productService : ProductService) { }

  ngOnInit(): void {
    this.createProductForm = this.formBulder.group({
      name: ['',Validators.required],
      description : [''],
      image : [''],
      rating : ['']
    });
    this.submitted = false;
  }

  get f() {
    return this.createProductForm.controls;
  } 

  createProduct(){

    let formData = new FormData();

    formData.append('name', this.f.name.value);
    if( this.f.description.value != '') formData.append('description', this.f.description.value);
    if(this.f.rating.value != '') formData.append('rating', this.f.rating.value);
    if( this.imageFile != undefined) formData.append('image', this.imageFile);

    console.log(formData);

    this.productService.createProduct(formData)
    .pipe(first())
    .subscribe(
      data => {
        console.log(data);
      },
      error =>{
        console.log(error);
      }

    );

  }

  onSubmit(){

    this.submitted = true;

    if(this.createProductForm.invalid){
      console.log("form invalid");
      return
    }

    this.createProduct();

  }

  setFile(files : FileList){
    if(files.length == 1) {
      this.imageFile = files[0];
      console.log(this.imageFile);
    }
  }

}
