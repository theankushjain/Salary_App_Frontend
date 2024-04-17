import { Router } from '@angular/router';
import { UsersService } from './../../services/users.service';
import { RolesService } from './../../services/roles.service';

import { Component, Inject, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  dataSource!: [];
  locationDataSource!:[];

  constructor(private fb: FormBuilder, private router:Router, private registerService: RegisterService, private usersService:UsersService, private rolesService: RolesService, private locationService:LocationService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      roles: [[], [Validators.required]],
      currentPostingLocation: ['',[Validators.required]]
    });
  }

  ngOnInit(): void {
    console.log(this.data);
    this.getRoles();
    this.getLocations();

    const rolesData = this.data?.roles || [];
    const locationData = this.data?.currentPostingLocation || '';

    // Map the roles array to an array of role names (strings)
    const roleNames = rolesData.map((role: { name: any; }) => role.name);
    const locationName = locationData.name;
    console.log('location=',locationName);
    console.log(roleNames);

    this.registrationForm.patchValue({
      ...this.data,
      roles: roleNames,
      currentPostingLocation: locationName,
      password: "12345"
    });
  }

  get f() { return this.registrationForm.controls; }

  onSubmit() {

    if (this.registrationForm.invalid) {
      return;
    }
    console.log("sent data:", this.registrationForm.value);
    const formData = {
      ...this.registrationForm.value,
      currentPostingLocation: this.registrationForm.get('currentPostingLocation')?.value
    };

    if (this.data) {
      this.usersService.updateUser(this.data.id,formData).subscribe({
        next: (response: any) => {
          alert("User Updated Successfully");
          // this.resetForm();
          // location.reload();
        },
        error: (error) => {
          console.error('Error during user updation:', error);
          alert("Error during user Updation.")
        }
      })
    } else {
      console.log("Data sent:",formData);
      this.registerService.saveCredentials(formData).subscribe({
        next: (response: any) => {
          console.log("User Registration Successful", response)
          alert("User Registration Successful. You can now log in using the Email and Password provided by you.");
          // this.resetForm();
          // location.reload();
          
        },
        error: (error) => {
          console.error('Error during user registration:', error);
          alert("Error during user Registration.")
        }
      })
    }
  }

  resetForm() {
    let control: AbstractControl;
    this.registrationForm.markAsUntouched();
    this.registrationForm.reset();
    Object.keys(this.registrationForm.controls).forEach((name) => {
      control = this.registrationForm.controls[name];
      control.setErrors(null);
    });
  }

  getLocations() {
    this.locationService.getLocations().subscribe(
      (response: any) => {
        this.locationDataSource = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getRoles() {
    this.rolesService.getRoles().subscribe(
      (response: any) => {
        this.dataSource = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
