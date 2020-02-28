import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../authentication.service'

@Component({
  templateUrl: 'login.component.html',
  styleUrls : ['login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
          console.log(this.authenticationService.currentUserValue);
            this.router.navigate(['/']);
        }
    }

    showEmailErrors(){
        return JSON.stringify(this.f.email.errors);
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    ngOnDestroy(){
        console.log("Login Component Destroyed");
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            console.log("form invalid");
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                  console.log(data);
                  localStorage.setItem('currentUser', data);
                  this.authenticationService.loggedIn = true;
                  this.router.navigate([this.returnUrl]);
                },
                error => {
                    
                    this.error = JSON.stringify(error.error);
                    this.loading = false;
                },
               );
    }
}