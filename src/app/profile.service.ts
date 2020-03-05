import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { urls } from './urls.json';
import { AuthenticationService } from './authentication.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  httpOptions = { 
    headers : new HttpHeaders({
    'Content-Type':'application/json'
  })};

  constructor(private http: HttpClient, private authenticationService : AuthenticationService) { 
    this.authenticationService.currentUser.subscribe(
      data =>{
        let key = this.authenticationService.currentUserValue['key'];
        this.httpOptions.headers = this.httpOptions.headers.append('Authorization', `Token ${key}`);
      }
    )
    

  }

  getProfile(){
    return this.http.get<JSON>(urls.profile_url, this.httpOptions).pipe(map(
      key => {
        return key;
      }
    ));
  }

  editProfile(bodyParams){
    return this.http.patch<JSON>(urls.profile_url,bodyParams , this.httpOptions).pipe(
      map(
        key => {
          return key;
        }
      )
    );
  }


  changePassword(bodyParams){
    return this.http.post<JSON>(urls.password_change_url, JSON.stringify(bodyParams), this.httpOptions).pipe(
      map(
        key =>{
          return key;
        }
      )
    );
  }

}
