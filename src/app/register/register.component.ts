import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm : FormGroup;
  genders = ['Male', 'Female'];
  submitted = false;
  regSuccess = false;
  error_messages : JSON;
  error_str: string;

  constructor( private formBuilder: FormBuilder, private registrationService: RegistrationService) { }

  // convenience getter for easy access to form fields
  get f() { return this.registrationForm.controls; }

  ngOnInit(): void {

    this.registrationForm = this.formBuilder.group({
      email : ['', Validators.required],
      first_name : ['', Validators.required],
      last_name : ['', Validators.required],
      password1 : ['', Validators.required],
      password2 : ['', Validators.required],
      mobile : [''],
      gender : [''],
      user_type : ['']
    });
  }


  onSubmit(){
    
    this.submitted = true;
    if(this.registrationForm.invalid){
      return;
    }

    if(this.f.password1.value != this.f.password2.value){
      return;
    }

    this.registrationService.register(this.f.email.value, this.f.first_name.value, this.f.last_name.value,
      this.f.password1.value, this.f.password2.value, this.f.mobile.value, this.f.gender.value, this.f.user_type.value)
      .pipe(first())
      .subscribe(
        data =>{
          this.regSuccess = true;
        },
        error =>{
          this.error_messages = error.error;
          this.error_str = JSON.stringify(this.error_messages);
        }
      );


  }

}
