import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { EmailValidator } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    public loggedIn = false;

    private loginUrl = "https://angular-backend-sayone.herokuapp.com/api/v1/rest-auth/login/"

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };

    login(email, password) {
        // console.log(` username ${email} with password ${password}`)
        return this.http.post<any>(this.loginUrl,JSON.stringify({
          "email":email,
          "password":password
        }), this.httpOptions)
            .pipe(map(key => {
                let user : string = `{ email: ${email},key : ${JSON.stringify(key)}}`;
                console.log("user --> "+user);
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                // localStorage.setItem('currentUser', user);
                // this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.loggedIn = false;
        this.currentUserSubject.next(null);
    }
}