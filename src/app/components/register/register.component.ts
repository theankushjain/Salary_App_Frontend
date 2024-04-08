import { Router } from '@angular/router';
import { UsersService } from './../../services/users.service';
import { RolesService } from './../../services/roles.service';

import { Component, Inject, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  dataSource!: [];

  constructor(private fb: FormBuilder, private router:Router, private registerService: RegisterService, private usersService:UsersService, private rolesService: RolesService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      roles: [[], [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getRoles();

    const rolesData = this.data?.roles || [];

    // Map the roles array to an array of role names (strings)
    const roleNames = rolesData.map((role: { name: any; }) => role.name)

    this.registrationForm.patchValue({
      ...this.data,
      roles: roleNames
    });
  }

  get f() { return this.registrationForm.controls; }

  onSubmit() {

    if (this.registrationForm.invalid) {
      return;
    }

    if (this.data) {
      this.usersService.updateUser(this.data.id,this.registrationForm.value).subscribe({
        next: (response: any) => {
          alert("User Updated Successfully");
          this.resetForm();
          location.reload();
        },
        error: (error) => {
          console.error('Error during user updation:', error);
          alert("Error during user Updation.")
        }
      })
    } else {

      this.registerService.saveCredentials(this.registrationForm.value).subscribe({
        next: (response: any) => {
          console.log("User Registration Successful", response)
          alert("User Registration Successful. You can now log in using the Email and Password provided by you.");
          this.resetForm();
          location.reload();
          
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
