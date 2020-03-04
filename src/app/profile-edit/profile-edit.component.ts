import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

    submitted : boolean;
    profileEditForm : FormGroup;

  constructor(private profileService : ProfileService, private formBuilder : FormBuilder, private router : Router) {
    this.submitted = false;
   }

  ngOnInit(): void {

    this.profileService.getProfile().subscribe(
      data =>{
        this.profileEditForm = this.formBuilder.group({
          firstName : [data['first_name']],
          lastName : [data['last_name']]
        });
      }
    );
  }

  public get f(){
    return this.profileEditForm.controls;
  }

  editProfile(firstName, lastName){
    let bodyParams = {}
    if(firstName != '') bodyParams['first_name'] = firstName
    if(lastName != '') bodyParams['last_name'] = lastName

    this.profileService.editProfile(bodyParams).subscribe(
      data => {
        this.router.navigate(['/profile']);
      },
      error =>{
        console.log(error);
      }
    );
  }

  onSubmit(){
    this.submitted = true;
    this.editProfile(this.f.firstName.value, this.f.lastName.value)
  }

}
