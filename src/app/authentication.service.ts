import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { urls } from './urls.json'

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    public loggedIn : boolean;

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        if(this.currentUserSubject.value){
          this.loggedIn = true;
        }
        else{
          this.loggedIn = false;
        }
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }


    login(email, password) {
        // console.log(` username ${email} with password ${password}`)
        return this.http.post<any>(urls.login_url ,JSON.stringify({
          "email":email,
          "password":password
        }), this.httpOptions)
            .pipe(map(key => {
              console.log(key);
                let user : string = `{ "email" : "${email}", "key" : ${JSON.stringify(key['key'])}}`;
                console.log("user --> "+user);
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', user);
                this.currentUserSubject.next(user);
                this.loggedIn = true;
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